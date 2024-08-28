// src/components/info/AlgorithmInfo.js

import React from "react";
import PropTypes from "prop-types";
import "./AlgorithmInfo.css"; // Include CSS

/**
 * AlgorithmInfo Component
 * 
 * Displays detailed information about the selected sorting algorithm,
 * including its time complexity, space complexity, stability, and best use case.
 */
const AlgorithmInfo = ({ algorithm }) => {
  const info = {
    "Merge Sort": {
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      spaceComplexity: "O(n)",
      stability: "Stable",
      useCases: "Good for large datasets and when stability is important.",
      description: "Merge Sort is a stable, divide-and-conquer algorithm that divides the array into smaller subarrays and then merges them together in sorted order.",
    },
    "Quick Sort": {
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n^2)",
      spaceComplexity: "O(log n)",
      stability: "Not stable",
      useCases: "Efficient for large datasets but not recommended when stability is required.",
      description: "Quick Sort is an in-place, divide-and-conquer algorithm that selects a pivot element and partitions the array into subarrays. The pivoting process is repeated recursively.",
    },
    "Insertion Sort": {
      bestCase: "O(n)",
      averageCase: "O(n^2)",
      worstCase: "O(n^2)",
      spaceComplexity: "O(1)",
      stability: "Stable",
      useCases: "Efficient for small or nearly sorted datasets.",
      description: "Insertion Sort builds the final sorted array one item at a time, inserting each new item into its proper place within the sorted portion of the array.",
    },
    "Bubble Sort": {
      bestCase: "O(n)",
      averageCase: "O(n^2)",
      worstCase: "O(n^2)",
      spaceComplexity: "O(1)",
      stability: "Stable",
      useCases: "Primarily used for educational purposes due to its simplicity.",
      description: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest element 'bubbles up' to the end of the list with each pass.",
    },
    "Heap Sort": {
      bestCase: "O(n log n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      spaceComplexity: "O(1)",
      stability: "Not stable",
      useCases: "Efficient when space complexity is critical and stability is not required.",
      description: "Heap Sort is an in-place sorting algorithm that builds a binary heap from the array and repeatedly extracts the maximum element from the heap, placing it in its correct position in the sorted array.",
    },
    "Tim Sort": {
      bestCase: "O(n)",
      averageCase: "O(n log n)",
      worstCase: "O(n log n)",
      spaceComplexity: "O(n)",
      stability: "Stable",
      useCases: "Ideal for real-world sorting tasks; used in Python's sort and Java's Arrays.sort().",
      description: "Tim Sort is a hybrid algorithm that combines Merge Sort and Insertion Sort, optimized for real-world data. It sorts small chunks using Insertion Sort and then merges them using a modified Merge Sort.",
    },
    "Radix Sort": {
      bestCase: "O(nk)",
      averageCase: "O(nk)",
      worstCase: "O(nk)",
      spaceComplexity: "O(n + k)",
      stability: "Stable",
      useCases: "Effective for sorting integers, particularly in systems with large datasets.",
      description: "Radix Sort processes numbers by sorting individual digits, starting from the least significant digit to the most significant digit. It is particularly efficient for sorting integers in fixed-length datasets.",
    },
  };

  const algorithmInfo = info[algorithm];

  if (!algorithmInfo) {
    return <div>Algorithm information is not available.</div>;
  }

  return (
    <div className="algorithm-info">
      <h3>{algorithm}</h3>
      <p><strong>Best Case:</strong> {algorithmInfo.bestCase}</p>
      <p><strong>Average Case:</strong> {algorithmInfo.averageCase}</p>
      <p><strong>Worst Case:</strong> {algorithmInfo.worstCase}</p>
      <p><strong>Space Complexity:</strong> {algorithmInfo.spaceComplexity}</p>
      <p><strong>Stability:</strong> {algorithmInfo.stability}</p>
      <p><strong>Best Use Cases:</strong> {algorithmInfo.useCases}</p>
      <p>{algorithmInfo.description}</p>
    </div>
  );
};

AlgorithmInfo.propTypes = {
  algorithm: PropTypes.string.isRequired,
};

export default AlgorithmInfo;
