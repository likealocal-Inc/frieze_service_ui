import LayoutWithLogo from "@/components/layouts/LayoutWithLogo";
import { GoogleMapComponent } from "@/components/map/GoogleMapComponent";
import InformationModal from "@/components/modal/InformationModal";
import Image from "next/image";
import { useEffect, useState } from "react";
import "../../../../css/information/private.infomation.css";

export default function MapPathPage() {
  const [showPayModal, setShowPayModal] = useState(false);

  const [showAgreement, setShowAgreement] = useState(false);
  const [orderAgreement, setOrderAgreement] = useState(0);

  const [isOk, setIsOk] = useState(false);
  useEffect(() => {}, []);

  return (
    <>
      {showPayModal === true ? (
        <div className='w-screen h-screen bg-slate-600 ml-[-8px] mt-[-8px]'></div>
      ) : (
        <LayoutWithLogo menuTitle='경로' isUasgeDetail={true}>
          <div className='mt-[20px]' />

          <div className=''>
            <div className='ml-[-29px]'>
              <GoogleMapComponent size={{ width: "430px", height: "480px" }} />
              <div className='bg-white top-[-30px] rounded-[16px_16px_0px_0px] h-[100px] relative w-[430px]'>
                <div className='pt-[20px]' />
                <div className='flex'>
                  <div className=''>
                    <div className='mt-[4px]' />
                    <Image
                      src={"/img/mappath.svg"}
                      alt=''
                      width={30}
                      height={69}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <div
                      className='text-[#bbbbbb] text-left relative'
                      style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                    >
                      PICKUP POINT
                    </div>
                    <div className='mt-[4px]' />
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 15px/140% 'Pretendard', sans-serif" }}
                    >
                      Coex
                    </div>
                    <div className='mt-[16px]' />
                    <div
                      className='text-[#bbbbbb] text-left relative'
                      style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                    >
                      DROPOFF
                    </div>
                    <div className='mt-[4px]' />
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 15px/140% 'Pretendard', sans-serif" }}
                    >
                      Incheon International Airport Terminal 1
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-[#E7E7E7] h-[255px] w-[430px]'>
                <div className='pt-[16px]' />
                <div className='bg-[#ffffff] rounded-[10px] h-[56px] mx-[20px] px-[20px] flex items-center justify-between'>
                  <div
                    className='text-[#262628] text-left relative  h-[18.67px] flex items-center justify-start'
                    style={{ font: "600 17px 'Pretendard', sans-serif" }}
                  >
                    Total Price
                  </div>
                  <div
                    className='text-[#262628] text-left relative  h-[22.4px] flex items-center justify-start'
                    style={{ font: "600 20px 'Pretendard', sans-serif" }}
                  >
                    USD 45
                  </div>
                </div>
                <div className='pt-[16px]' />
                <div className='bg-[#DADADA] h-[2px] mx-[20px]' />
                <div className='mt-[17px]' />
                <div className='flex justify-between pl-[41px] pr-[40px]'>
                  <div
                    className='text-[#4c4c4c] text-left relative'
                    style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                  >
                    간편결제
                  </div>
                  <div
                    className='text-[#4c4c4c] text-right relative flex items-center justify-end'
                    style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                  >
                    NicePayments
                  </div>
                </div>
                <div className='pt-[20px]' />
                <div className='mx-10'>
                  <div
                    className='bg-[#0085fe] rounded-[10px] flex flex-row gap-16 items-center justify-center relative h-[56px]'
                    onClick={(e) => {
                      setShowPayModal(true);
                    }}
                  >
                    <div
                      className='text-[#ffffff] text-center relative'
                      style={{ font: "500 16px 'Pretendard', sans-serif" }}
                    >
                      Call now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutWithLogo>
      )}
      <div
        className={
          showPayModal === false
            ? `fixed inset-x-0 bottom-0 flex items-end justify-center transform transition-all translate-y-full`
            : `fixed inset-x-0 bottom-0 flex items-end justify-center transform transition-all translate-y-0`
        }
      >
        <div className='bg-white w-[390px] rounded-t-lg h-[326px] '>
          <div className='flex flex-col'>
            <div className='mt-[32px] ' />
            <div className='mx-[120px] font-sans font-bold text-[18px]'>
              기사님을 호출합니다
            </div>
            <div className='mt-[20px]' />
            <div className='bg-[#f5f6fa] rounded-[10px] w-[330px] px-[12px] h-14 relative mx-[20px] flex flex-row justify-between items-center'>
              <div
                className='text-[#262628] text-left relative  h-[18.67px] flex items-center justify-start'
                style={{ font: "600 17px 'Pretendard', sans-serif" }}
              >
                Total Price
              </div>
              <div
                className='text-[#262628] text-left relative  h-[22.4px] flex items-center justify-start'
                style={{ font: "600 20px 'Pretendard', sans-serif" }}
              >
                USD 45
              </div>
            </div>
            <div className='mt-[32px] ' />
            <div className='flex flex-col pl-[20px]'>
              <div className='flex flex-row justify-start'>
                <input
                  id='cg_instructions'
                  type='checkbox'
                  className='w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  onClick={(e) => {
                    setIsOk((e.target as HTMLInputElement).checked);
                  }}
                />
                <div
                  className='text-[#262628] text-right relative flex items-center justify-end'
                  style={{
                    font: "500 14px/22px 'Pretendard', sans-serif",
                    textDecoration: "underline",
                  }}
                  onClick={(e) => {
                    setOrderAgreement(1);
                    setShowAgreement(true);
                  }}
                >
                  (Required) Instructions and guidelines
                </div>
              </div>

              <div className='mt-[33px]' />
              <div className='bottom-0 flex '>
                <button
                  className='bg-white text-[#0085FE] w-[168px] h-[56px] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px]'
                  onClick={(e) => setShowPayModal(false)}
                >
                  Cancel
                </button>
                {isOk ? (
                  <button
                    className='ml-[6px] w-[174px] h-[56px] bg-[#4187FF] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px] text-white'
                    onClick={(e) => {
                      location.href = "/service/map/path/information";
                      const cb = document.getElementById("cg_instructions");
                      (cb as HTMLInputElement).checked = false;
                    }}
                  >
                    Request
                  </button>
                ) : (
                  <button className='ml-[6px] w-[174px] h-[56px] bg-[#bbbbbb] rounded-[10px] shadow-none border-0 ring-0 text-[16px] text-white'>
                    Request
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 약관읽기 */}
      <InformationModal show={showAgreement} setShow={setShowAgreement}>
        {orderAgreement === 1 ? (
          <div className='label'>
            <div className='element-CI-CS-wrapper'>
              <p className='element-CI-CS'>
                <span className='text-wrapper'>
                  주의사항 및 안내사항
                  <br />
                </span>
                <span className='span'>
                  1. 수집항목
                  <br />
                  &nbsp;&nbsp;개인식별정보(CI), 이름, 휴대전화번호
                  <br />
                  2. 수집 및 이용목적
                  <br /> 서울 뷰티 트래블위크 프로그램 및 뷰티하우스 공간 예약
                  신청 접수, CS 및 분쟁 발생 시 해결을 위한 기록 보존
                  <br />
                  3. 보관기관
                  <br />① 개인정보 수집 및 이용 목적 달성 시 지체없이 파기
                  <br />② 단, 관련 법령에 의하여 일정 기간 보관이 필요한
                  경우에는 해당 기간 동안 보관함
                  <br />
                  4. 동의 거부권 등에 대한 고지
                  <br />
                  &nbsp;&nbsp; 정보주체는 개인정보의 수집 및 이용 동의를 거부할
                  권리가 있으나, 이 경우 서비스 이용이 제한될 수 있습니다.
                </span>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </InformationModal>
    </>
  );
}
