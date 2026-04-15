var input = [
  1,
  2,
  3,
  [4],
  [5, 6, [7], [8, [9, [10]]]],
  11,
  12,
  13,
  [14, [[[[[15, [16]]]]]]],
  17,
  18,
  [19, [20, [21, [22, [23, [24, [[[[[25]]]]]]]]]]]
];

function flatten() {
  const result = [];

  function helper(arr) {
    for (const item of arr) {
      if (Array.isArray(item)) {
        helper(item);
      } else {
        result.push(item);
      }
    }
  }

  helper(this);
  return result;
}

function depthflatten(depth) {
  const result = [];

  function helper(arr, currentDepth) {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < depth) {
        helper(item, currentDepth + 1);
      } else if (!Array.isArray(item)) {
        result.push(item);
      }
    }
  }

  helper(this, 0);
  return result;
}

function Arrayflat() {
  return this.toString()
    .split(",")
    .map((item) => Number(item));
}

Array.prototype.flatten = depthflatten;
console.log(input.flatten(3));

//  follow up
// 1) We can have a depth till that depth you need to flatten the array. For example, if depth is 2, then we will flatten the array till depth 2 and if depth is 3, then we will flatten the array till depth 3 and so on.
// 2) Can we do by mutating the original array instead of creating a new array and returning it.
