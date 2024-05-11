import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};
type TimersState = { isRunning: boolean; timers: Timer[] };

type TimerContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

//creating context
export const TimerContext = createContext<TimerContextValue | null>(null);

//creating custom hooks for not showing null, always return some value (for typescript related)
export function useTimersContext() {
  const timerCtx = useContext(TimerContext);
  if (timerCtx === null) {
    throw new Error("Timer context is null - That shouldn't be the case!s");
  }
  return timerCtx;
}

type TimerContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: "START_TIMERS";
};

type StopTimersAction = {
  type: "STOP_TIMERS";
};

type AddTimersAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimersAction;

function timeReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "START_TIMERS") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMERS") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }
  return state;
}

const TimerContextProvider = ({ children }: TimerContextProviderProps) => {
  const [timerState, dispatch] = useReducer(timeReducer, initialState);
  const ctx: TimerContextValue = {
    timers: timerState.timers,
    isRunning: timerState.isRunning,
    addTimer: (timerData) => {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers: () => {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers: () => {
      dispatch({ type: "STOP_TIMERS" });
    },
  };
  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>;
};

export default TimerContextProvider;
