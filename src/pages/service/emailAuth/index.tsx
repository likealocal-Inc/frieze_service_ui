import { useEffect, useState } from "react";
import "../../../app/globals.css";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "../../../libs/security.utils";
import axios from "axios";
import NotOpen from "../notopen";

export default function AuthEmailPage() {
  const [showModal, setShowModal] = useState<any>(false);

  const [email, setEmail] = useState();

  const sendAuthEmail = () => {
    const info = ElseUtils.getLocalStorageWithoutDecoding("agreement")!;
    if (info === null || info === undefined) {
      ElseUtils.moveAgreementPage();
      return;
    }
    const infoData = JSON.parse(SecurityUtils.decryptText(info));
    const data = SecurityUtils.encryptText(infoData.email);
    axios.post(`/api/auth.email/send?jsdkfjekm=${data}`).then((d) => {
      setShowModal(true);
      return;
    });
  };
  useEffect(() => {
    const agreement = ElseUtils.getLocalStorageWithoutDecoding("agreement");
    if (agreement === null || agreement === undefined) {
      ElseUtils.moveAgreementPage();
      return;
    }
    setEmail(JSON.parse(SecurityUtils.decryptText(agreement)).email);
  }, []);

  return (
    <>
      <div className='mx-[20px] mt-[40px]'>
        <div className='font-bold text-black'>
          {/* <Image
            className='w-[44px] h-[44px]'
            src={"/img/home.svg"}
            alt=''
            width={44}
            height={44}
            onClick={(e) => {
              location.href = "/service/agreement";
            }}
          /> */}
          <div className='mt-[104px]'></div>
          <div className='flex justify-center'>
            <div
              className='text-center text-secondary font-sans text-[18px]'
              style={{ font: "700 28px/42px 'Pretendard', sans-serif" }}
            >
              Verification email
            </div>
          </div>
          <div className='mt-[40px]'></div>
          <div className='flex flex-col text-[15px] font-sans text-[#666] justify-center text-center items-center'>
            <div className='flex text-[#666666]'>
              The verification email has been sent to
            </div>
            <div className='mt-[5px]'></div>
            <div className='text-[#262628] font-bold mx-[1px]'>{email}</div>
            <div className='mt-[5px]'></div>
            <div className=''>If you can&apos;t find th email,</div>
            <div className='mt-[5px]'></div>
            <div className=''>please check your spam folder or click the</div>
          </div>
          <div className='mt-[5px]'></div>
          <div className='flex flex-col text-[17px] justify-center text-center text-[#666]'>
            <div className='flex justify-center font-sans'>
              <button
                onClick={(e) => {
                  sendAuthEmail();
                }}
                className='font-sans bg-white border-none text-[#0085FE] font-bold text-[16px]'
              >
                &apos;Resend Verification Email&apos;
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-600 Z-50 mt-[-340px]'>
          <div className='flex items-center justify-center bg-white rounded-2xl pt-2 flex-col gap-0 w-[328px] relative overflow-hidden mt-[200px] ml-[15px]'>
            <div className='relative self-stretch overflow-hidden shrink-0 h-14'>
              <div className='absolute rounded-lg right-2 left-2 bottom-1 top-1'></div>

              <div
                className='text-high-emphasis text-center absolute right-6 left-6 top-[calc(50%_-_12px)] flex items-center justify-center'
                style={{ font: "700 19px/24px 'Pretendard', sans-serif" }}
              >
                Send verification email again
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
                      Confirm
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
      <NotOpen />
    </>
  );
}
