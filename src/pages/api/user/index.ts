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
    const phone = req.body.phone;

    const emailEn = SecurityUtils.encryptText(email);
    const nameEn = SecurityUtils.encryptText(name);
    const phoneEn = SecurityUtils.encryptText(phone);

    let callResult: any;
    try {
      // 이메일 존재여부 확인
      const checkEmailRes = await axios.post(
        `${CallInfo.urlBase}/c.user/check.email`,
        {
          email: emailEn,
        }
      );

      if (
        checkEmailRes.data.data === null ||
        checkEmailRes.data.data === undefined
      ) {
        // 사용자가 없을때 =-> 생성해야 함
        const url = process.env.SERVERIPPORT;
        callResult = await axios.post(`${CallInfo.urlBase}/c.user`, {
          email: emailEn,
          name: nameEn,
          phone: phoneEn,
          authUrl: `${url}/user/auth`,
        });

        res.status(200).json({ success: true, data: callResult.data.data });
      } else {
        if (checkEmailRes.data.data.isAuth === true) {
          res.status(500).json({
            success: false,
            info: CODES.ALREADY_EXIST_EMAIL,
            data: email,
          });
        } else {
          res.status(500).json({
            success: false,
            info: CODES.NO_AUTH,
            data: checkEmailRes.data.data.email,
          });
        }
      }
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
  if (req.method === "GET") {
    const id: string = req.query.id as string;
    const email: string = req.query.email as string;
    let callResult: any;
    try {
      if (id !== null && id !== undefined) {
        callResult = await axios.get(`${CallInfo.urlBase}/c.user/${id}`);
      } else if (email !== null && email !== undefined) {
        callResult = await axios.get(
          `${CallInfo.urlBase}/c.user/email/${email}`
        );
      }
      res.status(200).json({ success: true, data: callResult.data.data });
    } catch (err: any) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
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
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
}
