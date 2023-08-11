import { SecurityUtils } from "./security.utils";

export const ElseUtils = {
  localStorageUserIdKey: "dkfjf@#dkfj!2",
  localStorageUserKey: "sdkiemfnks!2#4#@@dd",
  localStoragePrideInfo: "dkfjeimfn3kdn39k#",
  localStorageStartInfo: "skdjfiefstsed9n3",
  localStorageGoalInfo: "zkdukrk3oiodjjjj@",
  localStorageOrderDetail: "dkfdskdue@34Dd!Sd",
  localStoragePaymentMetaInfo: "kefidjne@#dkghdWED",
  localStoragePaymentResult: "pwodnc934$dkfm+d",
  isValidEmail: (email: string) => {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  },
  isAllUpperCase: (str: string) => {
    const regex = /^[A-Z\s]+$/;
    return regex.test(str);
  },
  truncateString: (str: string, num: number) => {
    if (str === undefined || str === null) return;
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  },
  setLocalstorageUser: (user: any) => {
    ElseUtils.setLocalStoragWithEncoding(
      ElseUtils.localStorageUserKey,
      JSON.stringify(user)
    );
    // localStorage.setItem(
    //   ElseUtils.localStorageUserKey,
    //   SecurityUtils.encryptText(JSON.stringify(user))
    // );
  },
  getLocalstorageUser: () => {
    const user = ElseUtils.getLocalStorageWithoutDecoding(
      ElseUtils.localStorageUserKey
    );
    if (user) {
      return JSON.parse(SecurityUtils.decryptText(user));
    }
    return null;
  },
  setLocalStoragWithEncoding: (key: string, val: string) => {
    localStorage.setItem(key, SecurityUtils.encryptText(val));
  },
  getLocalStorageWithoutDecoding: (key: string) => {
    return localStorage.getItem(key);
  },

  stringCut: (str: string, size: number, add = "") => {
    if (str.length < size) {
      add = "";
    }
    return `${str.substring(0, size)}${add}`;
  },

  changeDateFromDBIsoDate: (isoDate: string) => {
    let date = new Date(isoDate);

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based. Add leading 0.
    let day = ("0" + date.getDate()).slice(-2); // Add leading 0.

    let hours = ("0" + date.getHours()).slice(-2); // Add leading 0.
    let minutes = ("0" + date.getMinutes()).slice(-2); // Add leading 0.

    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  },

  moveAgreementPage: () => {
    location.href = "/service/agreement";
  },
  moveMapPage: () => {
    location.href = "/service/map";
  },

  getUserInfoFromLocalstorage: () => {
    const userInfo = ElseUtils.getLocalstorageUser();
    if (userInfo == null) {
      ElseUtils.moveMapPage();
      return;
    }
    return userInfo;
  },
  movePath: (startAccess: any, goalAccess: any, goalLocation: any) => {
    setTimeout(() => {
      ElseUtils.setLocalStoragWithEncoding(
        ElseUtils.localStorageStartInfo,
        JSON.stringify(startAccess)
      );

      ElseUtils.setLocalStoragWithEncoding(
        ElseUtils.localStorageGoalInfo,
        JSON.stringify({
          ...goalAccess,
          location: goalLocation,
        })
      );

      // 경로 보여주는 페이지로 이동
      location.href = `/service/map/path`;
    }, 200);
  },

  getPaymentMetaInfo: () => {
    // 결제 메타정보 꺼내기
    const paymentInit = ElseUtils.getLocalStorageWithoutDecoding(
      ElseUtils.localStoragePaymentMetaInfo
    );

    console.log("paymentInit", paymentInit);

    if (paymentInit === null) {
      alert("비정상적인 접근");
      ElseUtils.moveMapPage();
      return;
    }
    const paymentInitJson = JSON.parse(SecurityUtils.decryptText(paymentInit));

    return paymentInitJson;
  },

  /**
   *
   */
  removeLocalStorageForStart: () => {
    localStorage.removeItem(ElseUtils.localStorageGoalInfo);
    localStorage.removeItem(ElseUtils.localStorageStartInfo);
    localStorage.removeItem(ElseUtils.localStorageOrderDetail);
    localStorage.removeItem(ElseUtils.localStoragePaymentMetaInfo);
    localStorage.removeItem(ElseUtils.localStoragePaymentResult);
    localStorage.removeItem(ElseUtils.localStoragePrideInfo);
  },
};
