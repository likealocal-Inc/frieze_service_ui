const CryptoJS = require("crypto-js");

const Secure = {
  key: "alskdjflksadjf1234kskjdk",
  encoding: (str: string) => {
    return CryptoJS.AES.encrypt(str, Secure.key).toString();
  },
  decoding: (str: string) => {
    const bytes = CryptoJS.AES.decrypt(str, Secure.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
};
