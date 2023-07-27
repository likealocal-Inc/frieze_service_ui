import LayoutAuth from "@/components/layouts/LayoutAuth";
import "../../../app/globals.css";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [user, setUser] = useState<any>();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const userInfo = ElseUtils.getLocalstorageUser();
    if (userInfo == null) {
      ElseUtils.moveMapPage();
      return;
    }
    setUser(userInfo);

    const data = ElseUtils.getLocalStorage("zzppoo");
    if (data !== null && data !== undefined) {
      const dataStr = SecurityUtils.decryptText(data);
      if (
        dataStr !== null &&
        dataStr !== undefined &&
        SecurityUtils.decryptText(dataStr) === userInfo.email
      ) {
        setOk(true);
        return;
      }
    }
    alert("비정상적인접근");
    setOk(false);
  }, []);

  return (
    <LayoutAuth menuTitle=''>
      {ok ? (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-600 Z-50'>
          <div className='flex items-center justify-center bg-white w-[327px] h-[492px] rounded-[10px]'>
            나이스페이먼츠
            <div className='flex flex-col'>
              <button
                className='w-20 h-20'
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

                  const userStr = ElseUtils.getLocalStorage(
                    ElseUtils.localStorageUserIdKey
                  );

                  // 문제가 있는 경우
                  if (
                    priceInfoStr === undefined ||
                    priceInfoStr === null ||
                    startInfoStr === undefined ||
                    startInfoStr === null ||
                    goalInfoStr === undefined ||
                    goalInfoStr === null ||
                    userStr === undefined ||
                    userStr === null
                  ) {
                    location.href = "/service/map";
                    return;
                  }

                  axios
                    .post("/api/order", {
                      t1: userStr,
                      t2: startInfoStr,
                      t3: goalInfoStr,
                      t4: priceInfoStr,
                    })
                    .then((d) => {
                      if (d.data.success) {
                        // 결제완료 후 정보 저장
                        const data = JSON.stringify(d.data.data);
                        ElseUtils.setLocalStorage(
                          ElseUtils.localStorageOrderDetail,
                          data
                        );
                      }
                      location.href = "/service/payment/done";
                    })
                    .catch((e) => {
                      location.href = "/service/payment/cancel";
                    });
                }}
              >
                완료
              </button>
              <div className='mt-[10px]'></div>
              <button
                className='w-20 h-20'
                onClick={(e) => {
                  location.href = "/service/payment/cancel";
                }}
              >
                실패
              </button>
            </div>
          </div>
        </div>
      ) : (
        "비정상적인접근"
      )}
    </LayoutAuth>
  );
}
