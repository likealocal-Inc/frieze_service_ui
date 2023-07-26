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
    const userId: any = req.query.jsdkfjekm;
    try {
      const url = process.env.SERVERIPPORT;
      const authUrl = SecurityUtils.encryptText(`${url}/user/auth`);
      axios
        .patch(`${CallInfo.urlBase}/c.user/send.auth.email`, {
          skdidd: userId,
          kfkkdm: authUrl,
        })
        .then((d) => res.status(200).send({ success: true }));
    } catch (error) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
}
