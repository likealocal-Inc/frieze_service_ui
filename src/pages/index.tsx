import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    location.href = "/service/agreement";
  }, []);

  return <main className=''>cc</main>;
}
