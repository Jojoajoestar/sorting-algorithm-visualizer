import Colors from "../../components/colors/Colors";

/**
 * MergeSort algorithm for sorting an array.
 * 
 * @param {number[]} array - The array to be sorted.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const MergeSort = (array, arraySteps, colorSteps) => {
  mergeSortHelper(array, 0, array.length - 1, arraySteps, colorSteps);
};

/**
 * Recursive helper function for MergeSort.
 * 
 * @param {number[]} arr - The array to be sorted.
 * @param {number} left - The starting index of the subarray.
 * @param {number} right - The ending index of the subarray.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const mergeSortHelper = (arr, left, right, arraySteps, colorSteps) => {
  if (left >= right) return;

  const middle = Math.floor((left + right) / 2);

  mergeSortHelper(arr, left, middle, arraySteps, colorSteps);
  mergeSortHelper(arr, middle + 1, right, arraySteps, colorSteps);
  merge(arr, left, middle, right, arraySteps, colorSteps);
};

/**
 * Function to merge two sorted subarrays.
 * 
 * @param {number[]} arr - The array containing the subarrays to be merged.
 * @param {number} left - The starting index of the first subarray.
 * @param {number} middle - The ending index of the first subarray.
 * @param {number} right - The ending index of the second subarray.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const merge = (arr, left, middle, right, arraySteps, colorSteps) => {
  let leftArray = arr.slice(left, middle + 1);
  let rightArray = arr.slice(middle + 1, right + 1);

  let i = 0, j = 0, k = left;

  let colors = colorSteps[colorSteps.length - 1].slice();
  colors.fill("comparing", left, right + 1);

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      colors[k] = "swapping";
      i++;
    } else {
      arr[k] = rightArray[j];
      colors[k] = "swapping";
      j++;
    }
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
    k++;
  }

  while (i < leftArray.length) {
    arr[k] = leftArray[i];
    colors[k] = "swapping";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
    i++;
    k++;
  }

  while (j < rightArray.length) {
    arr[k] = rightArray[j];
    colors[k] = "swapping";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
    j++;
    k++;
  }

  colors.fill("sorted", left, right + 1);
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());
};

export default MergeSort;
