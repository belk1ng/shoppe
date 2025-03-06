import { useEffect, useState } from "react";

export enum ProgressState {
  Initial,
  InProgress,
  Complete,
}

/**
 * A custom React hook that manages a progress state with three stages: Initial, InProgress, and Complete.
 * It provides functionality to start, complete, and reset the progress, as well as automatically updates
 * the progress value based on predefined intervals.
 *
 * @returns {{
 *   state: ProgressState,
 *   value: number,
 *   start: () => void,
 *   done: () => void,
 *   reset: () => void
 * }} An object containing the current progress state, value, and methods to control the progress.
 *
 * @typedef {Object} ProgressState
 * @property {number} Initial - Represents the initial state of the progress.
 * @property {number} InProgress - Represents the state when the progress is actively updating.
 * @property {number} Complete - Represents the state when the progress has been completed.
 *
 * @example
 * import { useProgress, ProgressState } from './path-to-hook';
 *
 * function ProgressBar() {
 *   const { state, value, start, done, reset } = useProgress();
 *
 *   useEffect(() => {
 *     if (state === ProgressState.Initial) {
 *       start();
 *     }
 *   }, [state, start]);
 *
 *   return (
 *     <div>
 *       <div style={{ width: `${value}%` }}>Progress: {value}%</div>
 *       <button onClick={done}>Complete</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 */
export const useProgress = () => {
  const [state, setState] = useState(ProgressState.Initial);

  const [value, setValue] = useState(0);

  const start = () => {
    setState(ProgressState.InProgress);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (state === ProgressState.InProgress) {
          if (value >= 60 && value < 80) {
            setValue(value + 2);
          } else if (value >= 80 && value < 95) {
            setValue(value + 0.5);
          } else if (value >= 95) {
            setValue(95);
          } else {
            setValue(value + 5);
          }
        } else if (state === ProgressState.Complete) {
          setValue(100);
          clearInterval(interval);
        }
      },
      state === ProgressState.InProgress ? 600 : 0
    );

    return () => clearInterval(interval);
  }, [state, value]);

  const done = () => {
    setState(ProgressState.Complete);
  };

  const reset = () => {
    setValue(0);
    setState(ProgressState.Initial);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (value === 100) {
      timeout = setTimeout(() => {
        reset();
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [value]);

  return {
    state,
    value,
    start,
    done,
    reset,
  } as const;
};
