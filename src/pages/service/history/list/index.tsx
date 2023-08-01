import "@/app/globals.css";
import HistoryListComponent from "@/components/history/HistoryListComponent";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import { useState } from "react";
export default function HistoryListPage() {
  const [selectTapIndex, setSelectTapIndex] = useState(1);

  return (
    <LayoutAuth menuTitle='History' isLogo={false} isMargin={false}>
      <div className=''>
        <div className='h-[113px] bg-white'>
          <div className='pt-[61px]' />
          <div className='flex justify-center w-screen'>
            <div className='text-[#000000] text-center font-bold relative flex items-end justify-center font-sans text-[17px]'>
              My Page
            </div>
          </div>

          {/* 종료 */}
          <div className='flex justify-end mr-[20px] mt-[-25px]'>
            <div
              className='relative w-8 h-8'
              onClick={(e) => {
                location.href = "/service/map";
              }}
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
                  d='M13.8571 0.142578L0.142822 13.8569'
                  stroke='black'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M0.142822 0.142578L13.8571 13.8569'
                  stroke='black'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>

          {/* 탭 */}
          <div className='pt-[25px]' />
          {/* 라인 */}

          <div className='flex bg-[#f5f6fa] h-[53px]'>
            <div className='flex flex-col items-center justify-center w-full pt-[20px]'>
              <button
                className={
                  selectTapIndex === 1
                    ? `text-[#0085fe] border-0 outline-none bg-[#f5f6fa]`
                    : `text-[#bbbbbb] border-0 outline-none bg-[#f5f6fa]`
                }
                onClick={(e) => {
                  setSelectTapIndex(1);
                }}
              >
                ALL
              </button>
              <div className='mt-[10px]' />
              <div
                className={
                  selectTapIndex === 1
                    ? `bg-[#0085FE] h-[3px] w-[50px] z-50`
                    : `bg-white h-[0px] w-[50px]`
                }
              ></div>
            </div>
            <div className='flex flex-col items-center justify-center w-full pt-[20px]'>
              <button
                className={
                  selectTapIndex === 2
                    ? `text-[#0085fe] border-0 outline-none bg-[#f5f6fa]`
                    : `text-[#bbbbbb] border-0 outline-none bg-[#f5f6fa]`
                }
                onClick={(e) => {
                  setSelectTapIndex(2);
                }}
              >
                결제완료
              </button>
              <div className='mt-[10px]' />
              <div
                className={
                  selectTapIndex === 2
                    ? `bg-[#0085FE] h-[3px] w-[100px] z-50`
                    : `bg-white h-[0px] w-[0px]`
                }
              ></div>
            </div>
            <div className='flex flex-col items-center justify-center w-full pt-[20px]'>
              <button
                className={
                  selectTapIndex === 3
                    ? `text-[#0085fe] border-0 outline-none bg-[#f5f6fa]`
                    : `text-[#bbbbbb] border-0 outline-none bg-[#f5f6fa]`
                }
                onClick={(e) => {
                  setSelectTapIndex(3);
                }}
              >
                이용완료
              </button>
              <div className='mt-[10px]' />
              <div
                className={
                  selectTapIndex === 3
                    ? `bg-[#0085FE] h-[3px] w-[100px] z-50`
                    : `bg-white h-[0px] w-[0px]`
                }
              ></div>
            </div>
            <div className='flex flex-col items-center justify-center w-full pt-[20px]'>
              <button
                className={
                  selectTapIndex === 4
                    ? `text-[#0085fe] border-0 outline-none bg-[#f5f6fa]`
                    : `text-[#bbbbbb] border-0 outline-none bg-[#f5f6fa]`
                }
                onClick={(e) => {
                  setSelectTapIndex(4);
                }}
              >
                이용취소
              </button>
              <div className='mt-[10px]' />
              <div
                className={
                  selectTapIndex === 4
                    ? `bg-[#0085FE] h-[3px] w-[100px] z-50`
                    : `bg-white h-[0px] w-[0px]`
                }
              ></div>
            </div>
          </div>
        </div>

        <div className='pt-[50px]' />
        <div className='bg-[#DADADA] h-[0.5px] w-full'></div>
        <div className='h-full bg-[#F5F6FA]'>
          <div className='pt-[10px]' />
          <div className='px-[20px]'>
            <HistoryListComponent selectIndex={selectTapIndex} />
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
