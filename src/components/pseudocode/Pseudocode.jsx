import React from "react";
import PropTypes from "prop-types";
import "./Pseudocode.css";

// Define and export the getPseudocode function
export const getPseudocode = (algorithm) => {
  switch (algorithm) {
    case "Merge Sort":
      return [
        "function mergeSort(array) {",
        "  if (array.length <= 1) {",
        "    return array;",
        "  }",
        "  const middle = Math.floor(array.length / 2);",
        "  const left = array.slice(0, middle);",
        "  const right = array.slice(middle);",
        "  return merge(mergeSort(left), mergeSort(right));",
        "}",
        "function merge(left, right) {",
        "  let result = [];",
        "  while (left.length && right.length) {",
        "    if (left[0] < right[0]) {",
        "      result.push(left.shift());",
        "    } else {",
        "      result.push(right.shift());",
        "    }",
        "  }",
        "  return result.concat(left.slice()).concat(right.slice());",
        "}",
      ];
    case "Quick Sort":
      return [
        "function quickSort(array) {",
        "  if (array.length <= 1) {",
        "    return array;",
        "  }",
        "  const pivot = array[array.length - 1];",
        "  const left = [], right = [];",
        "  for (const element of array.slice(0, array.length - 1)) {",
        "    element < pivot ? left.push(element) : right.push(element);",
        "  }",
        "  return [...quickSort(left), pivot, ...quickSort(right)];",
        "}",
      ];
    case "Insertion Sort":
      return [
        "function insertionSort(array) {",
        "  for (let i = 1; i < array.length; i++) {",
        "    let key = array[i];",
        "    let j = i - 1;",
        "    while (j >= 0 && array[j] > key) {",
        "      array[j + 1] = array[j];",
        "      j--; ",
        "    }",
        "    array[j + 1] = key;",
        "  }",
        "  return array;",
        "}",
      ];
    case "Bubble Sort":
      return [
        "function bubbleSort(array) {",
        "  let swapped;",
        "  do {",
        "    swapped = false;",
        "    for (let i = 0; i < array.length - 1; i++) {",
        "      if (array[i] > array[i + 1]) {",
        "        [array[i], array[i + 1]] = [array[i + 1], array[i]];",
        "        swapped = true;",
        "      }",
        "    }",
        "  } while (swapped);",
        "  return array;",
        "}",
      ];
    case "Heap Sort":
      return [
        "function heapSort(array) {",
        "  function heapify(arr, length, i) {",
        "    let largest = i;",
        "    const left = 2 * i + 1;",
        "    const right = 2 * i + 2;",
        "    if (left < length && arr[left] > arr[largest]) largest = left;",
        "    if (right < length && arr[right] > arr[largest]) largest = right;",
        "    if (largest !== i) {",
        "      [arr[i], arr[largest]] = [arr[largest], arr[i]];",
        "      heapify(arr, length, largest);",
        "    }",
        "  }",
        "  const length = array.length;",
        "  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {",
        "    heapify(array, length, i);",
        "  }",
        "  for (let i = length - 1; i > 0; i--) {",
        "    [array[0], array[i]] = [array[i], array[0]];",
        "    heapify(array, i, 0);",
        "  }",
        "  return array;",
        "}",
      ];
    case "Tim Sort":
      return [
        "function timSort(array) {",
        "  const MIN_MERGE = 32;",
        "  function insertionSort(arr, left, right) {",
        "    for (let i = left + 1; i <= right; i++) {",
        "      const temp = arr[i];",
        "      let j = i - 1;",
        "      while (j >= left && arr[j] > temp) {",
        "        arr[j + 1] = arr[j];",
        "        j--;",
        "      }",
        "      arr[j + 1] = temp;",
        "    }",
        "  }",
        "  function mergeSort(arr, left, right) {",
        "    if (right - left < MIN_MERGE) {",
        "      insertionSort(arr, left, right);",
        "      return;",
        "    }",
        "    const middle = Math.floor((left + right) / 2);",
        "    mergeSort(arr, left, middle);",
        "    mergeSort(arr, middle + 1, right);",
        "    merge(arr, left, middle, right);",
        "  }",
        "  mergeSort(array, 0, array.length - 1);",
        "  return array;",
        "}",
      ];
    case "Radix Sort":
      return [
        "function radixSort(array) {",
        "  const max = Math.max(...array);",
        "  let exp = 1;",
        "  while (Math.floor(max / exp) > 0) {",
        "    countingSortByDigit(array, exp);",
        "    exp *= 10;",
        "  }",
        "  return array;",
        "}",
      ];
    default:
      return [];
  }
};

/// Define the Pseudocode component
const Pseudocode = ({ algorithm, currentLine }) => {
  const pseudocode = getPseudocode(algorithm);

  if (!pseudocode.length) {
    return <div className="pseudocode">Pseudocode not available for {algorithm}</div>;
  }

  const isLineHighlighted = (index) => {
    return currentLine !== null && currentLine === index;
  };

  return (
    <div className="pseudocode">
      <h3>Pseudocode</h3>
      <pre>
        {pseudocode.map((line, index) => (
          <div
            key={index}
            className={`pseudocode-line ${isLineHighlighted(index) ? "highlight" : ""}`}
          >
            <span className="line-number">{index + 1}</span> {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

Pseudocode.propTypes = {
  algorithm: PropTypes.string.isRequired,
  currentLine: PropTypes.number,
};

export default Pseudocode;