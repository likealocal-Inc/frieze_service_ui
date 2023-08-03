import type { NextRouter } from "next/router";
import Script from "next/script";
import React from "react";

interface IProps {
  router: NextRouter;
}
const GlobalScript = () => {
  return (
    <>
      <Script
        src='https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js'
        type='text/javascript'
      />
    </>
  );
};

export default GlobalScript;
