import Colors from "../../components/colors/Colors";

/**
 * TimSort algorithm for sorting an array.
 * 
 * @param {number[]} array - The array to be sorted.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 * @param {number} runSize - The size of the run for the TimSort algorithm.
 */
const TimSort = (array, arraySteps, colorSteps, runSize = 32) => {
  const n = array.length;
  let arr = array.slice();
  let colors = colorSteps[colorSteps.length - 1].slice();

  // Sort individual subarrays of size runSize using Insertion Sort
  for (let i = 0; i < n; i += runSize) {
    insertionSort(arr, i, Math.min(i + runSize - 1, n - 1), arraySteps, colorSteps);
  }

  // Merge sorted subarrays
  for (let size = runSize; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right, arraySteps, colorSteps);
    }
  }
};

/**
 * Insertion Sort function used within TimSort.
 * 
 * @param {number[]} arr - The array to be sorted.
 * @param {number} left - The starting index of the subarray.
 * @param {number} right - The ending index of the subarray.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const insertionSort = (arr, left, right, arraySteps, colorSteps) => {
  for (let i = left + 1; i <= right; i++) {
    let key = arr[i];
    let j = i - 1;
    let colors = colorSteps[colorSteps.length - 1].slice();

    colors[i] = "comparing";
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      colors[j + 1] = "swapping";
      j--;

      arraySteps.push(arr.slice());
      colorSteps.push(colors.slice());
    }
    arr[j + 1] = key;

    // Reset the color of the inserted key
    colors[i] = "default";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
  }

  // Mark the sorted part
  let colorsSorted = colorSteps[colorSteps.length - 1].slice();
  colorsSorted.fill("sorted", left, right + 1);
  arraySteps.push(arr.slice());
  colorSteps.push(colorsSorted.slice());
};

/**
 * Merge function used within TimSort to merge sorted subarrays.
 * 
 * @param {number[]} arr - The array containing the subarrays to be merged.
 * @param {number} left - The starting index of the first subarray.
 * @param {number} mid - The ending index of the first subarray.
 * @param {number} right - The ending index of the second subarray.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const merge = (arr, left, mid, right, arraySteps, colorSteps) => {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let leftIndex = 0,
    rightIndex = 0,
    arrIndex = left;

  let colors = colorSteps[colorSteps.length - 1].slice();
  colors.fill("comparing", left, right + 1);

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (leftArr[leftIndex] <= rightArr[rightIndex]) {
      arr[arrIndex] = leftArr[leftIndex];
      leftIndex++;
    } else {
      arr[arrIndex] = rightArr[rightIndex];
      rightIndex++;
    }

    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
    arrIndex++;
  }

  while (leftIndex < leftArr.length) {
    arr[arrIndex] = leftArr[leftIndex];
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
    leftIndex++;
    arrIndex++;
  }

  while (rightIndex < rightArr.length) {
    arr[arrIndex] = rightArr[rightIndex];
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
    rightIndex++;
    arrIndex++;
  }

  colors.fill("sorted", left, right + 1);
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());
};

export default TimSort;
