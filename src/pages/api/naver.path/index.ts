// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { startLng, startLat, goalLng, goalLat } = req.query;
  const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${startLng},${startLat}&goal=${goalLng},${goalLat}`;
  const response = await fetch(url, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": "01gns67yau",
      "X-NCP-APIGW-API-KEY": "mZ8mst5crgIEw8vzU5H4SBLNbpmXJnpxPlC9IHYb",
    },
  });

  const data = await response.json();

  const info = data.route.traoptimal[0];

  const summary = info.summary;
  const distance = summary.distance;
  const duration = summary.duration;
  const fuelPrice = summary.fuelPrice;
  const taxiPrice = summary.taxiFare;
  const tollFare = summary.tollFare;

  const saveData = {
    distance: distance,
    duration: duration,
    fuelPrice: fuelPrice,
    taxiPrice: taxiPrice,
    tollFare: tollFare,
  };
  // 서버에 금액정보 저장해야 함
  res.status(200).send(data);
}
