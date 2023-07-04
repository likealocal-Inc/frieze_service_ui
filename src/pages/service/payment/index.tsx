import "../../../app/globals.css";

export default function PaymentPage() {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-slate-600 Z-50'>
        <div className='flex items-center justify-center bg-white w-[327px] h-[492px] fixed top-[76px] left-[30px] rounded-[10px]'>
          나이스페이먼츠
          <button
            onClick={(e) => {
              location.href = "/service/payment/done";
            }}
          >
            완료
          </button>
          <button
            onClick={(e) => {
              location.href = "/service/payment/cancel";
            }}
          >
            실패
          </button>
        </div>
      </div>
    </>
  );
}
