import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";
import React, { useEffect } from "react";
import NotOpen from "./service/notopen";

export default function Home() {
  useEffect(() => {
    const _userId = ElseUtils.getLocalStorageWithoutDecoding(
      ElseUtils.localStorageUserIdKey
    );
    if (_userId === null) {
      ElseUtils.moveAgreementPage();
      return;
    }
    const userId = SecurityUtils.decryptText(_userId);

    axios
      .get(`/api/user?id=${userId}`)
      .then((d) => {
        if (d.data.success) {
          const user = d.data.data;
          ElseUtils.setLocalstorageUser(user);
          ElseUtils.moveMapPage();
        } else {
          ElseUtils.moveAgreementPage();
        }
      })
      .catch((e) => {
        ElseUtils.moveAgreementPage();
      });
  }, []);

  return <main className=''></main>;
}
