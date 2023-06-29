import { AutoCompleteComponent } from "@/components/map/AutoCompleteComponent";
import Layout from "@/components/layouts/LayoutWithLogo";
import { useEffect, useState } from "react";
import {
  GoogleMapComponent,
  PathInfoProp,
  PathLocations,
} from "@/components/map/GoogleMapComponent";
import { LatLng } from "use-places-autocomplete";

export default function Sample() {
  const [slatLng, setLatLngs] = useState<LatLng>();
  const [glatLng, setLatLngg] = useState<LatLng>();
  const [startGoal, setStartGoal] = useState<PathLocations>();
  const [pathInfo, setPathInfo] = useState<PathInfoProp>();

  const onFindPath = () => {
    if (slatLng === undefined || glatLng === undefined) return;
    setStartGoal({ start: slatLng, goal: glatLng });
  };
  return (
    <>
      <Layout menuTitle='sample'>
        <AutoCompleteComponent setLatLng={setLatLngs} />
        <AutoCompleteComponent setLatLng={setLatLngg} />
        <button
          type='button'
          className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
          onClick={() => {
            onFindPath();
          }}
        >
          조회
        </button>
        <GoogleMapComponent
          pathLocation={startGoal}
          setPathInfo={setPathInfo}
        />
        {pathInfo !== undefined ? (
          <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <div className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
              경로 정보
            </div>
            <div className='p-1'>
              <div className='p-1'>
                distance:{Number(pathInfo["distance"]).toLocaleString()}
              </div>
              <div className='p-1'>
                duration:{pathInfo["duration"].toLocaleString()}
              </div>
              <div className='p-1'>
                fuelPrice:{pathInfo["fuelPrice"].toLocaleString()}
              </div>
              <div className='p-1'>
                taxiPrice:{pathInfo["taxiPrice"].toLocaleString()}
              </div>
              <div className='p-1'>
                tollFare:{pathInfo["tollFare"].toLocaleString()}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
}
