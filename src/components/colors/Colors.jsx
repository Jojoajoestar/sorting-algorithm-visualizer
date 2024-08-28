// src/components/colors/Colors.js

/**
 * Colors object that defines the color scheme for different states in the sorting algorithms.
 * Each color represents a specific state of the elements during the sorting process.
 */

const Colors = {
  /**
   * Blue color for unsorted elements.
   * This is the default color indicating that the element has not yet been processed.
   */
  default: "#007bff",

  /**
   * Yellow color for elements being compared.
   * This color is used when two elements are currently being compared in the sorting process.
   */
  comparing: "#ffc107",

  /**
   * Pink color for elements being swapped.
   * This color indicates that two elements have been identified for swapping and are in the process of being swapped.
   */
  swapping: "#e83e8c",

  /**
   * Green color for sorted elements.
   * This color marks elements that have been sorted and are in their final position in the array.
   */
  sorted: "#28a745",

  /**
   * Purple color for the pivot element in Quick Sort.
   * This color highlights the pivot element that is used to partition the array during the Quick Sort process.
   */
  pivot: "#bf5af2",
};

export default Colors;
