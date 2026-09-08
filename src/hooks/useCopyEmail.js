import { useState, useRef, useCallback, useEffect } from "react";

export default function useCopyEmail(email, revertDelay = 1500) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), revertDelay);
    });
  }, [email, revertDelay]);

  return { copied, handleClick };
}
