import Colors from "../../components/colors/Colors";

/**
 * InsertionSort algorithm for sorting an array.
 * 
 * @param {number[]} array - The array to be sorted.
 * @param {number[][]} arraySteps - Array of steps showing the array state at each stage.
 * @param {string[][]} colorSteps - Array of steps showing the color state at each stage.
 */
const InsertionSort = (array, arraySteps, colorSteps) => {
  let n = array.length;
  let arr = array.slice();
  let colors = colorSteps[colorSteps.length - 1].slice();

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    colors[i] = "comparing";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      colors[j + 1] = "swapping";
      colors[j] = "comparing";
      arraySteps.push(arr.slice());
      colorSteps.push(colors.slice());
      j--;
    }
    arr[j + 1] = key;

    colors.fill("sorted", 0, i + 1);
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
  }

  colors.fill("sorted");
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());
};

export default InsertionSort;
