import { SecurityUtils } from "@/libs/security.utils";
import type { NextApiRequest, NextApiResponse } from "next";

const PaymentReturn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.redirect(`/404`).end();
    return;
  }
  try {
    const payment = {
      txTid: req.body.TxTid,
      authToken: req.body.AuthToken,
      signature: req.body.Signature,
    };

    console.log(payment);
    const paymentStr = SecurityUtils.encryptText(JSON.stringify(payment));

    res.writeHead(302, {
      Location: `/service/payment/done?qpdkdnfnud=${paymentStr}`,
    });
    res.end();
  } catch (error) {
    res.redirect(`/500`).end();
  }
};

export default PaymentReturn;
