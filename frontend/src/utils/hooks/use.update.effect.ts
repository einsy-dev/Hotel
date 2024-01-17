import { useEffect, useRef } from "react";

export default function useUpdateEffect(callback: any, dependencies = []) {
  const didMount = useRef(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
    } else {
      callback();
    }
  }, dependencies);
}
