import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiCallResponseData, CallInfo } from "@/libs/call";
import { CODES } from "@/libs/codes";
import { SecurityUtils } from "@/libs/security.utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCallResponseData>
) {
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const authUrl = req.body.authUrl;

    const emailEn = await SecurityUtils.encryptText(email);
    const nameEn = await SecurityUtils.encryptText(name);

    let callResult: any;
    try {
      // 이메일 존재여부 확인
      const checkEmailRes = await axios.post(
        `${CallInfo.urlBase}/c.user/check.email`,
        {
          email: emailEn,
        }
      );
      if (checkEmailRes.data.data === false) {
        callResult = await axios.post(`${CallInfo.urlBase}/c.user`, {
          email: emailEn,
          name: nameEn,
          authUrl: authUrl,
        });
      } else {
        res.status(500).json({
          success: false,
          code: CODES.ALREADY_EXIST_EMAIL,
          data: email,
        });
      }
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, code: CODES.API_CALL_ERROR });
    }
  }
  if (req.method === "GET") {
    const id: string = req.query.id as string;
    let callResult: any;
    try {
      callResult = await axios.get(`${CallInfo.urlBase}/c.user/${id}`);
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, code: CODES.API_CALL_ERROR });
    }
  }
  if (req.method === "PATCH") {
    const userId: string = req.body.userId as string;
    let callResult: any;
    try {
      callResult = await axios.patch(`${CallInfo.urlBase}/c.user`, {
        id: userId,
        isAuth: true,
      });
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, code: CODES.API_CALL_ERROR });
    }
  }
}
