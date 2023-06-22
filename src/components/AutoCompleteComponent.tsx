import axios from "axios";
import "flowbite";
import { useState } from "react";

export interface AutoCompleteComponentProp {
  setLatLng: Function;
}

export function AutoCompleteComponent({
  setLatLng,
}: AutoCompleteComponentProp) {
  const [places, setPlaces] = useState([]);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState<any>({});
  const onChange = async (txt: string) => {
    setAdd(txt);
    if (txt.trim() === "") return;
    const res = await axios.get(`/api/google.map/search?word=${txt}`);
    setPlaces(res.data.predictions);
    setShow(true);
  };

  const onSelectAddr = async (d: any) => {
    setAdd(d);
    setPlaces([]);
    const placeId = d["place_id"];
    const res = await axios.get(`api/google.map/latlng?place_id=${placeId}`);
    setLatLng(res.data.result.geometry.location);
  };

  return (
    <>
      <div className='relative flex flex-col'>
        <input
          type='text'
          value={add["description"]}
          className='p-2 text-lg border-0 border-b border-spacing-2 focus:border-slate-200'
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setShow(true)}
        />
        {show === true && places.length > 0 ? (
          <ul className='absolute z-50 p-3 space-y-1 text-gray-500 list-disc list-inside bg-slate-100 top-10'>
            {places.map((d, k) => (
              <li
                key={k}
                className='p-2 hover:bg-red-200'
                onClick={() => {
                  onSelectAddr(d);
                }}
              >
                {d["description"]}
              </li>
            ))}
            <button
              className='px-3 py-1 mb-2 mr-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
              onClick={(e) => {
                setShow(false);
              }}
            >
              닫기
            </button>
          </ul>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
