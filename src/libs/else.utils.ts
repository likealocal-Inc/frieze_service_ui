import { SecurityUtils } from "./security.utils";

export const ElseUtils = {
  localStorageUserIdKey: "dkfjf@#dkfj!2",
  localStorageUserKey: "sdkiemfnks!2#4#@@dd",
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
    localStorage.setItem(
      ElseUtils.localStorageUserKey,
      SecurityUtils.encryptText(JSON.stringify(user))
    );
  },
  getLocalstorageUser: () => {
    const user = localStorage.getItem(ElseUtils.localStorageUserKey);
    if (user) {
      return SecurityUtils.decryptText(user);
    }
    return null;
  },
};
