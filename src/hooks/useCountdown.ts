"use client";

import { useEffect, useState } from "react";

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const start = (sec: number) => {
    setTimeLeft(sec);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  return { timeLeft, isRunning, start, stop };
};
