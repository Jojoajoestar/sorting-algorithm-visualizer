import Colors from "../../components/colors/Colors";

/**
 * HeapSort algorithm for sorting an array.
 * 
 * @param {number[]} array - The array to be sorted.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const HeapSort = (array, arraySteps, colorSteps) => {
  let n = array.length;
  let arr = array.slice();
  let colors = colorSteps[colorSteps.length - 1].slice();

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, arraySteps, colorSteps);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    colors[i] = "sorted";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());

    heapify(arr, i, 0, arraySteps, colorSteps);
  }

  colors[0] = "sorted";
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());
};

/**
 * Helper function to maintain the heap property.
 * 
 * @param {number[]} arr - The array being heapified.
 * @param {number} n - Size of the heap.
 * @param {number} i - Index of the root element.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const heapify = (arr, n, i, arraySteps, colorSteps) => {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let colors = colorSteps[colorSteps.length - 1].slice();

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    colors[i] = "swapping";
    colors[largest] = "swapping";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());

    heapify(arr, n, largest, arraySteps, colorSteps);
  }

  colors[i] = "default";
  colors[largest] = "default";
};

export default HeapSort;
