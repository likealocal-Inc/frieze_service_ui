import LayoutAuth from "@/components/layouts/LayoutAuth";
import "../../../app/globals.css";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";

export default function PaymentPage() {
  return (
    <LayoutAuth menuTitle=''>
      <div className='fixed top-0 left-0 w-full h-full bg-slate-600 Z-50'>
        <div className='flex items-center justify-center bg-white w-[327px] h-[492px] fixed top-[76px] left-[30px] rounded-[10px]'>
          나이스페이먼츠
          <button
            onClick={(e) => {
              const priceInfoStr = ElseUtils.getLocalStorage(
                ElseUtils.localStoragePrideInfo
              );
              const startInfoStr = ElseUtils.getLocalStorage(
                ElseUtils.localStorageStartInfo
              );
              const goalInfoStr = ElseUtils.getLocalStorage(
                ElseUtils.localStorageGoalInfo
              );

              // 문제가 있는 경우
              if (
                priceInfoStr === undefined ||
                priceInfoStr === null ||
                startInfoStr === undefined ||
                startInfoStr === null ||
                goalInfoStr === undefined ||
                goalInfoStr === null
              ) {
                location.href = "/service/map";
                return;
              }
              const priceInfo = SecurityUtils.decryptText(
                JSON.parse(priceInfoStr)
              );
              const startInfo = SecurityUtils.decryptText(
                JSON.parse(startInfoStr)
              );
              const goalInfo = SecurityUtils.decryptText(
                JSON.parse(goalInfoStr)
              );

              console.log(priceInfo, startInfo, goalInfo);
              //location.href = "/service/payment/done";
            }}
          >
            완료
          </button>
          <button
            onClick={(e) => {
              location.href = "/service/payment/cancel";
            }}
          >
            실패
          </button>
        </div>
      </div>
    </LayoutAuth>
  );
}
