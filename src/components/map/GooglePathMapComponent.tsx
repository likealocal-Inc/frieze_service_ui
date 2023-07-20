import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import {
  GoogleMap,
  MarkerF,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

import { LatLng } from "use-places-autocomplete";
import { freizLocations } from "./GoogleMapComponent";
import { AddressInfo } from "../modal/AddressModal";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";

// 경로 타입
export interface PathLocations {
  start: LatLng;
  goal: LatLng;
}

// 구글맵 컴포넌트
export interface GooglePathMapComponentProp {
  lang?: string;
  country?: string;
  pathLocation?: PathLocations;
  setPathInfo: Function;
  zoom?: number;
  size?: { width: string; height: string };
}

export interface FreizLocationInfo {
  name: string;
  location: LatLng;
  icon: string;
}

export function GooglePathMapComponent({
  setPathInfo,
  country = "kr",
  lang = "en",
  zoom = 15,
  size = { width: "430px", height: "480px" },
}: GooglePathMapComponentProp) {
  // 프리트 요청 마커
  const [freizLocation, setFreizLocation] = useState<FreizLocationInfo[]>([]);

  // 화면 로딩
  const [isLoading, setIsLoading] = useState(true);

  // 경로 데이터
  // const [pathInfoData, setPathInfoData] = useState<PathInfo>();
  const [paths, setPaths] = useState<{ lng: any; lat: any }[]>([]);
  // 지도 중심
  const [center, setCenter] = useState<LatLng>();

  const [startLocation, setStartLocation] = useState<AddressInfo>();
  const [goalLocation, setGoalLocation] = useState<AddressInfo>();

  const mapRef = useRef(null);
  const [libraries, setlibraries] = useState<string[]>(["places"]);

  const handleMapLoad = (map: any) => {
    mapRef.current = map;
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w",
    libraries: libraries as any,
    language: lang,
    region: country,
  });

  useEffect(() => {
    setIsLoading(true);

    setCenter({ lat: 37.513364, lng: 127.058262 });

    const start = ElseUtils.getLocalStorage(ElseUtils.localStorageStartInfo);
    const goal = ElseUtils.getLocalStorage(ElseUtils.localStorageGoalInfo);

    if (start === null || goal === null) {
      location.href = "/service/map";
      return;
    }

    const startJson = JSON.parse(SecurityUtils.decryptText(start));
    const goalJaon = JSON.parse(SecurityUtils.decryptText(goal));

    setStartLocation(startJson);
    setGoalLocation(goalJaon);

    axios
      .get(
        "/api/naver.path?startLng=" +
          startJson!.location!.lng +
          "&startLat=" +
          startJson!.location!.lat +
          "&goalLng=" +
          goalJaon!.location!.lng +
          "&goalLat=" +
          goalJaon!.location!.lat
      )
      .then((res: any) => {
        if (res.data.code === 2 || res.data.code === 1) {
          alert(res.data.message);
          location.href = "/service/map";
          return;
        }
        const data = res.data.route.traoptimal[0];
        const summary = data.summary;
        const distance = summary.distance;
        const duration = summary.duration;
        const fuelPrice = summary.fuelPrice;
        const taxiPrice = summary.taxiFare;
        const tollFare = summary.tollFare;
        const lastPrice = Math.ceil((taxiPrice + taxiPrice / 2) / 1270);

        setPathInfo({
          distance,
          duration,
          fuelPrice,
          taxiPrice,
          tollFare,
          lastPrice,
        });

        const tempPaths = [];
        for (let index = 0; index < data.path.length; index++) {
          const el = data.path[index];
          tempPaths.push({ lat: el[1], lng: el[0] });
        }
        // setCenter(undefined); // 중심 마크 초기화
        setPaths(tempPaths);

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, []);

  // 지도로딩후
  useEffect(() => {
    if (
      isLoading === true ||
      startLocation === undefined ||
      goalLocation === undefined
    )
      return;
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      // 확장 인자 설정. 이 값은 변경할 수 있습니다.
      let extension = 0.01;

      bounds.extend({
        lat: startLocation!.location!.lat - extension,
        lng: startLocation!.location!.lng - extension,
      });
      bounds.extend({
        lat: goalLocation!.location!.lat + extension,
        lng: goalLocation!.location!.lng + extension,
      });

      // 패딩 추가
      const paddingOptions = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      };

      (mapRef.current as google.maps.Map).fitBounds(bounds, paddingOptions);
    }
  }, [isLoaded, paths, isLoading]);

  // 초기
  useEffect(() => {
    setFreizLocation(freizLocations);
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center font-sans h-[480px]'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='mt-3 text-red-400'>finding the path...</span>
        </div>
      ) : (
        ""
      )}

      <div className={isLoading ? `hidden` : ""}>
        <GoogleMap
          onLoad={(e: google.maps.Map) => handleMapLoad(e)}
          options={mapOptions}
          zoom={zoom}
          center={center}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={size}
        >
          {freizLocation.map((d, k) => {
            return (
              <MarkerF
                key={k}
                position={d.location}
                onLoad={() => console.log("Marker Loaded")}
                icon={`/freiz_location/${d.icon}`}
                onClick={(e) => {
                  console.log(e);
                }}
              />
            );
          })}

          <Polyline
            path={paths}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />

          <MarkerF
            position={startLocation!.location!}
            onLoad={() => console.log("Marker Loaded")}
            icon={"/freiz_location/from.png"}
            draggable
            onDragEnd={(e) => {
              const { latLng } = e;
              const lat = latLng!.lat();
              const lng = latLng!.lng();
              setCenter({ lat, lng });
            }}
          />
          <MarkerF
            position={goalLocation!.location!}
            onLoad={() => console.log("Marker Loaded")}
            icon={"/freiz_location/to.png"}
          />
        </GoogleMap>
      </div>
    </>
  );
}
