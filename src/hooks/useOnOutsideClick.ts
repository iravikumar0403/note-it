import { useEffect, useRef } from "react";

export const useOnOutsideClick = (callback: (event: MouseEvent) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback(event);
      }
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [callback]);

  return ref;
};
