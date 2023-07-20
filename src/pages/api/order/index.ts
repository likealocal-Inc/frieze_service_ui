import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiCallResponseData, CallInfo } from "@/libs/call";
import { CODES } from "@/libs/codes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCallResponseData>
) {
  if (req.method === "POST") {
    const userId = req.body.userId;
    const startLng = req.body.startLng;
    const startLat = req.body.startLat;
    const start = req.body.start;
    const goalLng = req.body.goalLng;
    const goalLat = req.body.goalLat;
    const goal = req.body.goal;
    const status = req.body.status;

    let callResult: any;
    try {
      callResult = await axios.post(`${CallInfo.urlBase}/order`, {
        userId,
        startLng,
        startLat,
        start,
        goalLng,
        goalLat,
        goal,
        status,
      });

      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ success: false, code: CODES.API_CALL_ERROR });
    }
  }
  if (req.method === "GET") {
    const id: string = req.query.id as string;
    const userId: string = req.query.userId as string;

    let callResult: any;
    try {
      // 아이디로 단건조회
      if (id !== undefined) {
        callResult = await axios.get(`${CallInfo.urlBase}/order/${id}`);
      }
      // 사용자 아이디로 히스토리 조회
      else if (userId !== undefined) {
        callResult = await axios.get(
          `${CallInfo.urlBase}/order/userid/${userId}`
        );
      }
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, code: CODES.API_CALL_ERROR });
    }
  }
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
      res.status(500).json({ success: false, code: CODES.API_CALL_ERROR });
    }
  }
}
