import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import { OrderModel } from "@/models/order";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface HistoryListComponentProps {
  selectIndex: number;
}
export default function HistoryListComponent({
  selectIndex,
}: HistoryListComponentProps) {
  const [list, setList] = useState<OrderModel[]>([]);
  useEffect(() => {
    const userId = SecurityUtils.decryptText(
      ElseUtils.getLocalStorage(ElseUtils.localStorageUserIdKey)!
    );
    axios.get(`/api/order?userId=${userId}`).then((d) => {
      setList(d.data.data);
    });
  }, []);
  return (
    <>
      <div className=''>
        {list.map((d, k) => {
          return (
            <div key={k}>
              <div className=''>
                <div className='mt-[12px]' />
                <div className=''>
                  <div className='bg-[#ffffff] rounded-[10px] border-solid border-[rgba(0,0,0,0.10)] border h-[178px] relative'>
                    <div className='mt-[17px]' />
                    <div className='flex mx-[12px] justify-between'>
                      <div className=''>
                        <div className='bg-[#e0e0e0] rounded pt-1 pr-3 pb-1 pl-3 flex flex-row gap-2 items-center justify-center h-6 relative'>
                          <div
                            className='text-[#000000] text-center relative flex items-center justify-center'
                            style={{
                              font: "500 12px/16px 'Noto Sans KR', sans-serif",
                            }}
                          >
                            {d.status}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div
                          className='text-[#0085fe] text-left relative flex items-center justify-start font-sans text-[14px]'
                          onClick={(e) => {
                            ElseUtils.setLocalStorage(
                              ElseUtils.localStorageOrderDetail,
                              JSON.stringify(d)
                            );
                            location.href = "/service/history/detail";
                          }}
                        >
                          Detail
                        </div>
                        <svg
                          className='relative overflow-visible shrink-0'
                          style={{ transform: "translate(0px, 0px)" }}
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M5.48946 3.47501C5.69774 3.28698 6.03543 3.28698 6.24371 3.47501L10.5104 7.32686C10.7187 7.51489 10.7187 7.81975 10.5104 8.00778L6.24371 11.8596C6.03543 12.0477 5.69774 12.0477 5.48946 11.8596C5.28118 11.6716 5.28118 11.3667 5.48946 11.1787L9.379 7.66732L5.48946 4.15592C5.28118 3.96789 5.28118 3.66304 5.48946 3.47501Z'
                            fill='#0085FE'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='mt-[13px]' />
                    <div className='bg-[rgba(217,217,217,0.40)] w-[310px] h-px ml-[10px]'></div>
                    <div className='mt-[13px]' />
                    <div className='flex flex-col items-start ml-[20px]'>
                      <div className=''>
                        <div
                          className='text-[#b1b1b1] text-right relative'
                          style={{
                            font: "400 14px 'Noto Sans KR', sans-serif",
                          }}
                        >
                          주문번호 : {ElseUtils.stringCut(d.id, 13)}
                        </div>
                      </div>
                      <div className='flex mt-[20px]'>
                        <div className='flex flex-col items-center mr-[13px]'>
                          <div className=''>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='5'
                              height='5'
                              viewBox='0 0 5 5'
                              fill='none'
                            >
                              <circle
                                cx='2.5'
                                cy='2.5'
                                r='2.5'
                                fill='#0085FE'
                              />
                            </svg>
                          </div>
                          <div className='w-[1px] bg-[#0085FE] h-[26px] mt-[-5px] mb-[-15px]'></div>
                          <div className=''>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='5'
                              height='5'
                              viewBox='0 0 5 5'
                              fill='none'
                            >
                              <circle
                                cx='2.5'
                                cy='2.5'
                                r='2.5'
                                fill='#0085FE'
                              />
                            </svg>
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <div className='flex '>
                            <div
                              className='text-[#a3a3a3] text-left relative flex items-center justify-start'
                              style={{
                                font: "400 14px/22px 'Noto Sans KR', sans-serif",
                              }}
                            >
                              출발 :
                            </div>
                            <div className='ml-[8px]' />
                            <div className='text-[#262628] font-sans text-[12px] text-left relative flex items-center justify-start'>
                              {ElseUtils.stringCut(d.startAddress, 34)}...
                            </div>
                          </div>
                          <div className='mt-[6px]' />
                          <div className='flex'>
                            <div
                              className='text-[#a3a3a3] text-left relative flex items-center justify-start'
                              style={{
                                font: "400 14px/22px 'Noto Sans KR', sans-serif",
                              }}
                            >
                              도착 :
                            </div>
                            <div className='ml-[8px]' />
                            <div className='text-[#262628] font-sans text-[13px] text-left relative flex items-center justify-start'>
                              {ElseUtils.stringCut(d.goalAddress, 34)}...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-[10px]' />
            </div>
          );
        })}
      </div>
    </>
  );
}
