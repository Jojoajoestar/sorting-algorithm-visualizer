import React, { useState, useEffect, useCallback } from 'react';
import ControlPanel from './components/controlPanel/ControlPanel';
import Footer from './components/footer/Footer';
import Bar from './components/bar/Bar';
import Legend from './components/legend/Legend';
import InfoModal from './components/infomodal/InfoModal';
import IntroModal from './components/intro/IntroModal';
import Colors from './components/colors/Colors';
import './App.css';

// Import sorting algorithms
import BubbleSort from './algorithms/BubbleSort/BubbleSort';
import QuickSort from './algorithms/QuickSort/QuickSort';
import InsertionSort from './algorithms/InsertionSort/InsertionSort';
import MergeSort from './algorithms/MergeSort/MergeSort';
import HeapSort from './algorithms/HeapSort/HeapSort';
import TimSort from './algorithms/TimSort/TimSort';
import RadixSort from './algorithms/RadixSort/RadixSort';

/**
 * Main application component for the Sorting Visualizer.
 * This component handles the overall state management and rendering of the application.
 */
const App = () => {
  // State variables for array and visualization control
  const [array, setArray] = useState([]);
  const [arraySteps, setArraySteps] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [arraySize, setArraySize] = useState(50);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [delay, setDelay] = useState(100);
  const [isSorting, setIsSorting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState(0); // Initialize to 0

  const navbarHeight = 150;

  /**
   * Initializes the array with random values and resets the visualization steps.
   */
  const initializeArray = useCallback(() => {
    const initialArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(initialArray);
    setArraySteps([initialArray.slice()]);
    setColorSteps([Array(arraySize).fill('default')]);
    setCurrentStep(0);
  }, [arraySize]);

  /**
   * Starts the sorting process by selecting the appropriate algorithm
   * and initiating the animation sequence.
   */
  const startSorting = () => {
    if (isSorting) return;
    setIsSorting(true);
    let steps = arraySteps.slice();
    let colorStepsLocal = colorSteps.slice();
    let arrayCopy = array.slice();

    switch (algorithm) {
      case 'Bubble Sort':
        BubbleSort(arrayCopy, steps, colorStepsLocal);
        break;
      case 'Quick Sort':
        QuickSort(arrayCopy, steps, colorStepsLocal);
        break;
      case 'Insertion Sort':
        InsertionSort(arrayCopy, steps, colorStepsLocal);
        break;
      case 'Merge Sort':
        MergeSort(arrayCopy, steps, colorStepsLocal);
        break;
      case 'Heap Sort':
        HeapSort(arrayCopy, steps, colorStepsLocal);
        break;
      case 'Tim Sort':
        TimSort(arrayCopy, steps, colorStepsLocal, 32);
        break;
      case 'Radix Sort':
        RadixSort(arrayCopy, steps, colorStepsLocal);
        break;
      default:
        console.error('Invalid algorithm selected!');
        setIsSorting(false);
        return;
    }

    animateSorting(steps, colorStepsLocal);
  };

  /**
   * Animates the sorting process by updating the array and color states at each step.
   * @param {Array} steps - The sequence of array states for each step of the algorithm.
   * @param {Array} colorStepsLocal - The sequence of color states for each step of the algorithm.
   */
  const animateSorting = (steps, colorStepsLocal) => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArray(step);
        setColorSteps(colorStepsLocal);
        setCurrentStep(index);
        if (index === steps.length - 1) setIsSorting(false);
      }, index * delay);
    });
  };

  /**
   * Handles the generation of a new random array.
   */
  const generateNewArray = () => {
    initializeArray();
  };

  /**
   * Handles the adjustment of array size and sorting speed.
   * @param {number} value - The new value for the array size and speed.
   */
  const handleArraySizeAndSpeedChange = (value) => {
    setArraySize(value);
    setDelay(500 / value);
    initializeArray();
  };

  /**
   * Synchronizes the array visualization with the pseudocode step-through.
   * @param {number} stepIndex - The index of the current step in the pseudocode.
   */
  const handleStepThroughPseudocode = (stepIndex) => {
    if (stepIndex < 0 || stepIndex >= arraySteps.length) return;
    setCurrentStep(stepIndex);
    setArray(arraySteps[stepIndex]);
    setCurrentLine(stepIndex);
  };

  useEffect(() => {
    initializeArray();
  }, [initializeArray]);

  const containerWidth = window.innerWidth - 100;
  const barWidth = Math.floor(containerWidth / arraySize);

  const bars = array.map((value, index) => (
    <Bar
      key={index}
      length={value}
      color={Colors[colorSteps[currentStep][index]]}
      width={barWidth}
      speed={500 / arraySize}
      navbarHeight={navbarHeight}
    />
  ));

  /**
   * Handles closing of the Info Modal.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header className="header-container">
        <h1 className="title">Sorting Algorithm Visualizer</h1>
        <ControlPanel
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          arraySize={arraySize}
          generateNewArray={generateNewArray}
          handleArraySizeAndSpeedChange={handleArraySizeAndSpeedChange}
          startSorting={startSorting}
          openInfoModal={() => setIsModalOpen(true)}
        />
      </header>
      <main className="main-content">
        <div className="visualization-container">
          <div className="array-display">
            {bars}
            <Legend algorithm={algorithm} />
          </div>
        </div>
      </main>
      <Footer />
      <IntroModal />
      <InfoModal
        isOpen={isModalOpen}
        algorithm={algorithm}
        onClose={handleCloseModal}
        currentLine={currentLine}
        onStepThrough={handleStepThroughPseudocode}
      />
    </div>
  );
};

export default App;
