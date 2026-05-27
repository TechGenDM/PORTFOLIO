"use client";

import { useState } from "react";
import Loader from "./Loader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}
      {children}
    </>
  );
}
