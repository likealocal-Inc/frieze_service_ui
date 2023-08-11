// import LayoutAuth from "@/components/layouts/LayoutAuth";
// import "../../../app/globals.css";
// import { ElseUtils } from "@/libs/else.utils";
// import { SecurityUtils } from "@/libs/security.utils";
// import { useEffect, useRef, useState } from "react";
// import GlobalScript from "@/libs/GlobalScript";
// import NicePaymentForm from "@/components/NicePayment/NicePaymentForm";
// import { SubmitHandler, useForm } from "react-hook-form";
// import axios from "axios";
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

export interface IBookingFormData {
  country: string;
  couponCode: string;
  designation: string;
  email: string;
  firstName: string;
  lastName: string;
  passengerCountry: string;
  passengerDesignation: string;
  passengerEmail: string;
  passengerFirstName: string;
  passengerLastName: string;
  passengerMemo: string;
  passengerPhone: string;
  passengerPhoneCode: string;
  passengerSnsId: string;
  passengerSnsType: string;
  phone: string;
  phoneCode: string;
  snsId: string;
  snsType: string;
}

export interface PaymentMetaInfo {
  id: string;
  orderId: string;
  created: Date;
  updated: Date;
  email: string;
  amt: number;
  merchantID: string;
  ediDate: string;
  signData: string;
  moid: string;
  paymentToken: string;
}

export default function PaymentPage() {
  return <></>;
  //   const [user, setUser] = useState<any>();
  //   const [ok, setOk] = useState(false);
  //   const [paymentMetaInfo, setPaymentMetaInfo] = useState<PaymentMetaInfo>();

  //   const formRef = useRef<HTMLFormElement>(null);
  //   const mobileReturnUrlRef = useRef<HTMLInputElement>(null);
  //   const {
  //     register,
  //     control,
  //     handleSubmit,
  //     getValues,
  //     setValue,
  //     reset,
  //     trigger,
  //     watch,
  //     formState: { errors, isValid },
  //   } = useForm<IBookingFormData>({ mode: "onChange" });

  //   useEffect(() => {
  //     const userInfo = ElseUtils.getLocalstorageUser();
  //     if (userInfo == null) {
  //       ElseUtils.moveMapPage();
  //       return;
  //     }
  //     setUser(userInfo);

  //     // 결제때 사용한 이메일 가져옴
  //     const data = ElseUtils.getLocalStorageWithoutDecoding("zzppoo");
  //     if (data !== null && data !== undefined) {
  //       const dataStr = SecurityUtils.decryptText(data);
  //       if (
  //         dataStr !== null &&
  //         dataStr !== undefined &&
  //         SecurityUtils.decryptText(dataStr) === userInfo.email
  //       ) {
  //         const priceInfoStr = ElseUtils.getLocalStorageWithoutDecoding(
  //           ElseUtils.localStoragePrideInfo
  //         );
  //         if (priceInfoStr === null || priceInfoStr === undefined) {
  //           ElseUtils.moveMapPage();
  //           return;
  //         }
  //         const priceInfo = SecurityUtils.decryptText(priceInfoStr);

  //         axios
  //           .post(`${publicRuntimeConfig.APISERVER}/order/payment/init`, {
  //             email: userInfo.email,
  //             price: JSON.parse(priceInfo).lastUSPrice,
  //           })
  //           .then((d) => {
  //             if (mobileReturnUrlRef.current) {
  //               mobileReturnUrlRef.current.value = `${window.location.origin}/service/payment/done`;
  //             }

  //             setPaymentMetaInfo(d.data);
  //             ElseUtils.setLocalStoragWithEncoding(
  //               ElseUtils.localStoragePaymentMetaInfo,
  //               JSON.stringify(d.data)
  //             );

  //             handleSubmit(onSubmit);
  //           });

  //         setOk(true);
  //         return;
  //       }
  //     }
  //     alert("비정상적인접근");
  //     setOk(false);
  //   }, []);

  //   const onSubmit: SubmitHandler<IBookingFormData> = (data) => {
  //     if (formRef.current !== null) {
  //       formRef.current.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
  //       formRef.current.acceptCharset = "euc-kr";
  //       formRef.current.submit();
  //       return;
  //     }
  //   };

  //   return (
  //     <>
  //       <NicePaymentForm
  //         formRef={formRef}
  //         mobileReturnUrlRef={mobileReturnUrlRef}
  //         actionURL={""}
  //         paymentViewData={paymentMetaInfo}
  //         getValues={getValues}
  //       />
  //       {/* <button onClick={handleSubmit(onSubmit)}>click</button> */}
  //       <GlobalScript />
  //     </>
  //   );
}
