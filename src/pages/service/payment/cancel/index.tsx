import "@/app/globals.css";
import Image from "next/image";

export default function PaymentCancelPage() {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-slate-600 Z-50'>
        <div className='flex justify-center bg-white w-[328px] h-[272px] fixed top-[176px] left-[30px] rounded-[10px]'>
          <div className='flex flex-col items-center w-full h-full'>
            <div className='mt-[24px]' />
            <Image src={"/img/icon-erro.svg"} width={60} height={60} alt='' />
            <div className='mt-[16px]' />
            <div className='text-[19px] font-sans font-bold'>결제 실패</div>
            <div className='mt-[24px]' />
            <div className='font-sans text-[#bbbbbb] text-[14px]'>
              다시 결제를 시도해주세요
            </div>
            <div className='mt-[24px]' />
            <button
              className='h-[56px] w-[280px] border-0 rounded-lg bg-[#0085FE] text-white text-[14px]'
              onClick={(e) => {
                location.href = "/service/agreement";
              }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
