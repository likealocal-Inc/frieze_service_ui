import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const _userId = ElseUtils.getLocalStorage(ElseUtils.localStorageUserIdKey)!;
    if (_userId === null) {
      location.href = "/service/agreement";
      return;
    }
    const userId = SecurityUtils.decryptText(_userId);
    axios.get(`/api/user?id=${userId}`).then((d) => {
      if (d.data.success && d.data.data !== null) {
        const user = d.data.data;
        ElseUtils.setLocalstorageUser(user);
      } else {
        location.href = "/service/agreement";
      }
    });
  }, []);

  return <main className=''></main>;
}
