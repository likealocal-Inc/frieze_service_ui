import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NotOpen() {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState(true);

  // useEffect(() => {
  //   if (router.isReady === false) return;

  //   const ddd = ElseUtils.getLocalStorageWithoutDecoding("adkfien3jnfdli");
  //   if (ddd !== undefined && ddd !== null) {
  //     if (SecurityUtils.decryptText(ddd) === "goodman") {
  //       setIsCheck(true);
  //       return;
  //     }
  //   }

  //   if (router.asPath.endsWith("likea!@@dff") === false) return;

  //   ElseUtils.setLocalStoragWithEncoding("adkfien3jnfdli", "goodman");
  //   setIsCheck(true);
  // }, [router]);

  return (
    <>
      {isCheck ? (
        ""
      ) : (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 bg-slate-600 Z-50'>
          <div className='flex items-center justify-center bg-white w-[328px] h-[192px]  rounded-[10px]'>
            <div className='flex flex-col items-center w-full h-full'>
              <div className='mt-[24px]' />
              <div className='mt-[16px]' />
              <div className='text-[24px] font-sans font-bold'>
                I&apos;m sorry
              </div>
              <div className='mt-[24px]' />
              <div className='font-sans text-[#bbbbbb] text-[17px] flex justify-center items-center text-center w-[240px]'>
                The following service for frieze members will be launching on
                August 30th, 2023.
              </div>
              <div className='mt-[24px]' />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
