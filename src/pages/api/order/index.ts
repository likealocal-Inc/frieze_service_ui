import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiCallResponseData, CallInfo } from "@/libs/call";
import { CODES } from "@/libs/codes";
import { SecurityUtils } from "@/libs/security.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCallResponseData>
) {
  // 주문 저장
  if (req.method === "POST") {
    const userStr = req.body.t1;
    const startInfoStr = req.body.t2;
    const goalInfoStr = req.body.t3;
    const priceInfoStr = req.body.t4;
    const aeindifo = req.body.aeindifo;

    // 결제 데이터가 없으면 실패처리
    if (aeindifo === null || aeindifo === undefined) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
      return;
    }

    const priceInfo = SecurityUtils.decryptText(priceInfoStr);
    const startInfo = JSON.parse(SecurityUtils.decryptText(startInfoStr));
    const goalInfo = JSON.parse(SecurityUtils.decryptText(goalInfoStr));
    const userId = SecurityUtils.decryptText(userStr);

    let callResult: any;
    try {
      callResult = await axios.post(`${CallInfo.urlBase}/order`, {
        userId,
        startLng: "" + startInfo.location.lng,
        startLat: "" + startInfo.location.lat,
        startAddress: startInfo.desc,
        goalLng: "" + goalInfo.location.lng,
        goalLat: "" + goalInfo.location.lat,
        goalAddress: goalInfo.desc,
        status: "PAYMENT",
        priceInfo: priceInfo,
        aeindifo: aeindifo,
      });
      console.log(callResult.data);
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      console.log(err.response.data.data.description.codeMessage);
      res.status(500).json({
        success: false,
        data: err.response.data.data.description.codeMessage,
      });
    }
  }

  // 주문조회( id: 단건조회, userId: 사용자 주문목록)
  if (req.method === "GET") {
    const id: string = req.query.id as string;
    const userId: string = req.query.userId as string;
    const status: string = req.query.status as string;

    let callResult: any;
    try {
      // 아이디로 단건조회
      if (id !== undefined) {
        callResult = await axios.get(`${CallInfo.urlBase}/order/${id}/$}`);
      }
      // 사용자 아이디로 히스토리 조회
      else if (userId !== undefined) {
        if (status === "1") {
          callResult = await axios.get(
            `${CallInfo.urlBase}/order/userid/${userId}`
          );
        } else {
          const url = `${CallInfo.urlBase}/order/userid/${userId}/${
            status === "2"
              ? "PAYMENT"
              : status === "3"
              ? "DONE"
              : status === "4"
              ? "CANCEL"
              : ""
          }`;
          callResult = await axios.get(url);
        }
      }
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
  // 업데이트(상태값...)
  if (req.method === "PATCH") {
    const id = req.body.id;
    const totalPrice = req.body.totalPrice;
    const status = req.body.status;
    const approvalDate = req.body.approvalDate;

    let callResult: any;
    try {
      callResult = await axios.patch(`${CallInfo.urlBase}/order/${id}`, {
        totalPrice,
        status,
        approvalDate,
      });

      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
}
