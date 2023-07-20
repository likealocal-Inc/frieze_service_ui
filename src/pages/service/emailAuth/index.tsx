import { useState } from "react";
import "../../../app/globals.css";
import Image from "next/image";

export default function AuthEmailPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className='mx-[20px] mt-[40px]'>
        <div className=''>
          <Image
            className='w-[44px] h-[44px]'
            src={"/img/home.svg"}
            alt=''
            width={44}
            height={44}
          />
          <div className='mt-[104px]'></div>
          <div className='flex justify-center'>
            <div
              className='text-center text-secondary font-sans text-[18px]'
              style={{ font: "700 28px/42px 'Pretendard', sans-serif" }}
            >
              이메일 인증
            </div>
          </div>
          <div className='mt-[40px]'></div>
          <div className='flex flex-col text-[17px] font-sans text-[#666] justify-center text-center items-center'>
            <div className='flex text-[#666666]'>
              인증 메일이{" "}
              <div className='text-[#262628] font-bold mx-[1px]'>
                kj_kim@likealocal.co.kr
              </div>
              (으)로
            </div>
            <div className='mt-[5px]'></div>
            <div className=''>
              전송되었습니다. 받으신 이메일을 열어 버튼을 클
            </div>
            <div className='mt-[5px]'></div>
            <div className=''>릭하면 가입이 완료됩니다.</div>
          </div>
          <div className='mt-[24px]'></div>
          <div className='flex flex-col text-[14px] justify-center text-center text-[#666]'>
            <div className='font-sans '>이메일을 확인할 수 없나요?</div>
            <div className='mt-[2px]'></div>
            <div className='flex justify-center font-sans'>
              스팸편지함 확인 또는{" "}
              <button
                onClick={(e) => {
                  setShowModal(true);
                }}
                className='font-sans bg-white border-none text-[#0085FE] font-medium'
              >
                인증 메일 다시 보내기
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <div className='absolute top-0 left-0 w-screen h-screen bg-gray-400'>
          <div className='bg-white rounded-2xl pt-2 flex flex-col gap-0 items-center justify-start w-[328px] relative overflow-hidden mt-[300px] ml-[30px]'>
            <div className='relative self-stretch overflow-hidden shrink-0 h-14'>
              <div className='absolute rounded-lg right-2 left-2 bottom-1 top-1'></div>

              <div
                className='text-high-emphasis text-center absolute right-6 left-6 top-[calc(50%_-_12px)] flex items-center justify-center'
                style={{ font: "700 19px/24px 'Pretendard', sans-serif" }}
              >
                인증메일이 재전송 되었습니다.
              </div>
            </div>

            <div className='relative flex flex-col items-center self-stretch justify-start gap-4 pt-4 pb-6 pl-6 pr-6 shrink-0'>
              <div
                onClick={(e) => {
                  setShowModal(false);
                }}
                className='bg-[#0085fe] rounded-lg pt-1.5 pr-4 pb-1.5 pl-4 flex flex-col gap-2.5 items-center justify-center self-stretch shrink-0 h-[42px] relative'
              >
                <div className='relative flex flex-row items-center justify-center gap-0 overflow-hidden shrink-0'>
                  <div className='pr-1 pl-1 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden'>
                    <div
                      className='relative flex items-center justify-center text-center text-white'
                      style={{ font: "500 14px/24px 'Pretendard', sans-serif" }}
                    >
                      확인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
