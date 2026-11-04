import { useEffect, useRef } from "react";

const useCountdown = () => {
  const coundownInputRef = useRef<HTMLInputElement>(null);

  const startCountdown = (): void => {
    const countdown = Number(coundownInputRef?.current?.value || 0) || 0;
    const now = Date.now();
    const endTimeInMs = now + countdown * 1000;
  };

  const stopCountdown = (): void => {
    throw new Error("Function not implemented.");
  };

  useEffect(() => {
    setTimeout(() => {}, Number(coundownInputRef?.current?.value) || 0);
  }, []);

  return { startCountdown, stopCountdown, coundownInputRef };
};

export default useCountdown;
