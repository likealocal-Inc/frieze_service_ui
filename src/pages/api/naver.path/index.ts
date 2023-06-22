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
  console.log(startLng, startLat, goalLng, goalLat);
  const url = `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${startLng},${startLat}&goal=${goalLng},${goalLat}`;
  const response = await fetch(url, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": "01gns67yau",
      "X-NCP-APIGW-API-KEY": "mZ8mst5crgIEw8vzU5H4SBLNbpmXJnpxPlC9IHYb",
    },
  });

  const data = await response.json();
  res.status(200).send(data);
}
