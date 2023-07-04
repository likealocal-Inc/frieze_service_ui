// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const saveData: any = {
    distance: 20457,
    duration: 3750872,
    fuelPrice: 2292,
    taxiPrice: 23100,
    tollFare: 0,
    lastPrice: 59,
  };
  // 서버에 금액정보 저장해야 함
  res.status(200).json(saveData);
}
