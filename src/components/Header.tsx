import Button from "./UI/Button.tsx";
import { useTimersContext } from "../store/timer-context.tsx";

export default function Header() {
  const { isRunning, startTimers, stopTimers } = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={isRunning ? stopTimers : startTimers}>
        {isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
