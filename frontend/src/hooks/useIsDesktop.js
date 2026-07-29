import { useState, useEffect } from "react";
import { BREAKPOINT } from "../theme";

const getIsDesktop = () => window.innerWidth >= BREAKPOINT;

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);

  useEffect(() => {
    const handleResize = () => setIsDesktop(getIsDesktop());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}
