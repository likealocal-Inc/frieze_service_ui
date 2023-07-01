import "@/app/globals.css";
import Image from "next/image";
export default function HistoryDetailPage() {
  const ShowInfo = ({ head, value }: any) => {
    return (
      <>
        <div className='flex justify-between mx-[16px]'>
          <div
            className='text-[#bbbbbb] text-left relative'
            style={{ font: "400 14px/160% 'Pretendard', sans-serif" }}
          >
            {head}
          </div>
          <div
            className='text-[#262628] text-right relative'
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
      <div className='w-[390px] h-[844px] ml-[-8px] mt-[-8px]'>
        <div className='w-[390px] h-[95px] bg-white'>
          <div className='pt-[61px]' />
          <div className='flex justify-center font-sans font-bold'>Detail</div>
          <div
            className='mt-[-15px]'
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
        <div className='w-[390px] h-[704px] bg-[#F5F6FA] '>
          <div className='pt-[20px]' />
          <div className='pl-[20px]'>
            <div className='text-[#262628] relative font-sans text-[14px]'>
              2023.09.02(Sat) AM 11 : 30
            </div>
          </div>
          <div className='mt-[12px]' />
          <div className='pl-[20px]'>
            <div className='bg-[#ffffff] rounded-[10px] border-solid border-[rgba(0,0,0,0.10)] border w-[350px] h-[327px] relative'>
              <div className='pt-[17px]' />
              <div className='flex mx-[12px] justify-between'>
                <div className=''>
                  <div className='bg-[#f5f6fa] rounded-[100px] pt-px pr-2 pb-px pl-2 flex flex-row gap-2.5 items-start justify-start relative overflow-hidden'>
                    <div className='text-[#262628] text-center relative font-sans text-[12px] '>
                      Completed
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='text-[#0085fe] text-left relative flex items-center justify-start font-sans text-[13px]'>
                    Order number 123456789
                  </div>
                </div>
              </div>
              <div className='mt-[13px]' />
              <div className='mx-[15px] w-[322px] h-[2px] bg-[#E7E7E7]'></div>
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
              <div className='pt-[15px]' />
              <div className='mx-[15px] w-[322px] h-[2px] bg-[#E7E7E7]'></div>
              <div className='pt-[15px]' />
              <ShowInfo head={"Approval date/time"} value={"2023.00.00"} />
              <div className='mt-[8px]' />
              <ShowInfo head={"Approval number"} value={"111111111"} />
              <div className='mt-[8px]' />
              <ShowInfo head={"Method of Payment"} value={"NICEPAYMENTS"} />
              <div className='mt-[8px]' />
              <ShowInfo head={"Type of Payment"} value={"One-time payment"} />
              <div className='mt-[16px]' />
              <div className='mx-[15px] w-[322px] h-[2px] bg-[#E7E7E7]'></div>
              <div className='mt-[19px]' />
              <div className='flex justify-between mx-[16px]'>
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
                  USD 45
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
            <div className='font-bold ml-[4px]'>
              the customer support office
            </div>
            <div className='ml-[4px]'>directly</div>
          </div>
        </div>
      </div>
    </>
  );
}
