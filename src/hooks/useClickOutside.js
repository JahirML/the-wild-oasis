import { useEffect, useRef } from "react";

function useClickOutside(close, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("click outside");
          close();
        }
      }

      function handleKey(e) {
        // console.log(e.key);
        if (e.key === "Escape") close();
      }
      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("keydown", handleKey, listenCapturing);

      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener("keydown", handleKey, listenCapturing);
      };
    },
    [close, listenCapturing]
  );
  return { ref };
}
export default useClickOutside;
