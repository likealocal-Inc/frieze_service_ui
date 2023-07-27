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
                <div className='flex'>
                  <div className=''>
                    {/* <div className='bg-[#262628] rounded-[50%] w-4 h-4 relative'></div> */}
                  </div>
                  <div className='pl-[12px]'>
                    {/* <div
                      className='text-[#262628] text-right relative flex items-center justify-end'
                      style={{ font: "500 17px/22px 'Pretendard', sans-serif" }}
                    >
                      {ElseUtils.changeDateFromDBIsoDate(d.created.toString())}
                    </div> */}
                  </div>
                </div>
                <div className='mt-[12px]' />
                <div className=''>
                  <div className='ml-[25px] bg-[#ffffff] rounded-[10px] border-solid border-[rgba(0,0,0,0.10)] border w-[350px] h-[178px] relative'>
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

        {/*  */}
        {/* 
        <div className=''>
          <div className='flex'>
            <div className=''>
              <div className='bg-[#262628] rounded-[50%] w-4 h-4 relative'></div>
            </div>
            <div className='pl-[12px]'>
              <div
                className='text-[#262628] text-right relative flex items-center justify-end'
                style={{ font: "500 17px/22px 'Pretendard', sans-serif" }}
              >
                2023.09.02(Sat) AM 11 : 30
              </div>
            </div>
          </div>
          <div className='mt-[12px]' />
          <div className=''>
            <div className='ml-[25px] bg-[#ffffff] rounded-[10px] border-solid border-[rgba(0,0,0,0.10)] border w-[324px] h-[122px] relative'>
              <div className='mt-[17px]' />
              <div className='flex mx-[12px] justify-between'>
                <div className=''>
                  <div className='bg-[#f5f6fa] rounded-[100px] pt-px pr-2 pb-px pl-2 flex flex-row gap-2.5 items-start justify-start relative overflow-hidden'>
                    <div className='text-[#262628] text-center relative font-sans text-[12px] '>
                      Completed
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div
                    className='text-[#0085fe] text-left relative flex items-center justify-start font-sans text-[14px]'
                    onClick={(e) => {
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
              <div className='mx-[15px] w-[292px] h-[2px] bg-[#E7E7E7]'></div>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex mt-[20px] ml-[18px]'>
                  <Image src={"/img/car.png"} width={80} height={32} alt='' />
                  <div className='flex flex-col items-center '>
                    <div className='w-2.5 h-2.5 static'>
                      <div className='bg-[#ffffff] rounded-[50%] border-solid border-[#c4c4c4] border-[0.5px] w-2.5 h-2.5'></div>
                    </div>
                    <div className='w-1.5 h-1.5 static mt-[-7px] ml-[1px]'>
                      <div className='bg-[#4187ff] rounded-[50%] w-1.5 h-1.5 left-32 top-[324px]'></div>
                    </div>

                    <div
                      className='border-dashed border-[#c4c4c4] w-4 h-0 relative ml-[17px]'
                      style={{
                        borderWidth: "1px 0 0 0",
                        transformOrigin: "0 0",
                        transform: "rotate(90deg) scale(1, 1)",
                      }}
                    />
                    <svg
                      className='relative overflow-visible mt-[10px]'
                      style={{}}
                      width='10'
                      height='12'
                      viewBox='0 0 9 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9 3.98902C9 3.46518 8.88361 2.94646 8.65746 2.46249C8.43131 1.97852 8.09984 1.53877 7.68198 1.16836C7.26412 0.797942 6.76804 0.504113 6.22208 0.303646C5.67611 0.103179 5.09095 0 4.5 0C3.90905 0 3.32389 0.103179 2.77792 0.303646C2.23196 0.504113 1.73588 0.797942 1.31802 1.16836C0.900156 1.53877 0.568688 1.97852 0.342542 2.46249C0.116396 2.94646 -8.80582e-09 3.46518 0 3.98902C0 4.77942 0.263572 5.51454 0.710357 6.13455H0.705214C2.22236 8.24018 4.5 11.3972 4.5 11.3972L8.29479 6.13455H8.29029C8.75341 5.49423 8.99971 4.74964 9 3.98902ZM4.5 5.6986C3.98851 5.6986 3.49797 5.51849 3.13629 5.19788C2.77462 4.87727 2.57143 4.44243 2.57143 3.98902C2.57143 3.53561 2.77462 3.10077 3.13629 2.78017C3.49797 2.45956 3.98851 2.27944 4.5 2.27944C5.01149 2.27944 5.50203 2.45956 5.86371 2.78017C6.22538 3.10077 6.42857 3.53561 6.42857 3.98902C6.42857 4.44243 6.22538 4.87727 5.86371 5.19788C5.50203 5.51849 5.01149 5.6986 4.5 5.6986Z'
                        fill='#F36340'
                      />
                    </svg>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-[#262628] font-sans text-[12px] text-left relative flex items-center justify-start'>
                      272 Gonghang-ro, Jung-gu, In...
                    </div>
                    <div className='mt-[6px]' />
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 13px 'Pretendard', sans-serif" }}
                    >
                      159 samseong-dong
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
