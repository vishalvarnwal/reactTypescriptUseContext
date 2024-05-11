import { useEffect, useRef, useState } from "react";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timer-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const timerInterval = useRef<number | null>(null);
  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && timerInterval.current) {
    clearInterval(timerInterval.current);
  }
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (remainingTime <= 0) {
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50);
      timerInterval.current = timer;
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    } else {
      // timerInterval.current = setInterval(() => {
      //   setRemainingTime((prevState) => prevState - 50);
      // }, 50);
    }
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
