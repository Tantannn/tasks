import { useEffect, useRef, useState } from "react";

const useCountdown = () => {
  const countdownInputRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<number>(0);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startCountdown = (): void => {
    setIsRunning(true);
    const countdown = Number(countdownInputRef?.current?.value || 0) || 0;
    setTimeLeft(countdown);
    const now = Date.now();
    const endTimeInMs = now + countdown * 1000;
    endTimeRef.current = endTimeInMs;
  };

  const stopCountdown = (): void => {
    throw new Error("Function not implemented.");
  };

  useEffect(() => {
    if (!isRunning) return;

    const i = setInterval(() => {
      setTimeLeft((prev) => {
        const current = prev - 1;
        if (current === 0) {
          setIsRunning(false);
        }
        return current;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [isRunning]);

  return { startCountdown, stopCountdown, countdownInputRef, timeLeft };
};

export default useCountdown;
