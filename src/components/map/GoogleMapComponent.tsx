import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import {
  GoogleMap,
  MarkerF,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";

import { LatLng } from "use-places-autocomplete";

export interface PathInfoProp {
  distance: string;
  duration: string;
  fuelPrice: string;
  taxiPrice: string;
  tollFare: string;
}

export interface PathLocations {
  start: LatLng;
  goal: LatLng;
}
export interface GoogleMapComponentProp {
  centerLocation?: LatLng;
  lang?: string;
  country?: string;
  pathLocation?: PathLocations;
  setPathInfo?: Function;
  zoom?: number;
  size?: { width: string; height: string };
}
export function GoogleMapComponent({
  centerLocation,
  pathLocation = undefined,
  setPathInfo = undefined,
  country = "kr",
  lang = "kr",
  zoom = 15,
  size = { width: "500px", height: "500px" },
}: GoogleMapComponentProp) {
  const mapRef = useRef(null);
  const [libraries, setlibraries] = useState<string[]>(["places"]);
  const [paths, setPaths] = useState<{ lng: any; lat: any }[]>([]);
  const [center, setCenter] = useState<LatLng>();
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
    language: "en",
    region: "kr",
  });

  useEffect(() => {
    if (centerLocation !== undefined) {
      setCenter(centerLocation);
      return;
    }
    if ("geolocation" in navigator) {
      // 현재 위치를 가져옴
      navigator.geolocation.getCurrentPosition(
        function (location) {
          var lat = location.coords.latitude;
          var lng = location.coords.longitude;
          setCenter({ lat, lng });
        },
        function (err) {
          alert("위치 정보를 가져오는데 실패했습니다. 오류: " + err);
        }
      );
    } else {
      alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
    }
  }, [centerLocation]);
  useEffect(() => {
    if (pathLocation === undefined) return;

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

  useEffect(() => {
    if (pathLocation !== undefined && isLoaded && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(pathLocation?.start);
      bounds.extend(pathLocation?.goal);
      (mapRef.current as google.maps.Map).fitBounds(bounds);
    }
  }, [isLoaded, pathLocation]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <GoogleMap
        onLoad={(e: google.maps.Map) => handleMapLoad(e)}
        options={mapOptions}
        zoom={zoom}
        center={center}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={size}
      >
        <Polyline
          path={paths}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
        {center !== undefined ? (
          <MarkerF
            position={center}
            onLoad={() => console.log("Marker Loaded")}
            draggable
            onDragEnd={(e) => {
              const { latLng } = e;
              const lat = latLng!.lat();
              const lng = latLng!.lng();
              setCenter({ lat, lng });
            }}
          />
        ) : (
          ""
        )}
        {pathLocation !== undefined ? (
          <>
            <MarkerF
              position={pathLocation.start}
              onLoad={() => console.log("Marker Loaded")}
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
