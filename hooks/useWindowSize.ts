import { useCallback, useEffect, useState } from "react";
export default function useWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(
    () =>
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return size;
}
