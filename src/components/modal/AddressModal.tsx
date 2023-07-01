export interface AddressModalProps {
  show: boolean;
  setShow: Function;
  isMove: boolean;
}
export default function AddressModal(props: AddressModalProps) {
  const close = (e: any) => {
    props.setShow(false);
  };
  return (
    <>
      {props.show ? (
        <>
          <div className='fixed top-0 left-0 z-50 w-full h-full bg-slate-600 Z-50'>
            <div
              id='addressModal'
              className='bg-white w-[327px] h-[492px] fixed top-[176px] left-[47px] rounded-[10px]'
            >
              <div className='pl-[20px]'>
                <div className='pt-[20px]' />
                <div
                  className='text-[#000000] text-left relative'
                  style={{ font: "700 17px/140% 'Noto Sans KR', sans-serif" }}
                >
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
                <input className='w-[272px] pl-[12px] text-[#262628] text-[16px] border-0 bg-[#f5f6fa] rounded-[10px] relative h-[56px] focus:shadow-none focus:outline-none focus:ring-2 focus:ring-[#BBBBBB]' />
                <div className='pt-[243px]' />
              </div>
              <div className='bottom-0 flex pl-[10px]'>
                <button
                  onClick={(e) => close(e)}
                  className='bg-white text-[#0085FE] w-[148px] h-[56px] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px]'
                >
                  Cancel
                </button>
                <button
                  className='ml-[6px] w-[153px] h-[56px] bg-[#4187FF] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px] text-white'
                  onClick={(e) => {
                    if (props.isMove === true) {
                      location.href = "/service/map/path";
                    }
                  }}
                >
                  Apply
                </button>
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
