import { useEffect, useRef, useState } from "react";

const useCountdown = () => {
  const countdownInputRef = useRef<HTMLInputElement | null>(null);
  // const endTimeRef = useRef<number>(0);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startCountdown = (): void => {
    const countdown = Number(countdownInputRef?.current?.value || 0) || 0;
    if (countdown <= 0) return;
    setIsRunning(true);
    setTimeLeft(countdown);
    if (countdownInputRef.current) {
      countdownInputRef.current.value = "";
    }
    // const now = Date.now();
    // const endTimeInMs = now + countdown * 1000;
    // endTimeRef.current = endTimeInMs;
  };

  const stopCountdown = (): void => {
    setIsRunning(false);
  };

  const continnueCountdown = (): void => {
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  return {
    startCountdown,
    stopCountdown,
    countdownInputRef,
    timeLeft,
    isRunning,
    continnueCountdown,
  };
};

export default useCountdown;
