import { useEffect, useRef } from "react";

export const useOnOutsideClick = (callback: (event: Event) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback(event);
      }
    };

    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [callback]);

  return ref;
};
