"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
