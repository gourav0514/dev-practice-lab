import { useState, useRef, useEffect, useCallback } from "react";

const useTimer = (totalDuartion) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(totalDuartion);
  const timerIdRef = useRef(null);

  const start = useCallback(() => {
    //Issue in this logic is that seconds is not updated in the setInterval callback,
    // so it will always use the initial value of seconds.
    //  To fix this, we can use a ref to keep track of the current value of seconds and update it inside the setInterval callback.
    // as both setINterval and setSeconds are asynchronous,
    // setInterval(() => {
    //   const updatedSeconds = seconds - 1;
    //   setSeconds(updatedSeconds);
    // }, 1000);

    timerIdRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    setIsRunning(true);
  }, [setSeconds, setIsRunning]);

  /**
   * for this end, from setInterval we get a timer ID, we can use that timer ID to clear the interval when the end function is called. This will stop the timer and prevent it from updating the seconds state further.
   * Now we can use a global variable to store the timer ID and clear it in the end function. but this approach is not recommended as a hook should self contained.
   * we can use state to store the timer ID, but this also not work due to re-renders.
   * instead we can use a ref to store the timer ID, as refs are mutable and do not cause re-renders when updated.
   */

  const end = useCallback(() => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
    setSeconds(totalDuartion);
  }, [setIsRunning, setSeconds]);

  /**
   * If we will not use useEffect instead we check seconds in start function and then perform some action,
   * it is not a good idea as we will not get the updated seconds plus it is not a good idea to add more logic
   *  in start as the logic of start is just to start. so better so use useEffect to check the seconds and perform some action
   *  when seconds is less than 1.
   */

  useEffect(() => {
    if (seconds < 1) {
      end();
    }
  }, [seconds, stop]);

  //Unmount Logic
  useEffect(() => {
    return () => timerIdRef.current && clearInterval(timerIdRef.current);
  }, []);

  return {
    isRunning,
    start,
    end,
    seconds
  };
};

export default useTimer;
