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
    const id = req.body.elrigjd;
    const email = req.body.qodkfj;

    console.log(id, email);
    console.log(SecurityUtils.decryptText(email));
    console.log(SecurityUtils.decryptText(id));
    let callResult: any;
    try {
      // 이메일 존재여부 확인
      const url = process.env.SERVERIPPORT;
      axios
        .post(`${CallInfo.urlBase}/email/authEmail`, {
          email: SecurityUtils.decryptText(email),
          userId: SecurityUtils.decryptText(id),
          authUrl: `${url}/user/auth`,
        })
        .then((d) => {
          console.log(d);
          res.status(200).send({ success: true });
        });
    } catch (err: any) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
}
