import { useEffect, useState } from "react";
import Layout from "@/components/layouts/LayoutWithLogo";

export default function Map() {
  const [myLocation, setMyLocation] = useState({
    lat: 37.5117,
    lng: 127.0592,
  });

  useEffect(() => {
    // setMyLocation({ lat: 33337.5117, lng: 12733.0592 });
  }, []);

  return (
    <>
      <Layout menuTitle='지도'>
        <button
          className=''
          onClick={(e) =>
            (location.href = "https://n14k9.channel.io/support-bots/76910")
          }
        >
          test
        </button>
      </Layout>
    </>
  );
}
