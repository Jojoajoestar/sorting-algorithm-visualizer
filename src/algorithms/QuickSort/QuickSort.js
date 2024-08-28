import Colors from "../../components/colors/Colors";

/**
 * QuickSort algorithm for sorting an array.
 * 
 * @param {number[]} array - The array to be sorted.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const QuickSort = (array, arraySteps, colorSteps) => {
  quickSortHelper(array, 0, array.length - 1, arraySteps, colorSteps);

  // Ensure all elements are marked as sorted after the entire sorting process
  let colors = Array(array.length).fill("sorted");
  arraySteps.push(array.slice());
  colorSteps.push(colors.slice());
};

/**
 * Recursive helper function for QuickSort.
 * 
 * @param {number[]} arr - The array to be sorted.
 * @param {number} low - The starting index of the subarray.
 * @param {number} high - The ending index of the subarray.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const quickSortHelper = (arr, low, high, arraySteps, colorSteps) => {
  if (low < high) {
    let pivotIndex = partition(arr, low, high, arraySteps, colorSteps);

    // Mark pivot as sorted
    let colors = colorSteps[colorSteps.length - 1].slice();
    colors[pivotIndex] = "sorted";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());

    quickSortHelper(arr, low, pivotIndex - 1, arraySteps, colorSteps);
    quickSortHelper(arr, pivotIndex + 1, high, arraySteps, colorSteps);
  }
};

/**
 * Partition function used in QuickSort.
 * 
 * @param {number[]} arr - The array to be partitioned.
 * @param {number} low - The starting index of the subarray.
 * @param {number} high - The ending index of the subarray.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 * @returns {number} - The index of the pivot after partitioning.
 */
const partition = (arr, low, high, arraySteps, colorSteps) => {
  let pivot = arr[high];
  let i = low - 1;
  let colors = colorSteps[colorSteps.length - 1].slice();

  colors[high] = "pivot"; // Highlight the pivot
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());

  for (let j = low; j < high; j++) {
    colors[j] = "comparing"; // Highlight current comparison
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
      colors[i] = "swapping";
      colors[j] = "swapping";
      arraySteps.push(arr.slice());
      colorSteps.push(colors.slice());

      // Reset swapped colors to default
      colors[i] = "default";
      colors[j] = "default";
    } else {
      // Reset comparison color if no swap
      colors[j] = "default";
    }
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
  }

  // Swap pivot into its final position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  colors[i + 1] = "sorted"; // Mark the new pivot position as sorted
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());

  // Reset the pivot's original color if it's no longer being used as a pivot
  colors[high] = "default";

  return i + 1;
};

export default QuickSort;
