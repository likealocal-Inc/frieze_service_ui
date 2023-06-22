// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   MarkerF,
//   Polyline,
// } from "@react-google-maps/api";
// import { AutoCompleteComponent } from "./map/AutoCompleteComponent";
// import { getGeocode, getLatLng } from "use-places-autocomplete";
// import axios from "axios";
// import { PathInfo } from "../libs/map.utils";

// class MapLocation {
//   lat;
//   lng;
//   constructor(lat = 37.51054, lng = 127.069806) {
//     this.lat = lat;
//     this.lng = lng;
//   }
//   get() {
//     return { lat: this.lat, lng: this.lng };
//   }
//   set({ lat, lng }: any) {
//     this.lat = lat;
//     this.lng = lng;

//     return this;
//   }
// }

const MapPage = () => {
  //   const [startLoction, setStartLoction] = useState<MapLocation>(
  //     new MapLocation()
  //   );
  //   const [endLoction, setEndLoction] = useState<MapLocation>(new MapLocation());
  //   const [paths, setPaths] = useState<{ lat: any; lng: any }[]>([]);
  //   const [markers, setMarkers] = useState<MapLocation[]>([]);
  //   const [libraries, setlibraries] = useState<string[]>(["places"]);
  //   const [mapCenter, setMapCenter] = useState<MapLocation>(new MapLocation());
  //   const mapRef = useRef(null);
  //   const mapOptions = useMemo<google.maps.MapOptions>(
  //     () => ({
  //       disableDefaultUI: true,
  //       clickableIcons: true,
  //       scrollwheel: false,
  //     }),
  //     []
  //   );
  //   const handleMapLoad = (map: any) => {
  //     mapRef.current = map;
  //   };
  //   // // 지도 초기 세팅
  //   useEffect(() => {
  //     if ("geolocation" in navigator) {
  //       // 현재 위치를 가져옴
  //       navigator.geolocation.getCurrentPosition(
  //         function (location) {
  //           var lat = location.coords.latitude;
  //           var lng = location.coords.longitude;
  //           setTimeout(() => {
  //             const temp = mapCenter.set({ lat, lng });
  //             setMapCenter(new MapLocation(lat, lng));
  //           }, 500);
  //           // setMarketList([...marketList, { position: { lat, lng } }]);
  //         },
  //         function (err) {
  //           alert("위치 정보를 가져오는데 실패했습니다. 오류: " + err);
  //         }
  //       );
  //     } else {
  //       alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
  //     }
  //   }, []);
  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: "AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w",
  //     libraries: libraries as any,
  //     language: "en",
  //     region: "kr",
  //   });
  //   const search = () => {
  //     setMarkers([startLoction.get(), endLoction.get()]);
  //     axios
  //       .get(
  //         "/api/naver.path?startLng=" +
  //           startLoction.lng +
  //           "&startLat=" +
  //           startLoction.lat +
  //           "&goalLng=" +
  //           endLoction.lng +
  //           "&goalLat=" +
  //           endLoction.lat
  //       )
  //       .then((res: any) => {
  //         const data = res.data.route.traoptimal[0];
  //         const path = data.path;
  //         const summary = data.summary;
  //         const distance = summary.distance;
  //         const duration = summary.duration;
  //         const fuelPrice = summary.fuelPrice;
  //         const taxiPrice = summary.taxiFare;
  //         const tollFare = summary.tollFare;
  //         console.log(data);
  //         const tempPaths = [];
  //         for (let index = 0; index < data.path.length; index++) {
  //           const el = data.path[index];
  //           //{ lat: 37.5665, lng: 126.9780 },
  //           console.log({ lat: el[1], lng: el[0] });
  //           tempPaths.push({ lat: el[1], lng: el[0] });
  //         }
  //         setPaths(tempPaths);
  //         // setPathInfo({ distance, duration, fuelPrice, taxiPrice, tollFare });
  //       });
  //   };
  //   useEffect(() => {
  //     if (isLoaded && mapRef.current) {
  //       const bounds = new window.google.maps.LatLngBounds();
  //       bounds.extend(mapCenter.get());
  //       bounds.extend(startLoction.get());
  //       bounds.extend(endLoction.get());
  //       (mapRef.current as google.maps.Map).fitBounds(bounds);
  //     }
  //   }, [
  //     isLoaded,
  //     mapCenter,
  //     startLoction,
  //     endLoction,
  //     setStartLoction,
  //     setEndLoction,
  //   ]);
  //   if (!isLoaded) {
  //     return <p>Loading...</p>;
  //   }
  //   return (
  //     <>
  //       <div className='flex flex-col '>
  //         <div className='flex flex-row p-3'>
  //           <div className='flex flex-row '>
  //             <label className='flex items-center justify-center p-1 text-lg'>
  //               출발지
  //             </label>
  //             <AutoCompleteComponent
  //               onAddressSelect={(address) => {
  //                 getGeocode({ address: address }).then((results: any) => {
  //                   const { lat, lng } = getLatLng(results[0]);
  //                   setStartLoction(new MapLocation(lat, lng));
  //                 });
  //               }}
  //             />
  //           </div>
  //           <div className='w-10' id='googleMap'></div>
  //           <div className='flex flex-row'>
  //             <label className='flex items-center justify-center p-1 text-lg'>
  //               도착지
  //             </label>
  //             <AutoCompleteComponent
  //               onAddressSelect={(address) => {
  //                 getGeocode({ address: address }).then((results: any) => {
  //                   const { lat, lng } = getLatLng(results[0]);
  //                   setStartLoction(new MapLocation(lat, lng));
  //                 });
  //               }}
  //             />
  //           </div>
  //           <div className=''>
  //             <button onClick={() => search()}>Search</button>
  //           </div>
  //         </div>
  //         <div className=''>
  //           <GoogleMap
  //             onLoad={(e: google.maps.Map) => handleMapLoad(e)}
  //             options={mapOptions}
  //             zoom={15}
  //             center={mapCenter}
  //             mapTypeId={google.maps.MapTypeId.ROADMAP}
  //             mapContainerStyle={{ width: "800px", height: "500px" }}
  //           >
  //             <Polyline
  //               path={paths}
  //               options={{
  //                 strokeColor: "#FF0000",
  //                 strokeOpacity: 1.0,
  //                 strokeWeight: 2,
  //               }}
  //             />
  //             {markers.map((d, k) => (
  //               <MarkerF
  //                 key={k}
  //                 position={d}
  //                 onLoad={() => console.log("Marker Loaded")}
  //               />
  //             ))}
  //             {/* <MarkerF
  //           position={mapCenter.get()}
  //           onLoad={() => console.log("Marker Loaded")}
  //         />
  //         <MarkerF
  //           position={startLoction.get()}
  //           onLoad={() => console.log("Marker Loaded")}
  //         />
  //         <MarkerF
  //           position={endLoction.get()}
  //           onLoad={() => console.log("Marker Loaded")}
  //         /> */}
  //           </GoogleMap>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default MapPage;
