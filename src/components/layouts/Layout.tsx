import Head from "next/head";
import { useState } from "react";
import "../../app/globals.css";

interface AdminProps {
  children?: any;
  menuTitle: string;
}
const Layout = ({ menuTitle, children }: AdminProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{menuTitle}</title>
      </Head>
      <>
        <div className=''>
          {loading ? (
            ""
          ) : (
            <>
              <div className=''>{children}</div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default Layout;
