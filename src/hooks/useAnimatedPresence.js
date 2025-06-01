import { useEffect, useRef, useState } from "react";

export default function useAnimatedPresence(show) {
  const [shouldRender, setShouldRender] = useState(show);
  const ref = useRef(null);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const node = ref.current;
      if (!node) return;
      const handleTransitionEnd = () => {
        setShouldRender(false);
        node.removeEventListener("transitionend", handleTransitionEnd);
      };
      node.addEventListener("transitionend", handleTransitionEnd);
    }
  }, [show]);

  return [shouldRender, ref];
}