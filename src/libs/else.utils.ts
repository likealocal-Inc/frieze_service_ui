import { SecurityUtils } from "./security.utils";

export const ElseUtils = {
  localStorageUserIdKey: "dkfjf@#dkfj!2",
  localStorageUserKey: "sdkiemfnks!2#4#@@dd",
  localStoragePrideInfo: "dkfjeimfn3kdn39k#",
  localStorageStartInfo: "skdjfiefstsed9n3",
  localStorageGoalInfo: "zkdukrk3oiodjjjj@",
  localStorageOrderDetail: "dkfdskdue@34Dd!Sd",
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
    ElseUtils.setLocalStorage(
      ElseUtils.localStorageUserKey,
      JSON.stringify(user)
    );
    // localStorage.setItem(
    //   ElseUtils.localStorageUserKey,
    //   SecurityUtils.encryptText(JSON.stringify(user))
    // );
  },
  getLocalstorageUser: () => {
    const user = ElseUtils.getLocalStorage(ElseUtils.localStorageUserKey);
    if (user) {
      return JSON.parse(SecurityUtils.decryptText(user));
    }
    return null;
  },
  setLocalStorage: (key: string, val: string) => {
    localStorage.setItem(key, SecurityUtils.encryptText(val));
  },
  getLocalStorage: (key: string) => {
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
};
