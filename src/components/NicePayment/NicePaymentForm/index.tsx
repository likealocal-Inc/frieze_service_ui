/* eslint-disable no-param-reassign */
import { PaymentMetaInfo } from "@/pages/service/payment";
import getConfig from "next/config";
import { FC, RefObject, useCallback, useEffect } from "react";
import { UseFormGetValues } from "react-hook-form";
const { publicRuntimeConfig } = getConfig();

export interface IBookingOrderData {
  startPoint: string;
  endPoint: string;
  adultCount: number;
  childCount: number;
  boardingDate: Date;
}

export type ReservationType = "PICKUP" | "SENDING";

export interface IPaymentViewPaymentInfo {
  amt: number;
  merchantID: string;
  ediDate: string;
  signData: string;
  moid: string;
  paymentToken: string;
}

export interface IPaymentInfoData {
  amt: number;
  merchantID: string;
  ediDate: string;
  signData: string;
  moid: string;
  paymentToken: string;
}

export interface IPaymentViewAirport {
  orderUuid: string;
  order: IBookingOrderData;
  reservationType: ReservationType;
  paymetInfo?: IPaymentViewPaymentInfo;
}

// PAYMENT TYPE
export interface IBookingCouponResponseData {
  code: string;
  discount: number;
  discountType: string;
  paymentInfo: IPaymentInfoData;
  uuidIdx: string;
  payment: number;
}

interface IProps {
  paymentViewData?: PaymentMetaInfo;
  formRef: RefObject<HTMLFormElement>;
  schType?: "pickup" | "sending";
  getValues: UseFormGetValues<IBookingFormData>;
}

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

const NicePaymentForm: FC<IProps> = ({
  formRef,
  paymentViewData,
  getValues,
}) => {
  console.log("-------------");
  console.log(paymentViewData);
  return (
    <form name='payForm' method='post' ref={formRef} acceptCharset='euc-kr'>
      <input type='hidden' name='GoodsName' value={`샌딩`} />
      <input type='hidden' name='Amt' value={paymentViewData?.amt || ""} />
      <input
        type='hidden'
        name='MID'
        value={paymentViewData?.merchantID || ""}
      />
      <input
        type='hidden'
        name='EdiDate'
        value={paymentViewData?.ediDate || ""}
      />
      <input type='hidden' name='GoodsName' value={"pickup"} />
      <input type='hidden' name='Moid' value={paymentViewData?.moid || ""} />
      <input type='hidden' name='PayMethod' value='CARD' />
      <input type='hidden' name='MerchantKey' value='' />
      <input type='hidden' name='CurrencyCode' value='USD' />
      <input
        type='hidden'
        name='SignData'
        value={paymentViewData?.signData || ""}
      />
      <input
        type='hidden'
        name='BuyerName'
        value={`${getValues("firstName")} ${getValues("lastName")}` || ""}
      />
      <input
        type='hidden'
        name='BuyerTel'
        value={`${getValues("phoneCode")} ${getValues("phone")}` || ""}
      />
      <input type='hidden' name='BuyerEmail' value={getValues("email") || ""} />
      {/* MOBILE ONLY */}
      <input
        type='hidden'
        name='ReturnURL'
        value={`${publicRuntimeConfig.SERVERIPPORT}/api/payment.return`}
      />
      <input type='hidden' name='FailURL' value='' />
      <input type='hidden' name='GoodsCl' value='' />
    </form>
  );
};

export default NicePaymentForm;
