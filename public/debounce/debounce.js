let counter = 0;
const getData = () => {
  console.log("Fetching data... ", counter++);
};

/**
 * One thing we defiently know is that it return a fucntion
 * If there is a delay in the key press, then only getData function will be called.
 * So now what happens is that when we type inside the seacrch box, the debouncedFunction will called on each and every key press,
 * So we will have lot of copies of customDebounce function running and a lot of timers running in the background,
 * So this timer will will call the getData function after 300ms,
 * so we need to come up with a solution to clear the setTimeout whenever a new function call is being made
 * func.apply(context, args);  “Call the original function (func) exactly the same way it was called.”
 *  this = “Who is calling the function?”
 * Problem in debounce When you wrap a function (like debounce does), you can lose this
 * arguments = all the values passed into the function Because inside setTimeout, you lose access to original arguments. “Save what user passed, so I can use it later”
 * Simple meaning:
 * .apply() = call a function with:
 * A specific this (context)
 * A list of arguments
 * @param {*} func
 * @param {*} delay
 * @returns
 */
const customDebounce = (func, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

/**
 * Call getData function only when the difference between two key press is greater than 300ms.
 * If the user keeps on pressing the key within 300ms, then getData function will not be called.
 */
const debouncedFunction = customDebounce(getData, 300);
