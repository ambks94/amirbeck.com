"use client";

import { useEffect, useState } from "react";

export default function Gate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("gate") === "1") {
      setOk(true);
      return;
    }
    if (prompt("Password") === "amirbeck") {
      sessionStorage.setItem("gate", "1");
      setOk(true);
    }
  }, []);

  return ok ? children : null;
}
