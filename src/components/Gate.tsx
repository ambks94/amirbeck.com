"use client";

import { useEffect, useState } from "react";

export default function Gate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const unlocked =
      sessionStorage.getItem("gate") === "1" || prompt("Password") === "amirbeck";

    if (!unlocked) return;

    sessionStorage.setItem("gate", "1");

    if (window.location.pathname === "/gate") {
      window.location.replace("/");
      return;
    }

    setOk(true);
  }, []);

  return ok ? children : null;
}
