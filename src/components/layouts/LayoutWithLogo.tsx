import Head from "next/head";
import { useState } from "react";
import Image from "next/image";

import "../../app/globals.css";

interface AdminProps {
  children?: any;
  menuTitle: string;
}
const LayoutWithLogo = ({ menuTitle, children }: AdminProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{menuTitle}</title>
      </Head>
      <>
        <div className=''>
          {loading ? (
            ""
          ) : (
            <>
              <div className='w-[375px] h-[844px] ml-[20px] mr-[20px]'>
                {/* Header */}
                <div className='pt-[53px] flex items-center h-[46px] w-full'>
                  <Image
                    alt=''
                    src={"/img/logo_symbol.svg"}
                    width={96}
                    height={15}
                  />
                  <div className='ml-[9.56px] mr-[-6px]'>
                    <div
                      className='border-solid border-[#bbbbbb] w-[12.55px] h-0 relative top-[-5px]'
                      style={{
                        borderWidth: "1px 0 0 0",
                        transformOrigin: "0 0",
                        transform: "rotate(90deg) scale(1, 1)",
                      }}
                    />
                  </div>

                  <Image
                    alt=''
                    src={"/img/im_logo.png"}
                    width={47}
                    height={46}
                  />
                </div>
                <div className=''>{children}</div>
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default LayoutWithLogo;
