import Colors from "../../components/colors/Colors";

/**
 * RadixSort algorithm for sorting an array of integers.
 * 
 * @param {number[]} array - The array to be sorted.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const RadixSort = (array, arraySteps, colorSteps) => {
  const maxNum = Math.max(...array) * 10;
  let divisor = 10;

  while (divisor <= maxNum) {
    countingSortByDigit(array, divisor, arraySteps, colorSteps);
    divisor *= 10;
  }

  // Mark all elements as sorted after the final pass
  colorSteps.push(Array(array.length).fill("sorted"));
  arraySteps.push([...array]);
};

/**
 * Helper function to perform counting sort by a specific digit.
 * 
 * @param {number[]} array - The array to be sorted by digit.
 * @param {number} divisor - The divisor used to extract the digit.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const countingSortByDigit = (array, divisor, arraySteps, colorSteps) => {
  let buckets = [...Array(10)].map(() => []);
  let colors = colorSteps[colorSteps.length - 1].slice();

  array.forEach((num, index) => {
    const bucketIndex = Math.floor((num % divisor) / (divisor / 10));
    buckets[bucketIndex].push(num);

    colors[index] = "comparing"; // Highlight current digit being processed
    colorSteps.push([...colors]);
    arraySteps.push([...array]);
  });

  let index = 0;
  for (let i = 0; i < 10; i++) {
    while (buckets[i].length > 0) {
      array[index] = buckets[i].shift();

      // Keep the default color during sorting
      colors[index] = "default";
      colorSteps.push([...colors]);
      arraySteps.push([...array]);

      index++;
    }
  }

  // Finalize the sorted colors only after the last pass
  if (divisor * 10 > Math.max(...array)) {
    colors.fill("sorted");
    arraySteps.push([...array]);
    colorSteps.push([...colors]);
  }
};

export default RadixSort;
