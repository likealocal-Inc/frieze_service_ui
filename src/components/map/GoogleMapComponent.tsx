import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import {
  GoogleMap,
  MarkerF,
  Polyline,
  useGoogleMap,
  useLoadScript,
} from "@react-google-maps/api";

import { LatLng } from "use-places-autocomplete";
import { AddressInfo } from "../modal/AddressModal";
import Image from "next/image";
import { ElseUtils } from "@/libs/else.utils";

// 경로 결과 정보
export interface PathInfoProp {
  distance: string;
  duration: string;
  fuelPrice: string;
  taxiPrice: string;
  tollFare: string;
}

// 경로 타입
export interface PathLocations {
  start: LatLng;
  goal: LatLng;
}

// 구글맵 컴포넌트
export interface GoogleMapComponentProp {
  centerLocation?: LatLng;
  startLocation?: AddressInfo;
  goalLocation?: AddressInfo;
  setStartLocation?: Function;
  setGoalLocation?: Function;
  lang?: string;
  country?: string;
  pathLocation?: PathLocations;
  setPathInfo?: Function;
  zoom?: number;
  size?: { width: string; height: string };
}

export interface FreizLocationInfo {
  name: string;
  location: LatLng;
  icon: string;
}
export const freizLocations: FreizLocationInfo[] = [
  {
    name: "coex",
    location: { lat: 37.513364, lng: 127.058262 },
    icon: "freiz_white.png",
  },
];

export function GoogleMapComponent({
  centerLocation,
  pathLocation = undefined,
  setPathInfo = undefined,
  setStartLocation = undefined,
  setGoalLocation = undefined,
  startLocation,
  goalLocation,
  country = "kr",
  lang = "en",
  zoom = 15,
  size = undefined,
}: GoogleMapComponentProp) {
  // 프리트 요청 마커
  const [freizLocation, setFreizLocation] = useState<FreizLocationInfo[]>([]);

  const [isMoving, setIsMoving] = useState(false);

  const [isCoexCenter, setIsCoexCenter] = useState(false);
  const [libraries, setlibraries] = useState<string[]>(["places"]);
  const [paths, setPaths] = useState<{ lng: any; lat: any }[]>([]);
  const [center, setCenter] = useState<LatLng>();

  const [widthSize, setWidthSize] = useState(0);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = (map: any) => {
    mapRef.current = map;
  };

  const onMapMove = (isEnd = false) => {
    if (mapRef.current) {
      if (isEnd) {
        let lat = mapRef.current.getCenter()!.lat();
        let lng = mapRef.current.getCenter()!.lng();
        axios.get(`/api/google.map/info?lat=${lat}&lng=${lng}`).then((d) => {
          const temp = d.data.results[0];
          axios
            .get(`/api/google.map/latlng?place_id=${temp.place_id}`)
            .then((d) => {
              setStartLocation!({
                desc: temp.formatted_address,
                placeId: temp.place_id,
                location: d.data.result.geometry.location,
              });
            });
        });
        setCenter({ lat, lng });
      } else {
        let lat = mapRef.current.getCenter()!.lat();
        let lng = mapRef.current.getCenter()!.lng();
        setCenter({ lat, lng });
      }
    }
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
      gestureHandling: "greedy",
      zoomControl: false,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w",
    libraries: libraries as any,
    language: lang,
    region: country,
  });

  // 중앙값 변경시
  useEffect(() => {
    if (centerLocation !== undefined) {
      setCenter(centerLocation);
      // axios
      //   .get(
      //     `/api/google.map/info?lat=${centerLocation.lat}&lng=${centerLocation.lng}`
      //   )
      //   .then((d) => console.log(d.data.results[0].formatted_address));
      return;
    } else {
      // 프리트 위치 건
      setCenter({ lat: 37.513364, lng: 127.058262 });
      setIsCoexCenter(true);
    }

    if ("geolocation" in navigator) {
      // 현재 위치를 가져옴
      navigator.geolocation.getCurrentPosition(
        function (location) {
          var lat = location.coords.latitude;
          var lng = location.coords.longitude;
          setCenter({ lat, lng });
          setIsCoexCenter(false);
          // axios
          //   .get(`/api/google.map/info?lat=${lat}&lng=${lng}`)
          //   .then((d) => console.log(d.data.results[0].formatted_address));
        },
        function (err) {
          setCenter({ lat: 37.513364, lng: 127.058262 });
          setIsCoexCenter(true);
          alert("위치 정보를 가져오는데 실패했습니다. 오류: " + err);
        }
      );
    } else {
      alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
      setCenter({ lat: 37.513364, lng: 127.058262 });
      setIsCoexCenter(true);
    }
  }, [centerLocation]);

  // 경로세팅
  useEffect(() => {
    if (pathLocation === undefined) return;

    // 경로 데이터 조회
    axios
      .get(
        "/api/naver.path?startLng=" +
          pathLocation.start.lng +
          "&startLat=" +
          pathLocation.start.lat +
          "&goalLng=" +
          pathLocation.goal.lng +
          "&goalLat=" +
          pathLocation.goal.lat
      )
      .then((res: any) => {
        const data = res.data.route.traoptimal[0];
        const summary = data.summary;
        const distance = summary.distance;
        const duration = summary.duration;
        const fuelPrice = summary.fuelPrice;
        const taxiPrice = summary.taxiFare;
        const tollFare = summary.tollFare;

        if (setPathInfo !== undefined) {
          setPathInfo({
            distance,
            duration,
            fuelPrice,
            taxiPrice,
            tollFare,
          });
        }
        const tempPaths = [];
        for (let index = 0; index < data.path.length; index++) {
          const el = data.path[index];
          tempPaths.push({ lat: el[1], lng: el[0] });
        }
        setCenter(undefined); // 중심 마크 초기화
        setPaths(tempPaths);
      });
  }, [pathLocation, setPathInfo]);

  // 지도로딩후
  useEffect(() => {
    if (pathLocation !== undefined && isLoaded && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(pathLocation?.start);
      bounds.extend(pathLocation?.goal);
      (mapRef.current as google.maps.Map).fitBounds(bounds);
    }
  }, [isLoaded]);

  // 초기
  useEffect(() => {
    setFreizLocation(freizLocations);
    setWidthSize(window.innerWidth);
  }, []);

  if (!isLoaded) {
    return <p></p>;
  }
  return (
    <>
      <GoogleMap
        // onLoad={(e: google.maps.Map) => handleMapLoad(e)}
        onLoad={onMapLoad}
        options={mapOptions}
        zoom={zoom}
        center={center}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={size}
        onDragStart={() => setIsMoving(true)}
        onDragEnd={() => {
          onMapMove(true);
          setIsMoving(false);
        }}
      >
        {/* {freizLocation.map((d, k) => {
          return (
            <MarkerF
              key={k}
              position={d.location}
              onLoad={() => console.log("프리크 마커 Marker Loaded")}
              icon={`/freiz_location/${d.icon}`}
              onClick={(e) => {
                const { latLng } = e;
                const lat = latLng!.lat();
                const lng = latLng!.lng();
                axios
                  .get(`/api/google.map/info?lat=${lat}&lng=${lng}`)
                  .then((d) => {
                    const temp = d.data.results[0];
                    axios
                      .get(`/api/google.map/latlng?place_id=${temp.place_id}`)
                      .then((d) => {
                        setGoalLocation!({
                          desc: temp.formatted_address,
                          placeId: temp.place_id,
                          location: d.data.result.geometry.location,
                        });
                        ElseUtils.movePath(
                          startLocation,
                          {
                            desc: temp.formatted_address,
                            placeId: temp.place_id,
                            location: d.data.result.geometry.location,
                          },
                          d.data.result.geometry.location
                        );
                      });
                  });
              }}
            />
          );
        })} */}

        {/* <Polyline
          path={paths}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        /> */}

        {/* 중앙값이 있고 코엑스중앙값이 아닐때만 마커 출력 */}
        {center !== undefined && isCoexCenter === false ? (
          <>
            {isMoving ? (
              <div className={`z-50 absolute top-[34%] left-[46%]`}>
                <Image
                  alt=''
                  src='/freiz_location/start.png'
                  width={33}
                  height={55}
                />
              </div>
            ) : (
              <MarkerF
                position={center}
                icon={"/freiz_location/start.png"}
                onLoad={() => console.log("Start Marker Loaded")}
                // draggable
                onDragEnd={(e) => {
                  const { latLng } = e;
                  const lat = latLng!.lat();
                  const lng = latLng!.lng();
                  axios
                    .get(`/api/google.map/info?lat=${lat}&lng=${lng}`)
                    .then((d) => {
                      const temp = d.data.results[0];
                      axios
                        .get(`/api/google.map/latlng?place_id=${temp.place_id}`)
                        .then((d) => {
                          setStartLocation!({
                            desc: temp.formatted_address,
                            placeId: temp.place_id,
                            location: d.data.result.geometry.location,
                          });
                        });
                    });
                }}
              />
            )}
          </>
        ) : (
          ""
        )}
        {pathLocation !== undefined ? (
          <>
            <MarkerF
              position={pathLocation.start}
              onLoad={() => console.log("Marker Loaded")}
              icon={"/freiz_location/from.png"}
              draggable
              onDragEnd={(e) => {
                console.log("From - Drag END");
                const { latLng } = e;
                const lat = latLng!.lat();
                const lng = latLng!.lng();
                setCenter({ lat, lng });
              }}
            />
            <MarkerF
              position={pathLocation.goal}
              onLoad={() => console.log("Marker Loaded")}
            />
          </>
        ) : (
          ""
        )}
        {/* {markers.map((d, k) => (
          <MarkerF
            key={k}
            position={d}
            onLoad={() => console.log("Marker Loaded")}
          />
        ))} */}
        {/* <MarkerF
          position={mapCenter.get()}
          onLoad={() => console.log("Marker Loaded")}
        />
        <MarkerF
          position={startLoction.get()}
          onLoad={() => console.log("Marker Loaded")}
        />
        <MarkerF
          position={endLoction.get()}
          onLoad={() => console.log("Marker Loaded")}
        /> */}
      </GoogleMap>
    </>
  );
}
