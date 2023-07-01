import "@/app/globals.css";

export default function PaymentPage() {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-slate-600 Z-50'>
        <div className='bg-white w-[327px] h-[360px] fixed top-[176px] left-[30px] rounded-[10px]'>
          <div className='ml-[24px] mt-[18px] relative flex items-center justify-start font-sans font-bold text-left text-high-emphasis'>
            주의사항 및 안내사항
          </div>
          <div className='mt-[26px]' />
          <div className='ml-[24px] text-[12px] font-sans text-[#4187ff] text-left uppercase relative flex items-center justify-start'>
            꼭 확인해주세요!
          </div>
          <div className='mt-[16px]' />
          <div className='ml-[24px] leading-relaxed text-[#bbbbbb]  mr-[10px] text-[14px] font-sans relative  text-left text-mid-emphasis'>
            1. Request 버튼을 클릭하면 결제창으로 이동합니다. <br />
            2. 배차가 완료되면취소가 불가합니다. <br />
            3. 배차가 되기 전에 취소를 원할 경우, 고객지원실 채팅창을 통해 직접
            문의 해주세요
            <br />
            4. 결제 완료 이후 택시 탑승 정보 전달은 ‘고객 지원실’ 채팅창을 통해
            진행됩니다. 결제 직후 채팅창을 꼭 확인해주세요
          </div>
          <div className='mt-[24px]' />
          <div className='mx-[24px] bottom-0 flex '>
            <button
              className='bg-white text-[#0085FE] w-[148px] h-[56px] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px]'
              onClick={(e) => {
                history.back();
              }}
            >
              Cancel
            </button>
            <button
              className='ml-[6px] w-[148px] h-[56px] bg-[#4187FF] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px] text-white'
              onClick={(e) => {
                location.href = "/service/payment";
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
