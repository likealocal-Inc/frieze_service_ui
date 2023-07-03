import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// 위경도 값으로 위치 정읽기
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { lat, lng } = req.query;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w
  `;

  try {
    const search = await axios.get(url);
    res.status(200).send(search.data);
  } catch (err) {
    console.log(err);
  }
}
