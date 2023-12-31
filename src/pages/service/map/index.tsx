import ChannelTalk from "@/components/chaneltalk/ChannelTalk";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import { GoogleMapComponent } from "@/components/map/GoogleMapComponent";
import AddressModal, { AddressInfo } from "@/components/modal/AddressModal";
import { ElseUtils } from "@/libs/else.utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import NotOpen from "../notopen";
import { useRouter } from "next/router";

export default function MapPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isMove, setIsMove] = useState(false);

  const [widthSize, setWidthSize] = useState(0);
  const [startLocation, setStartLocation] = useState<AddressInfo>({
    desc: "Current location",
    key: -1,
    placeId: "",
  });
  const [goalLocation, setGoalLocation] = useState<AddressInfo>({
    desc: "Drop off",
    key: -1,
    placeId: "",
  });

  const router = useRouter();
  const [buttonTitleForDomain, setButtonTitleForDomain] = useState("");

  useEffect(() => {
    if (router.isReady === false) return;
    const domain = window.location.hostname;
    if (domain.includes("frieze")) {
      setButtonTitleForDomain("Frieze Seoul");
    } else if (domain.includes("kiaf")) {
      setButtonTitleForDomain("Kiaf Seoul");
    } else if (domain.includes("taxi")) {
      setButtonTitleForDomain("Coex");
    }
  }, [router]);

  useEffect(() => {
    (document.body.style as any).zoom = "100%";
  });

  useEffect(() => {
    setWidthSize(window.innerWidth);

    // 결제관련 데이터를 스토리지에서 지우기
    ElseUtils.removeLocalStorageForStart();

    if ("geolocation" in navigator) {
      // 현재 위치를 가져옴
      navigator.geolocation.getCurrentPosition(
        function (location) {
          var lat = location.coords.latitude;
          var lng = location.coords.longitude;

          axios.get(`/api/google.map/info?lat=${lat}&lng=${lng}`).then(
            (d) => {
              const temp = d.data.results[0];
              axios
                .get(`/api/google.map/latlng?place_id=${temp.place_id}`)
                .then((d) => {
                  setStartLocation({
                    desc: temp.formatted_address,
                    placeId: temp.place_id,
                    location: d.data.result.geometry.location,
                    key: -1,
                  });
                });
            }

            // setStartLocation({
            //   ...startLocation,
            //   desc: d.data.results[0].formatted_address,
            //   location: { lng, lat },
            // })
          );
        },
        function (err) {
          alert("위치 정보를 가져오는데 실패했습니다. 오류: " + err);
        }
      );
    } else {
      alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
    }
  }, []);

  return (
    <>
      <LayoutAuth menuTitle='지도' isUasgeDetail={true} isMargin={false}>
        <div className='mt-[10px]'></div>
        <div className=''>
          {/* 지도 */}
          <div className='h-[543px] z-10'>
            {startLocation.desc === "Current location" ? (
              <div className='flex flex-col items-center justify-center h-[425px] font-sans'>
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
                <span className='mt-3 text-red-400'>
                  get Current location...
                </span>
              </div>
            ) : (
              <GoogleMapComponent
                size={{ width: `${widthSize}px`, height: "360px" }}
                centerLocation={startLocation.location}
                setStartLocation={setStartLocation}
                setGoalLocation={setGoalLocation}
                startLocation={startLocation}
                goalLocation={goalLocation}
              />
            )}
          </div>
          <div className='flex justify-start pt-[20px] px-[20px] bg-[#ffffff] rounded-3xl h-[254px] relative mt-[-200px]'>
            <Image src={"/img/mappath.svg"} alt='' width={12} height={120} />
            <div className='ml-[10px]'></div>
            <div className='w-screen'>
              <div
                className='flex items-center w-full'
                onClick={(e) => {
                  setShowAddressModal(true);
                }}
              >
                <div
                  className={`bg-[#f5f6fa] w-full rounded-[10px] h-14 text-[#bbbbbb] font-sans items-center flex pr-[10px] pl-[20px]`}
                >
                  {ElseUtils.stringCut(startLocation.desc, 30, "...")}
                </div>
                <svg
                  className='relative overflow-visible ml-[-30px]'
                  style={{ transform: "translate(0px, 0px)" }}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.23431 5.21153C8.54673 4.92949 9.05327 4.92949 9.36569 5.21153L15.7657 10.9893C16.0781 11.2714 16.0781 11.7286 15.7657 12.0107L9.36569 17.7885C9.05327 18.0705 8.54673 18.0705 8.23431 17.7885C7.9219 17.5064 7.9219 17.0491 8.23431 16.7671L14.0686 11.5L8.23431 6.23291C7.9219 5.95087 7.9219 5.49358 8.23431 5.21153Z'
                    fill='#BBBBBB'
                  />
                </svg>
              </div>
              <div className='mt-[10px]' />
              <div
                className='flex items-center'
                onClick={(e) => {
                  if (startLocation.desc === "Current location") return;
                  setIsMove(true);
                  setShowAddressModal(true);
                }}
              >
                <div className='flex w-full items-center text-[#262628] text-[16px] font-sans font-bold pr-[10px] pl-[20px] h-14 bg-[#f5f6fa] rounded-[10px] border-solid border-[#262628] border relative'>
                  {ElseUtils.stringCut(goalLocation.desc, 30, "...")}
                </div>
                <svg
                  className='relative overflow-visible ml-[-30px]'
                  style={{ transform: "translate(0px, 0px)" }}
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.23431 5.21153C8.54673 4.92949 9.05327 4.92949 9.36569 5.21153L15.7657 10.9893C16.0781 11.2714 16.0781 11.7286 15.7657 12.0107L9.36569 17.7885C9.05327 18.0705 8.54673 18.0705 8.23431 17.7885C7.9219 17.5064 7.9219 17.0491 8.23431 16.7671L14.0686 11.5L8.23431 6.23291C7.9219 5.95087 7.9219 5.49358 8.23431 5.21153Z'
                    fill='#262628'
                  />
                </svg>
              </div>
            </div>

            <button
              className='h-[38px] w-[111px] bg-[#f5f6fa] rounded-[20px] font-sans border-0 text-[14px] font-bold  absolute top-[160px] left-[20px] z-50'
              onClick={(e) => {
                const lat = 37.513364;
                const lng = 127.058262;
                axios
                  .get(`/api/google.map/info?lat=${lat}&lng=${lng}`)
                  .then((d) => {
                    const temp = d.data.results[0];
                    axios
                      .get(`/api/google.map/latlng?place_id=${temp.place_id}`)
                      .then((d) => {
                        setGoalLocation({
                          desc: temp.formatted_address,
                          placeId: temp.place_id,
                          location: d.data.result.geometry.location,
                          key: -1,
                        });
                        ElseUtils.movePath(
                          startLocation,
                          {
                            desc: temp.formatted_address,
                            placeId: temp.place_id,
                            location: d.data.result.geometry.location,
                            key: -1,
                          },
                          d.data.result.geometry.location
                        );
                      });
                  });
              }}
            >
              <div
                className='text-[#000000] text-center relative'
                style={{ font: "500 14px/22px 'Pretendard', sans-serif" }}
              >
                {buttonTitleForDomain}
              </div>
            </button>
            {/* 
            <button
              className='h-[43px] w-[131px] font-sans border-0 text-[14px] font-bold bg-white rounded-lg absolute top-[150px] left-[20px] z-20'
              onClick={(e) => {
                setStartLocation({
                  desc: "Coex",
                  key: -1,
                  location: { lat: 37.513364, lng: 127.058262 },
                  placeId: "",
                });
              }}
            >
              <div className='text-black'>Frieze Seoul</div>
            </button> */}
          </div>
        </div>
        <AddressModal
          show={showAddressModal}
          setShow={setShowAddressModal}
          setStartAccess={setStartLocation}
          startAccess={startLocation}
          setGoalAccess={setGoalLocation}
          goalAccess={goalLocation}
          isMove={isMove}
        />

        <ChannelTalk />
        <NotOpen />
      </LayoutAuth>
    </>
  );
}
