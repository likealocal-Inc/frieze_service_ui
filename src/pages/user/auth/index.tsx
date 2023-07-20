import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserAuth() {
  const router = useRouter();
  useEffect(() => {
    const userId = router.asPath.replace(router.route + "?", "");
    localStorage.setItem(
      ElseUtils.localStorageUserIdKey,
      SecurityUtils.encryptText(userId)
    );
    axios.patch("/api/user", { userId }).then((d) => {
      location.href = "/service/map";
    });
  }, []);

  return <></>;
}
