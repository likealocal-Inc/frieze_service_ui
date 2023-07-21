import "@/app/globals.css";
import HistoryListComponent from "@/components/history/HistoryListComponent";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { OrderModel } from "@/models/order";
export default function HistoryListPage() {
  const [selectTapIndex, setSelectTapIndex] = useState(1);

  return (
    <LayoutAuth menuTitle='History'>
      <div className='w-[390px] h-[844px] ml-[-8px] mt-[-8px]'>
        <div className='w-[390px] h-[140px] bg-white'>
          <div className='pt-[61px]' />
          <div className='flex justify-center'>
            <div className='text-[#000000] text-center relative flex items-end justify-center font-sans text-[17px]'>
              History
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
          <div className='mt-[25px]' />
          <div className='flex justify-around'>
            <div className='flex flex-col items-center justify-center w-full '>
              <button
                className='bg-white border-0 outline-none'
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
                    ? `bg-[#0085FE] h-[3px] w-[100px]`
                    : `bg-white h-[0px] w-[0px]`
                }
              ></div>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
              <button
                className='bg-white border-0 outline-none'
                onClick={(e) => {
                  setSelectTapIndex(2);
                }}
              >
                Complete
              </button>
              <div className='mt-[10px]' />
              <div
                className={
                  selectTapIndex === 2
                    ? `bg-[#0085FE] h-[3px] w-[100px]`
                    : `bg-white h-[0px] w-[0px]`
                }
              ></div>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
              <button
                className='bg-white border-0 outline-none'
                onClick={(e) => {
                  setSelectTapIndex(3);
                }}
              >
                Cancel
              </button>
              <div className='mt-[10px]' />
              <div
                className={
                  selectTapIndex === 3
                    ? `bg-[#0085FE] h-[3px] w-[100px]`
                    : `bg-white h-[0px] w-[0px]`
                }
              ></div>
            </div>
          </div>
        </div>
        <div className='w-[390px] h-[704px] bg-[#F5F6FA]'>
          <div className='pt-[35px]' />
          <div className='pl-[20px]'>
            <HistoryListComponent selectIndex={selectTapIndex} />
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}
