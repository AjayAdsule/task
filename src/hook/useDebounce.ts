import { useCallback, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => void>(
  cb: T,
  delay: number
) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (ref.current) clearTimeout(ref.current);

      ref.current = setTimeout(() => cb(...args), delay);
    },
    [cb, delay]
  );
}
