import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiCallResponseData, CallInfo } from "@/libs/call";
import { CODES } from "@/libs/codes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiCallResponseData>
) {
  if (req.method === "POST") {
    try {
      axios.get(`${CallInfo.urlBase}/info`).then((d) => {
        res.status(200).json({ success: true, data: d.data });
      });
    } catch (err: any) {
      res.status(500).json({ success: false, info: CODES.API_CALL_ERROR });
    }
  }
}
