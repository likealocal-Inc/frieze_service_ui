import Head from "next/head";
import { useState } from "react";
import Image from "next/image";

import "../../app/globals.css";

interface AdminProps {
  children?: any;
  menuTitle: string;
  isUasgeDetail?: boolean;
  isLogo?: boolean;
}
const LayoutWithLogo = ({
  menuTitle,
  children,
  isUasgeDetail = false,
  isLogo = true,
}: AdminProps) => {
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
              <div className='w-[375px]'>
                {/* Header */}
                {isLogo ? (
                  <div className='pt-[44px] flex items-center h-[46px] justify-between'>
                    <div className='flex items-center'>
                      <Image
                        alt=''
                        src={"/img/logo_symbol.svg"}
                        width={124}
                        height={20}
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
                    {isUasgeDetail ? (
                      <div className=''>
                        <div
                          className='bg-[#0085fe] rounded-[10px] pt-2 pr-5 pb-2 pl-5 flex flex-row gap-2.5 items-start justify-start relative overflow-hidden'
                          style={{
                            boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.16)",
                          }}
                        >
                          <div
                            className='text-[#ffffff] text-center relative font-sans text-[14px]'
                            onClick={(e) => {
                              location.href = "/service/history/list";
                            }}
                          >
                            My Page
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

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
