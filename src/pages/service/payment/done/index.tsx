import "@/app/globals.css";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { OrderModel } from "../../../../models/order";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import ChannelService from "@/libs/channel.utils";

export default function PaymentDonePage() {
  const [orderModel, setOrderModel] = useState<OrderModel>();
  const [user, setUser] = useState<any>();

  const [channel, setChannel] = useState<any>(undefined);

  const [widthSize, setWidthSize] = useState(0);

  const [showCancelModal, setShowCancelModal] = useState(false);
  useEffect(() => {
    setWidthSize(window.innerWidth);

    const obj = new ChannelService();
    obj.loadScript();

    obj.boot({
      pluginKey: "1c92aeb0-97cd-4046-bbb2-1b3beb594511", // fill your plugin key
      customLauncherSelector: ".custom-button-1",
      hideChannelButtonOnBoot: true,
    });
    setChannel(obj);
  }, []);

  useEffect(() => {
    const orderStr = ElseUtils.getLocalStorage(
      ElseUtils.localStorageOrderDetail
    );

    if (orderStr === null || orderStr === undefined) {
      ElseUtils.moveMapPage();
      return;
    }
    const userInfo = ElseUtils.getLocalstorageUser();
    if (userInfo == null) {
      ElseUtils.moveMapPage();
      return;
    }
    setUser(userInfo);
    const order = JSON.parse(SecurityUtils.decryptText(orderStr));
    setOrderModel(order);
  }, []);

  return (
    <>
      {orderModel ? (
        <LayoutAuth menuTitle='' isLogo={false} isMargin={false}>
          <div
            className={`bg-[#F5F6FA] w-[${widthSize}px] h-screen px-[20px] pb-[130px]`}
          >
            <div className='pt-[40px]' />
            <div className='flex justify-between'>
              <div
                className=''
                onClick={(e) => (location.href = "/service/map")}
              >
                <Image
                  src={"/img/home_icon.svg"}
                  width={44}
                  height={44}
                  alt=''
                />
              </div>
              <div
                className='w-[87px] h-[38px] bg-[#e0e0e0] rounded-[40px] justify-center items-center flex flex-row gap-2.5 relative overflow-hidden'
                onClick={(e) => {
                  setShowCancelModal(true);
                }}
              >
                <div
                  className='text-[#000000] text-center relative'
                  style={{ font: "500 14px/22px 'Pretendard', sans-serif" }}
                >
                  호출취소
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center'>
              {/* <Image
                src={"/img/check_icon.svg"}
                width={56}
                height={56}
                alt=''
              /> */}
              <div className='mt-[12px]' />
              <div
                className='relative text-center'
                style={{ font: "700 18px/140% 'Pretendard', sans-serif" }}
              >
                <span>
                  <span className=''>
                    Payment has been successfully
                    <br />
                    completed. The estimated waiting time
                    <br />
                  </span>
                  <span className='text-[#0085FE]'>
                    until dispatch is 7 minutes
                  </span>
                </span>
              </div>
              <div className='mt-[24px]' />
              <div className='w-full bg-[#ffffff] rounded-[10px] border-solid border-[rgba(0,0,0,0.10)] border h-[297px] '>
                <div className='flex mt-[32px] ml-[18px]'>
                  <Image src={"/img/car.png"} width={80} height={32} alt='' />
                  <div className='flex flex-col items-center justify-center'>
                    <div className='w-2.5 h-2.5 static'>
                      <div className='bg-[#ffffff] rounded-[50%] border-solid border-[#c4c4c4] border-[0.5px] w-2.5 h-2.5 left-[126px] top-[322px]'></div>
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
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 13px/140% 'Pretendard', sans-serif" }}
                    >
                      {ElseUtils.stringCut(orderModel.startAddress, 25)}...
                    </div>
                    <div className='mt-[6px]' />
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 13px 'Pretendard', sans-serif" }}
                    >
                      {ElseUtils.stringCut(orderModel.goalAddress, 25)}...
                    </div>
                  </div>
                </div>
                <div className='mt-[19px]' />
                <div className='h-[1px] w-[318px] bg-[#E7E7E7] mx-[16px]' />
                <div className='mt-[16px]' />
                <div className='flex justify-between mx-[17px]'>
                  <div
                    className='text-[#bbbbbb] text-left relative'
                    style={{ font: "400 14px/160% 'Pretendard', sans-serif" }}
                  >
                    Order number
                  </div>
                  <div
                    className='text-[#262628] text-right relative'
                    style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
                  >
                    {ElseUtils.stringCut(orderModel.id, 8)}
                  </div>
                </div>
                <div className='mt-[8px]' />
                <div className='flex justify-between mx-[17px]'>
                  <div
                    className='text-[#bbbbbb] text-left relative'
                    style={{ font: "400 14px/160% 'Pretendard', sans-serif" }}
                  >
                    Approval date/time
                  </div>
                  <div
                    className='text-[#262628] text-right relative'
                    style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
                  >
                    {orderModel.approvalDate}
                  </div>
                </div>
                <div className='mt-[13px]' />
                <div className='flex justify-between mx-[17px]'>
                  <div
                    className='text-[#bbbbbb] text-left relative'
                    style={{ font: "400 14px/160% 'Pretendard', sans-serif" }}
                  >
                    Email
                  </div>
                  <div
                    className='text-[#262628] text-right relative'
                    style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
                  >
                    {user.email}
                  </div>
                </div>
                <div className='mt-[8px]' />
                <div className='flex justify-between mx-[17px]'>
                  <div
                    className='text-[#bbbbbb] text-left relative'
                    style={{ font: "400 14px/160% 'Pretendard', sans-serif" }}
                  >
                    Status
                  </div>
                  <div
                    className='text-[#262628] text-right relative'
                    style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
                  >
                    {orderModel.status}
                  </div>
                </div>
                <div className='mt-[16px]' />
                <div className='h-[1px] w-[318px] bg-[#E7E7E7] mx-[16px]' />
                <div className='mt-[16px]' />
                <div className='flex justify-between mx-[17px]'>
                  <div
                    className='text-[#262628] text-left relative'
                    style={{ font: "500 14px/160% 'Pretendard', sans-serif" }}
                  >
                    Total Price
                  </div>

                  <div
                    className='text-[#262628] text-right relative'
                    style={{ font: "500 17px/160% 'Pretendard', sans-serif" }}
                  >
                    USD {JSON.parse(orderModel.priceInfo).lastPrice}
                  </div>
                </div>
              </div>
              <div className='mt-[40px]' />
              {/* <div className='bg-black h-[63px] rounded-xl w-full flex flex-col items-center text-white font-sans text-[13px] justify-center'>
                <div className='flex'>
                  <div className=''>Further</div>
                  <div className='ml-[2px] font-bold text-[#0085FE]'>
                    dispatch information
                  </div>
                </div>
                <div className='mt-[3px]' />
                will be provided through the chat room!
              </div> */}

              <button
                className='bg-[#0085fe] rounded-[10px] pt-3 pr-10 pb-3 pl-10 flex flex-row gap-16 items-center justify-center h-14 relative border-0 w-full custom-button-1'
                onClick={(e) => {
                  channel.showMessenger();
                }}
              >
                <div
                  className='text-[#ffffff] text-center relative'
                  style={{ font: "500 16px 'Pretendard', sans-serif" }}
                >
                  Dispatch information
                </div>
              </button>
            </div>
          </div>
        </LayoutAuth>
      ) : (
        ""
      )}
      <div
        className={
          showCancelModal === true
            ? `absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-60 flex justify-center items-center`
            : `hidden`
        }
      >
        <div className='bg-white rounded-2xl pt-2 flex flex-col gap-0 items-center justify-start w-[328px] h-[146px] relative overflow-hidden'>
          <div className='relative self-stretch overflow-hidden shrink-0 h-14'>
            <div className='absolute rounded-lg right-2 left-2 bottom-1 top-1'></div>

            <div
              className='text-high-emphasis text-center absolute right-6 left-6 top-[calc(50%_-_24px)] flex items-center justify-center'
              style={{ font: "700 19px/24px 'Pretendard', sans-serif" }}
            >
              Are you sure you want to cancel the call?
            </div>
          </div>
          <div className='mt-[20px]'></div>

          <div className='flex'>
            <div className='w-[135px] h-[45px] border-gray-300 rounded-xl border-solid border-1'>
              <div
                className='flex items-center justify-center w-full h-full text-center text-gray-500'
                style={{ font: "500 14px/24px 'Pretendard', sans-serif" }}
              >
                Keep Call
              </div>
            </div>
            <div className='ml-[8px]'></div>
            <div className='w-[135px] h-[45px] bg-[#0085fe] rounded-xl'>
              <div
                className='flex items-center justify-center w-full h-full text-center text-white '
                style={{ font: "500 14px/24px 'Pretendard', sans-serif" }}
                onClick={(e) => {
                  setShowCancelModal(false);
                }}
              >
                Cancel the Call
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
