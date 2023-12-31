import InformationModal from "@/components/modal/InformationModal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "../../../../css/information/private.infomation.css";
import { GooglePathMapComponent } from "@/components/map/GooglePathMapComponent";
import { AddressInfo } from "@/components/modal/AddressModal";
import { ElseUtils } from "@/libs/else.utils";
import LayoutAuth from "@/components/layouts/LayoutAuth";
import { SecurityUtils } from "@/libs/security.utils";
import { useRouter } from "next/router";
import { IBookingFormData, PaymentMetaInfo } from "../../payment/index2";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import getConfig from "next/config";
import NicePaymentForm from "@/components/NicePayment/NicePaymentForm";
import GlobalScript from "@/libs/GlobalScript";
import { SpinnerComponent } from "@/components/spinner";
import ChannelTalk from "@/components/chaneltalk/ChannelTalk";
import NotOpen from "../../notopen";
const { publicRuntimeConfig } = getConfig();

let num = 0;

// 경로 결과 정보
export interface PathInfoProp {
  distance: number;
  duration: number;
  fuelPrice: number;
  taxiPrice: number;
  tollFare: number;
  lastPrice: number;
  lastUSPrice: number;
}
export default function MapPathPage() {
  const router = useRouter();
  const [showPayModal, setShowPayModal] = useState(false);

  const [showAgreement, setShowAgreement] = useState(false);
  const [orderAgreement, setOrderAgreement] = useState(0);

  const [startLocation, setStartLocation] = useState<AddressInfo>();
  const [goalLocation, setGoalLocation] = useState<AddressInfo>();

  const [widthSize, setWidthSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isGetPath, setIsGetPath] = useState(true);
  const [priceInfo, setPriceInfo] = useState<PathInfoProp>({
    distance: 0,
    duration: 0,
    fuelPrice: 0,
    taxiPrice: 0,
    tollFare: 0,
    lastPrice: 0,
    lastUSPrice: 0,
  });

  const [isOk, setIsOk] = useState(false);
  const [user, setUser] = useState<any>();

  const [tempKey, _] = useState(`k-${new Date().getTime()}`);

  // 주문 메타정보 가져 왔는지 여부
  const [isGetPayMetaInfo, setIsGetPayMetaInfo] = useState(false);

  const [paymentMetaInfo, setPaymentMetaInfo] = useState<PaymentMetaInfo>();

  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<IBookingFormData>({ mode: "onChange" });

  useEffect(() => {
    (document.body.style as any).zoom = "100%";
  });

  useEffect(() => {
    // 현재 디바이스의 가로 길이를 가져옴
    setWidthSize(window.innerWidth);

    const userInfo = ElseUtils.getLocalstorageUser();
    if (userInfo == null) {
      ElseUtils.moveMapPage();
      return;
    }
    setUser(userInfo);

    const start = ElseUtils.getLocalStorageWithoutDecoding(
      ElseUtils.localStorageStartInfo
    );
    const goal = ElseUtils.getLocalStorageWithoutDecoding(
      ElseUtils.localStorageGoalInfo
    );

    if (start === null || goal === null) {
      ElseUtils.moveMapPage();
      return;
    }

    const startJson = JSON.parse(SecurityUtils.decryptText(start));
    const goalJaon = JSON.parse(SecurityUtils.decryptText(goal));

    setStartLocation(startJson);
    setGoalLocation(goalJaon);

    if (router.query.from === "cancel") {
      setShowPayModal(true);
    }
  }, []);

  // useEffect(() => {
  //   if (!router.isReady) return;
  // }, [router]);

  useEffect(() => {
    if (priceInfo.taxiPrice === 0) return;

    // 경로 금액 계산 결과 값을 세팅
    ElseUtils.setLocalStoragWithEncoding(
      ElseUtils.localStoragePrideInfo,
      JSON.stringify(priceInfo)
    );

    setTimeout(() => {
      // 결제때 사용한 이메일 가져옴
      const priceInfoStr = ElseUtils.getLocalStorageWithoutDecoding(
        ElseUtils.localStoragePrideInfo
      );
      if (priceInfoStr === null || priceInfoStr === undefined) {
        ElseUtils.moveMapPage();
        return;
      }
      const priceInfo = SecurityUtils.decryptText(priceInfoStr);

      // 결제 정보 가져 왔으면 중단
      if (isGetPayMetaInfo === true) {
        return;
      } else {
        num = 0;
      }

      // 결제초기세팅
      const param = {
        email: user.email,
        price: JSON.parse(priceInfo).lastUSPrice,
        tempKey: tempKey,
      };

      if (!router.isReady) return;
      // 결제를 위한 초기 정보를 읽어옴
      if (num++ === 0) {
        console.log("서버에 결제 초기 데이터 조회");
        axios
          .post(`${publicRuntimeConfig.APISERVER}/order/payment/init`, {
            kdjifnkd44333: SecurityUtils.encryptText(JSON.stringify(param)),
          })
          .then((d) => {
            if (d.data !== false) {
              // 결제 정보 가져온거 세팅
              setIsGetPayMetaInfo(true);

              // 데이터 세팅
              setPaymentMetaInfo(d.data);

              // 스토리지에 데이터 저장 (여기에 메타정보가 들어 있는 모든 값이 포함 - 이후에 ID를 사용해야 함)
              ElseUtils.setLocalStoragWithEncoding(
                ElseUtils.localStoragePaymentMetaInfo,
                JSON.stringify(d.data)
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }

      setIsGetPath(false);
    }, 200);
    // 요금정보 저장
  }, [priceInfo]);

  // const getPrice = async (key: string) => {
  //   const info = await axios.get("/api/path.info");
  //   console.log(info);
  //   setPriceInfo(info.data);
  // };

  useEffect(() => {
    const userInfo = ElseUtils.getLocalstorageUser();
    if (userInfo == null) {
      ElseUtils.moveMapPage();
      return;
    }
    setUser(userInfo);

    return;
  }, []);

  const onSubmit: SubmitHandler<IBookingFormData> = (data: any) => {
    if (formRef.current !== null) {
      formRef.current.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
      formRef.current.acceptCharset = "euc-kr";
      formRef.current.submit();
      return;
    }
  };

  return (
    <>
      {showPayModal === true ? (
        <SpinnerComponent />
      ) : (
        <LayoutAuth menuTitle='경로' isUasgeDetail={true} isMargin={false}>
          <div className='mt-[10px]' />
          <div
            className='absolute top-[75px] z-50 left-[14px]'
            onClick={(e) => {
              ElseUtils.moveMapPage();
            }}
          >
            <Image alt='' src={"/icon/back.svg"} width={44} height={44} />
          </div>

          <div className=''>
            <div className=''>
              <GooglePathMapComponent
                size={{ width: `${widthSize}px`, height: "280px" }}
                setPathInfo={setPriceInfo}
                setStart={setStartLocation}
                setGoal={setGoalLocation}
                setIsGetPayMetaInfo={setIsGetPayMetaInfo}
              />

              <div
                className={`bg-white top-[-30px] rounded-[16px_16px_0px_0px] h-[100px] relative px-[10px]`}
              >
                <div className='pt-[16px]' />
                <div className='flex'>
                  <div className=''>
                    <div className='mt-[4px]' />
                    <Image
                      src={"/img/mappath.svg"}
                      alt=''
                      width={30}
                      height={69}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <div
                      className='text-[#bbbbbb] text-left relative'
                      style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                    >
                      PICKUP POINT
                    </div>
                    <div className='mt-[4px]' />
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 15px/140% 'Pretendard', sans-serif" }}
                    >
                      {ElseUtils.truncateString(startLocation?.desc!, 35)}
                    </div>
                    <div className='mt-[16px]' />
                    <div
                      className='text-[#bbbbbb] text-left relative'
                      style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                    >
                      DROPOFF
                    </div>
                    <div className='mt-[4px]' />
                    <div
                      className='text-[#262628] text-left relative flex items-center justify-start'
                      style={{ font: "500 15px/140% 'Pretendard', sans-serif" }}
                    >
                      {ElseUtils.truncateString(goalLocation?.desc!, 35)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-[#E7E7E7] h-screen px-[20px]'>
                <div className='pt-[16px]' />
                <div className='bg-[#ffffff] rounded-[10px] h-[56px] px-[20px] flex items-center justify-between'>
                  <div
                    className='text-[#262628] text-left relative  h-[18.67px] flex items-center justify-start'
                    style={{ font: "600 17px 'Pretendard', sans-serif" }}
                  >
                    Total Price
                  </div>
                  <div
                    className='text-[#262628] text-left relative  h-[22.4px] flex items-center justify-start'
                    style={{ font: "600 20px 'Pretendard', sans-serif" }}
                  >
                    USD {priceInfo ? priceInfo.lastPrice : "...."}
                  </div>
                </div>
                <div className='pt-[16px]' />
                <div className='bg-[#DADADA] h-[2px]' />
                <div className='mt-[17px]' />
                <div className='flex justify-between'>
                  <div
                    className='text-[#4c4c4c] text-left relative'
                    style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                  >
                    간편결제
                  </div>
                  <div
                    className='text-[#4c4c4c] text-right relative flex items-center justify-end'
                    style={{ font: "500 12px/17px 'Pretendard', sans-serif" }}
                  >
                    NicePayments
                  </div>
                </div>
                <div className='pt-[20px]' />
                <div className=''>
                  {isGetPayMetaInfo ? (
                    <div
                      className='bg-[#0085fe] rounded-[10px] flex flex-row items-center justify-center relative h-[56px]'
                      onClick={(e) => {
                        setShowPayModal(true);
                      }}
                    >
                      <div
                        className='text-[#ffffff] text-center relative'
                        style={{ font: "500 16px 'Pretendard', sans-serif" }}
                      >
                        Call now
                      </div>
                    </div>
                  ) : (
                    <div className='bg-gray-400 rounded-[10px] flex flex-row items-center justify-center relative h-[56px]'>
                      <div
                        className='text-[#ffffff] text-center relative'
                        style={{ font: "500 16px 'Pretendard', sans-serif" }}
                      >
                        Loading......
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 채널톡 설정 */}
          <ChannelTalk />
          <NotOpen />
        </LayoutAuth>
      )}

      {/* 위치정보와 금액 세팅할때까지 화면을 막는다. */}
      {isGetPath ? (
        <div
          className={`absolute top-0 left-0 w-[${widthSize}px] h-[950px] bg-slate-400 bg-opacity-50 flex justify-center items-center`}
        ></div>
      ) : (
        ""
      )}

      {/* 기사호출 모달 */}
      <div
        className={
          showPayModal === false
            ? `fixed inset-x-0 bottom-0 flex items-end justify-center transform transition-all translate-y-full `
            : `fixed inset-x-0 bottom-0 flex items-end justify-center transform transition-all translate-y-0`
        }
      >
        <div className={`bg-white rounded-t-xl h-[660px] w-[${widthSize}px]`}>
          <div className='flex flex-col px-[20px]'>
            <div className='mt-[30px] ' />
            <div className='flex justify-center'>
              <div className='font-sans font-bold text-[18px]'>
                Call the Taxi
              </div>
            </div>
            <div className='mt-[20px]' />
            <div className='bg-[#f5f6fa] rounded-[10px] px-[12px] h-14 flex flex-row justify-between items-center'>
              <div className='text-[#262628] text-left relative  h-[18.67px] flex items-center justify-start text-[15px] font-sans'>
                Total Price
              </div>
              <div className='text-[#262628] text-[17px] font-sans font-bold text-left relative  h-[22.4px] flex items-center justify-start'>
                USD {priceInfo ? priceInfo["lastPrice"] : "..."}
              </div>
            </div>
            <div className='mt-[20px] ' />
            <div className='flex flex-col'>
              <div className='text-[#000000] text-left text-[17px] font-sans font-bold'>
                Email
              </div>
              <div className='mt-[12px] ' />
              <div className=''>
                <div className='bg-[#f5f6fa] px-[12px] rounded-[10px] h-14 flex justify-start items-center font-sans'>
                  {user ? user.email : "loading.."}
                </div>
              </div>
              <div className='mt-[20px]' />
              <div
                className='text-[#000000] text-left relative'
                style={{ font: "700 17px/140% 'Pretendard', sans-serif" }}
              >
                Precautions
              </div>
              <div className=' text-[13px] font-sans font-normal leading-snug text-opacity-50 text-zinc-900 ml-[-23px]'>
                <ol type='1'>
                  <li>
                    Click the{" "}
                    <span className='text-[13px] font-bold leading-snug text-opacity-50 text-zinc-900'>
                      Request
                    </span>{" "}
                    button to go to the payment page.
                  </li>
                  <li>
                    After the payment is completed, it takes about 7 minutes for
                    the dispatch to be confirmed.
                  </li>
                  <li>
                    Once the dispatch is confirmed, cancellation is not
                    possible.
                  </li>
                  <li>
                    After payment, taxi information will be delivered through
                    the &apos;Customer Support Office&apos; chat window.
                    <span className='text-[13px] font-bold leading-snug text-opacity-50 text-zinc-900'>
                      Please check the comments
                    </span>
                  </li>
                  <li>
                    <span className='font-medium text-red-400'>
                      Only international credit cards accepted. To make payments
                      with Korean credit cards, please use the i.M mobile app.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
            <div className='mt-[20px]' />
            <div className='flex flex-col'>
              <div className='flex flex-row justify-start'>
                <input
                  id='cg_instructions'
                  type='checkbox'
                  className='w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  onClick={(e) => {
                    setIsOk((e.target as HTMLInputElement).checked);
                  }}
                />
                <div
                  className='text-[#262628] text-left relative flex items-center justify-start'
                  style={{
                    font: "500 14px/22px 'Pretendard', sans-serif",
                    textDecoration: "underline",
                  }}
                  // onClick={(e) => {
                  //   setOrderAgreement(1);
                  //   setShowAgreement(true);
                  // }}
                >
                  I checked both the email and the precautions.
                </div>
              </div>

              <div className='mt-[33px]' />
              <div className='flex justify-between'>
                <button
                  className='bg-white w-full text-[#0085FE] h-[56px] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px]'
                  onClick={(e) => setShowPayModal(false)}
                >
                  Cancel
                </button>
                {isOk ? (
                  // 결제처리
                  <button
                    className='ml-[8px] w-full h-[56px] bg-[#4187FF] rounded-[10px] shadow-none border-0 ring-1 ring-[#0085FE] text-[16px] text-white'
                    // onClick={(e) => {
                    //   // location.href = "/service/map/path/information";
                    //   const cb = document.getElementById("cg_instructions");
                    //   (cb as HTMLInputElement).checked = false;

                    //   // 사용자 이메일을 넣고 결제 페이지에서 사용자 이메일을 한번더 확인()
                    //   ElseUtils.setLocalStoragWithEncoding(
                    //     "zzppoo",
                    //     SecurityUtils.encryptText(user.email)
                    //   );
                    //   // 결제 페이지로 이동
                    //   // location.href = "/service/payment";
                    //   handleSubmit(onSubmit(e));
                    // }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Request
                  </button>
                ) : (
                  <button className='ml-[6px] w-full h-[56px] bg-[#bbbbbb] rounded-[10px] shadow-none border-0 ring-0 text-[16px] text-white'>
                    Request
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isGetPayMetaInfo ? (
        <>
          <NicePaymentForm
            formRef={formRef}
            paymentViewData={paymentMetaInfo}
            getValues={getValues}
          />
          <GlobalScript />
        </>
      ) : (
        ""
      )}

      {/* 약관읽기 */}
      <InformationModal show={showAgreement} setShow={setShowAgreement}>
        {orderAgreement === 1 ? (
          <div className='label'>
            <div className='element-CI-CS-wrapper'>
              <p className='element-CI-CS'>
                <span className='text-wrapper'>
                  주의사항 및 안내사항
                  <br />
                </span>
                <span className='span'>
                  1. 수집항목
                  <br />
                  &nbsp;&nbsp;개인식별정보(CI), 이름, 휴대전화번호
                  <br />
                  2. 수집 및 이용목적
                  <br /> 서울 뷰티 트래블위크 프로그램 및 뷰티하우스 공간 예약
                  신청 접수, CS 및 분쟁 발생 시 해결을 위한 기록 보존
                  <br />
                  3. 보관기관
                  <br />① 개인정보 수집 및 이용 목적 달성 시 지체없이 파기
                  <br />② 단, 관련 법령에 의하여 일정 기간 보관이 필요한
                  경우에는 해당 기간 동안 보관함
                  <br />
                  4. 동의 거부권 등에 대한 고지
                  <br />
                  &nbsp;&nbsp; 정보주체는 개인정보의 수집 및 이용 동의를 거부할
                  권리가 있으나, 이 경우 서비스 이용이 제한될 수 있습니다.
                </span>
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </InformationModal>
    </>
  );
}
