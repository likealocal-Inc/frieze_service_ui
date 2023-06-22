// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
// language: https://developers.google.com/maps/faq?hl=ko#languagesupport

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { word } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${word}&language=en&components=country:kr&key=AIzaSyACq7gF8WbQr5oYUIZSNg4AW9hzI0phA6w`;

  try {
    const search = await axios.get(url);
    res.status(200).send(search.data);
  } catch (err) {
    console.log(err);
  }
  //   const response = await fetch(url, {
  //     headers: {
  //       "X-NCP-APIGW-API-KEY-ID": "01gns67yau",
  //       "X-NCP-APIGW-API-KEY": "mZ8mst5crgIEw8vzU5H4SBLNbpmXJnpxPlC9IHYb",
  //     },
  //   });
}
