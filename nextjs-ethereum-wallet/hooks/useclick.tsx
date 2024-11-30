import { useEffect } from "react";

type Events = MouseEvent | TouchEvent;

export const useClickAway = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  cb: (event: Events) => void
) => {
  useEffect(() => {
    const listener = (event: Events) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      cb(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, cb]);
};
