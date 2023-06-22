import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, MarkerF } from "@react-google-maps/api";
import { MyMarker } from "./MyMarker";
import { MapUtils, UtilReturn } from "../libs/map.utils";
import { LatLng } from "use-places-autocomplete";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export interface MyMarker {
  position: LatLng;
  desc?: string;
  onMarkerClick?: Function;
  onDragEnd?: Function;
}

export interface MapProps {
  centerPosition: LatLng;
  setCenterPosition: Function;
  markers: MyMarker[];
}

const MyGoogleMap = ({
  centerPosition,
  setCenterPosition,
  markers,
}: MapProps) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng>();
  const [marketList, setMarketList] = useState<MyMarker[]>([]);

  // // 지도 초기 세팅
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     // 현재 위치를 가져옴
  //     navigator.geolocation.getCurrentPosition(
  //       function (location) {
  //         var lat = location.coords.latitude;
  //         var lng = location.coords.longitude;

  //         setCurrentPosition({ lat, lng });
  //         setMarketList([...marketList, { position: { lat, lng } }]);
  //       },
  //       function (err) {
  //         alert("위치 정보를 가져오는데 실패했습니다. 오류: " + err);
  //       }
  //     );
  //   } else {
  //     alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
  //   }
  // }, []);

  useEffect(() => {
    if (centerPosition !== undefined) {
      setCurrentPosition(centerPosition);
      if (markers === undefined) {
        setMarketList([...marketList, { position: centerPosition }]);
      } else {
        setMarketList([
          ...marketList,
          ...markers,
          { position: centerPosition },
        ]);
      }
    }
  }, [centerPosition]);

  return (
    <>
      <LoadScript googleMapsApiKey='AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w'>
        {/* {currentPosition === undefined ? (
          "Loading..."
        ) : ( */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          {marketList.map((d, k) => {
            console.log(k, d.position);
            return (
              <MyMarker
                key={k}
                latlng={d.position}
                onDragEnd={d.onDragEnd}
                onMarkerClick={d.onMarkerClick}
              />
            );
          })}
        </GoogleMap>
        {/* )} */}
      </LoadScript>
    </>
  );
};

export default MyGoogleMap;
