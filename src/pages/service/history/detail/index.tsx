import "@/app/globals.css";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import { OrderModel } from "@/models/order";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function HistoryDetailPage() {
  const [data, setdata] = useState<OrderModel>();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const data = ElseUtils.getLocalStorageWithoutDecoding(
      ElseUtils.localStorageOrderDetail
    );
    if (data === null || data === undefined) {
      history.back();
      return;
    }
    const dataJson = JSON.parse(SecurityUtils.decryptText(data!));
    setdata(dataJson);

    const userInfo = ElseUtils.getLocalstorageUser();
    if (userInfo == null) {
      ElseUtils.moveMapPage();
      return;
    }
    setUser(userInfo);
  }, []);
  const ShowInfo = ({ head, value, textColor = null }: any) => {
    return (
      <>
        <div className='flex justify-between mx-[20px]'>
          <div
            className='text-[#bbbbbb] text-left relative'
            style={{ font: "400 14px/160% 'Pretendard', sans-serif" }}
          >
            {head}
          </div>
          <div
            className={
              textColor
                ? `text-[#${textColor}] text-right relative`
                : "text-[#262628] text-right relative"
            }
            style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
          >
            {value}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {data ? (
        <LayoutAuth menuTitle='History' isLogo={false} isMargin={false}>
          <div className='w-full h-screen'>
            <div className='w-full h-[95px] bg-white'>
              <div className='pt-[44px]' />
              <div className='flex justify-center font-sans font-bold text-[17px]'>
                Detail
              </div>
              <div
                className='mt-[-15px] ml-[-10px]'
                onClick={(e) => {
                  history.back();
                }}
              >
                <svg
                  className='relative overflow-visible pl-[41px]'
                  style={{}}
                  width='9'
                  height='17'
                  viewBox='0 0 9 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8.78929 1.24572C9.07024 0.960744 9.07024 0.498707 8.78929 0.213732C8.50834 -0.0712439 8.05283 -0.0712439 7.77188 0.213732L0.280949 7.81201C-0.0936498 8.19198 -0.0936498 8.80802 0.280949 9.18799L7.77188 16.7863C8.05283 17.0712 8.50834 17.0712 8.78929 16.7863C9.07024 16.5013 9.07024 16.0393 8.78929 15.7543L1.63749 8.5L8.78929 1.24572Z'
                    fill='#262626'
                  />
                </svg>
              </div>
            </div>
            <div className='px-[20px] h-screen bg-[#F5F6FA]'>
              <div className='pt-[20px]' />
              <div className=''>
                <div className='flex justify-between'>
                  <div className=''>
                    <div className='bg-[#e0e0e0] rounded pt-1 pr-3 pb-1 pl-3 flex flex-row gap-2 items-center justify-center h-6 relative'>
                      <div
                        className='text-[#000000] text-center relative flex items-center justify-center'
                        style={{
                          font: "500 12px/16px 'Noto Sans KR', sans-serif",
                        }}
                      >
                        {data.status}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='text-[#000000] text-left relative flex items-center justify-start font-sans text-[12px] font-bold mr-[5px]'>
                      주문번호 {ElseUtils.stringCut(data.id, 13)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-[12px]' />
              <div className=''>
                <div className='bg-[#ffffff] rounded-[10px] border-solid border-[rgba(0,0,0,0.10)] border h-[362px] relative'>
                  <div className='mt-[24px]' />
                  <div className='flex justify-center'>
                    <Image
                      className='w-[155px] h-[62px]'
                      src={"/img/car.png"}
                      width={155}
                      height={62}
                      alt=''
                    />
                  </div>
                  <div className='mt-[26px]' />
                  <div className='flex flex-col'>
                    <div className='flex ml-[24px] items-center'>
                      <div className='flex flex-col items-center mr-[13px]'>
                        <div className='mt-[-5px]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='5'
                            height='5'
                            viewBox='0 0 5 5'
                            fill='none'
                          >
                            <circle cx='2.5' cy='2.5' r='2.5' fill='#0085FE' />
                          </svg>
                        </div>
                        <div className='w-[1px] bg-[#0085FE] h-[30px] mt-[-4px] mb-[-15px]'></div>
                        <div className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='5'
                            height='5'
                            viewBox='0 0 5 5'
                            fill='none'
                          >
                            <circle cx='2.5' cy='2.5' r='2.5' fill='#0085FE' />
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
                          <div className='text-[#262628] font-sans text-[16px] text-left relative flex items-center justify-start'>
                            {ElseUtils.stringCut(data.startAddress, 25)}...
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
                          <div className='text-[#262628] font-sans text-[16px] text-left relative flex items-center justify-start'>
                            {ElseUtils.stringCut(data.goalAddress, 25)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='pt-[15px]' />
                  <div className='mx-[15px]  h-[2px] bg-[#E7E7E7]'></div>
                  <div className='pt-[15px]' />
                  <ShowInfo
                    head={"Approval date/time"}
                    value={data.approvalDate}
                  />
                  <div className='mt-[8px]' />
                  <ShowInfo
                    head={"Email"}
                    value={user ? user.email : "loading"}
                  />
                  <div className='mt-[8px]' />
                  <ShowInfo
                    head={"Status"}
                    value={data.status}
                    textColor={"0085fe"}
                  />

                  <div className='mt-[16px]' />
                  <div className='mx-[15px]  h-[2px] bg-[#E7E7E7]'></div>
                  <div className='mt-[19px]' />
                  <div className='flex justify-between mx-[16px]'>
                    <div
                      className='text-[#262628] text-left relative'
                      style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
                    >
                      Total Price
                    </div>

                    <div
                      className='text-[#262628] text-right relative font-bold'
                      style={{ font: "500 17px/160% 'Pretendard', sans-serif" }}
                    >
                      USD {JSON.parse(data.priceInfo).lastPrice}
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-[20px]' />
              <div className='flex justify-center font-sans text-[14px]'>
                For more information,
              </div>
              <div className='mt-[5px]' />
              <div className='flex justify-center font-sans text-[14px]'>
                <div className=''>please contact</div>
                <div
                  className='font-bold ml-[4px] custom-button-1'
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  the customer support office
                </div>
                <div className='ml-[4px]'>directly</div>
              </div>
            </div>
          </div>
        </LayoutAuth>
      ) : (
        ""
      )}
    </>
  );
}
