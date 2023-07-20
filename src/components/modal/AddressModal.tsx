import { ElseUtils } from "@/libs/else.utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { LatLng } from "use-places-autocomplete";

export interface AddressModalProps {
  show: boolean;
  setShow: Function;
  setStartAccess: Function;
  startAccess: AddressInfo;
  setGoalAccess: Function;
  goalAccess: AddressInfo;
  isMove: boolean;
}

export interface AddressInfo {
  desc: string;
  key: number;
  location?: LatLng;
  placeId: string;
}
export default function AddressModal(props: AddressModalProps) {
  const [addList, setAddList] = useState([]);
  const [selectAddress, setSelectAddress] = useState<AddressInfo>({
    desc: "",
    key: -1,
    placeId: "",
  });

  useEffect(() => {}, [props.startAccess]);

  const getAddresses = async (txt: string) => {
    if (txt.trim() === "") return;
    const res = await axios.get(`/api/google.map/search?word=${txt}`);
    setAddList(res.data.predictions);
  };

  const close = (e: any) => {
    setAddList([]);
    setSelectAddress({
      desc: "",
      key: -1,
      placeId: "",
    });
    props.setShow(false);
  };
  return (
    <>
      {props.show ? (
        <>
          <div className='fixed top-0 left-0 z-50 w-full h-full bg-slate-600 Z-50'>
            <div
              id='addressModal'
              className='bg-white w-[327px] h-[500px] fixed top-[76px] left-[47px] rounded-[10px]'
            >
              <div className='pl-[20px]'>
                <div className='pt-[20px]' />
                <div className='text-[#000000] text-left relative font-bold font-sans text-[18px]'>
                  Pickup Point
                </div>
                <div className='pt-[29px]' />
                <div
                  className='text-[#4c4c4c] text-left relative'
                  style={{ font: "400 15px/20px 'Pretendard', sans-serif" }}
                >
                  Enter Address
                </div>
                <div className='pt-[16px]' />
                <input
                  className='w-[272px] pl-[12px] text-[#262628] text-[16px] border-0 bg-[#f5f6fa] rounded-[10px] relative h-[56px] focus:shadow-none focus:outline-none focus:ring-2 focus:ring-[#BBBBBB]'
                  onChange={(e) => getAddresses(e.target.value)}
                />
                <div className='h-[263px] font-sans pr-[20px]'>
                  {addList.map((d, k) => {
                    return (
                      <div key={k}>
                        <div
                          className={
                            k === selectAddress.key
                              ? `pt-[10px] font-sans text-[13px] text-blue-500`
                              : `pt-[10px] font-sans text-[13px] text-[#262628]`
                          }
                          key={k}
                          onClick={(e) => {
                            setSelectAddress({
                              desc: (e.target as HTMLElement).textContent!,
                              placeId: d["place_id"],
                              key: k,
                            });
                          }}
                        >
                          {d["description"]}
                        </div>
                        <div className='bg-[#bbbbbb] h-[1px] mt-[5px]'></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='bottom-0 flex pl-[10px]'>
                <button
                  onClick={(e) => close(e)}
                  className='bg-white text-[#0085FE] w-[148px] h-[56px] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px]'
                >
                  Cancel
                </button>

                {selectAddress.key === -1 ? (
                  <button className='ml-[6px] w-[153px] h-[56px] bg-[#bbbbbb] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px] text-white'>
                    Apply
                  </button>
                ) : (
                  <button
                    className='ml-[6px] w-[153px] h-[56px] bg-[#4187FF] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px] text-white'
                    onClick={async (e) => {
                      if (props.isMove) {
                        const res = await axios.get(
                          `/api/google.map/latlng?place_id=${selectAddress.placeId}`
                        );

                        props.setGoalAccess({
                          ...selectAddress,
                          location: res.data.result.geometry.location,
                        });

                        setTimeout(() => {
                          ElseUtils.setLocalStorage(
                            ElseUtils.localStorageStartInfo,
                            JSON.stringify(props.startAccess)
                          );
                          // localStorage.setItem(
                          //   "startInfo",
                          //   JSON.stringify(props.startAccess)
                          // );
                          ElseUtils.setLocalStorage(
                            ElseUtils.localStorageGoalInfo,
                            JSON.stringify({
                              ...selectAddress,
                              location: res.data.result.geometry.location,
                            })
                          );
                          // localStorage.setItem(
                          //   "goalInfo",
                          //   JSON.stringify({
                          //     ...selectAddress,
                          //     location: res.data.result.geometry.location,
                          //   })
                          // );

                          // 경로 보여주는 페이지로 이동
                          location.href = `/service/map/path`;
                          setAddList([]);
                        }, 100);
                      } else {
                        const res = await axios.get(
                          `/api/google.map/latlng?place_id=${selectAddress.placeId}`
                        );

                        props.setStartAccess({
                          ...selectAddress,
                          location: res.data.result.geometry.location,
                        });

                        setAddList([]);
                        close(e);
                      }
                    }}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
