import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";

import "../../app/globals.css";
import { ElseUtils } from "@/libs/else.utils";
import { SecurityUtils } from "@/libs/security.utils";
import axios from "axios";
import { useRouter } from "next/router";
import LayoutWithLogo from "./LayoutWithLogo";

interface AdminProps {
  children?: any;
  menuTitle: string;
  isUasgeDetail?: boolean;
}
const LayoutAuth = ({
  menuTitle,
  children,
  isUasgeDetail = false,
}: AdminProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const _userId = ElseUtils.getLocalStorage(ElseUtils.localStorageUserIdKey);
    if (_userId === null) {
      ElseUtils.moveAgreementPage();
      return;
    }
    const userId = SecurityUtils.decryptText(_userId);
    axios.get(`/api/user?id=${userId}`).then((d) => {
      if (d.data.success && d.data.data !== null) {
        const user = d.data.data;
        ElseUtils.setLocalstorageUser(user);
        setLoading(false);
        return;
      } else {
        ElseUtils.moveAgreementPage();
        return;
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <LayoutWithLogo menuTitle={menuTitle} isUasgeDetail={isUasgeDetail}>
          {children}
        </LayoutWithLogo>
      )}
    </>
  );
};
export default LayoutAuth;
