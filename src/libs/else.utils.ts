import { SecurityUtils } from "./security.utils";

export const ElseUtils = {
  localStorageUserIdKey: "dkfjf@#dkfj!2",
  localStorageUserKey: "sdkiemfnks!2#4#@@dd",
  localStoragePrideInfo: "dkfjeimfn3kdn39k#",
  localStorageStartInfo: "skdjfiefstsed9n3",
  localStorageGoalInfo: "zkdukrk3oiodjjjj@",
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
      SecurityUtils.encryptText(JSON.stringify(user))
    );
    // localStorage.setItem(
    //   ElseUtils.localStorageUserKey,
    //   SecurityUtils.encryptText(JSON.stringify(user))
    // );
  },
  getLocalstorageUser: () => {
    const user = ElseUtils.getLocalStorage(ElseUtils.localStorageUserKey);
    if (user) {
      return SecurityUtils.decryptText(user);
    }
    return null;
  },
  setLocalStorage: (key: string, val: string) => {
    localStorage.setItem(key, SecurityUtils.encryptText(val));
  },
  getLocalStorage: (key: string) => {
    return localStorage.getItem(key);
  },
};
