// algorithms/BubbleSort.js

const BubbleSort = (array, arraySteps, colorSteps) => {
  const n = array.length;
  let arr = array.slice();
  let colors = colorSteps[colorSteps.length - 1].slice();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      colors[j] = "comparing";
      colors[j + 1] = "comparing";
      arraySteps.push(arr.slice());
      colorSteps.push(colors.slice());

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        colors[j] = "swapping";
        colors[j + 1] = "swapping";
        arraySteps.push(arr.slice());
        colorSteps.push(colors.slice());
      }

      colors[j] = "default";
      colors[j + 1] = "default";
    }
    colors[n - i - 1] = "sorted";
    arraySteps.push(arr.slice());
    colorSteps.push(colors.slice());
  }

  colors[0] = "sorted";
  arraySteps.push(arr.slice());
  colorSteps.push(colors.slice());
};

export default BubbleSort;
