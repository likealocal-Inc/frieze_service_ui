import { useEffect } from "react";

export interface AddressModalProps {
  children?: any;
  show: boolean;
  setShow: Function;
}
export default function InformationModal(props: AddressModalProps) {
  const close = (e: any) => {
    props.setShow(false);
  };

  return (
    <>
      {props.show ? (
        <>
          <div className='fixed top-0 left-0 z-50 w-full h-full bg-white Z-50'>
            <div className='h-[95px] ring-[1px] ring-[#bbbbbb] flex justify-end items-end pb-[12px] px-[20px]'>
              <div
                className='relative w-8 h-8'
                onClick={(e) => props.setShow(false)}
              >
                <svg
                  className='absolute left-[9.14px] top-[9.14px] overflow-visible'
                  style={{}}
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M13.8574 0.142578L0.143066 13.8569'
                    stroke='black'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M0.143066 0.142578L13.8574 13.8569'
                    stroke='black'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>

            <div className='mt-[35px]' />
            <div className='mx-[20px] text-[14px]'>{props.children}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
