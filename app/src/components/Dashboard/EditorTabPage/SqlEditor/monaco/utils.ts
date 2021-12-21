/**
 * The function is executed at most once in the delaytime (the last time).
 * If it is not executed within the freshTime, it will be executed once.
 * @param {function} func
 */
export function delayFunctionWrap(func?: any) {
  /**
   * Minimum execution interval, mandatory execution of a function every certain period of time
   * It can't be too small here, because too small will cause large parsing tasks to be blocked when they are not executed.
   */
  const freshTime = 3000;
  /**
   * Function delay time
   */
  const delayTime = 500;

  let outTime: any;
  let timeClock: any;
  return function() {
    // eslint-disable-next-line prefer-rest-params
    const arg: any = arguments;
    timeClock && clearTimeout(timeClock);
    // It is set here that the function must be executed once within a certain period of time
    if (outTime) {
      const now: any = new Date();
      if (now - outTime > freshTime) {
        func(...arg);
      }
    } else {
      outTime = new Date();
    }
    timeClock = setTimeout(() => {
      outTime = null;
      func(...arg);
    }, delayTime);
  };
}
