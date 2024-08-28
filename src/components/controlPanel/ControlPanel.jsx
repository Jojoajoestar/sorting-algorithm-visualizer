// src/components/controlPanel/ControlPanel.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import RefreshIcon from '@mui/icons-material/Refresh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import "./ControlPanel.css";

/**
 * ControlPanel component provides controls for selecting the sorting algorithm,
 * adjusting the array size and sorting speed, and starting the sorting process.
 *
 * @param {function} startSorting - Function to start the sorting process.
 * @param {function} generateNewArray - Function to generate a new random array.
 * @param {function} handleArraySizeAndSpeedChange - Function to handle changes in array size and sorting speed.
 * @param {function} setAlgorithm - Function to set the selected sorting algorithm.
 * @param {number} arraySize - The current size of the array.
 * @param {string} algorithm - The currently selected sorting algorithm.
 * @param {function} openInfoModal - Function to open the information modal for the selected algorithm.
 */
const ControlPanel = ({
  startSorting,
  generateNewArray,
  handleArraySizeAndSpeedChange,
  setAlgorithm,
  arraySize,
  algorithm,
  openInfoModal,
}) => {
  const [loading, setLoading] = useState({ newArray: false, sort: false });

  const sortArrayHandler = () => {
    setLoading(prev => ({ ...prev, sort: true }));
    startSorting();
    setLoading(prev => ({ ...prev, sort: false }));
  };

  const generateNewArrayHandler = () => {
    setLoading(prev => ({ ...prev, newArray: true }));
    generateNewArray();
    setLoading(prev => ({ ...prev, newArray: false }));
  };

  const handleArraySizeChange = (event, newValue) => handleArraySizeAndSpeedChange(newValue);
  const handleSortingAlgorithmChange = (event, newValue) => setAlgorithm(newValue);

  return (
    <div className="control-panel">
      <ToggleButtonGroup
        value={algorithm}
        exclusive
        onChange={handleSortingAlgorithmChange}
        className="toggle-group"
      >
        <ToggleButton value="Insertion Sort">Insertion Sort</ToggleButton>
        <ToggleButton value="Merge Sort">Merge Sort</ToggleButton>
        <ToggleButton value="Quick Sort">Quick Sort</ToggleButton>
        <ToggleButton value="Bubble Sort">Bubble Sort</ToggleButton>
        <ToggleButton value="Heap Sort">Heap Sort</ToggleButton>
        <ToggleButton value="Tim Sort">Tim Sort</ToggleButton>
        <ToggleButton value="Radix Sort">Radix Sort</ToggleButton>
      </ToggleButtonGroup>
      <div className="slider-container">
        <Typography gutterBottom>Array Size & Sorting Speed</Typography>
        <Slider
          value={arraySize}
          min={5}
          step={1}
          max={100}
          onChange={handleArraySizeChange}
          valueLabelDisplay="auto"
          aria-labelledby="array size and sorting speed slider"
        />
      </div>
      <div className="action-buttons-container">
        <Button
          variant="contained"
          color="primary"
          onClick={generateNewArrayHandler}
          disabled={loading.newArray}
          className={loading.newArray ? "button-loading" : ""}
          startIcon={<RefreshIcon />}
        >
          New Array
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={openInfoModal}
          startIcon={<InfoIcon />}
        >
          Algorithm Info
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={sortArrayHandler}
          disabled={loading.sort}
          className={loading.sort ? "button-loading" : ""}
          startIcon={<PlayArrowIcon />}
        >
          Sort!
        </Button>
      </div>
      {loading.sort && <div className="progress-bar"></div>}
    </div>
  );
};

ControlPanel.propTypes = {
  startSorting: PropTypes.func.isRequired,
  generateNewArray: PropTypes.func.isRequired,
  handleArraySizeAndSpeedChange: PropTypes.func.isRequired,
  setAlgorithm: PropTypes.func.isRequired,
  algorithm: PropTypes.string.isRequired,
  arraySize: PropTypes.number.isRequired,
  openInfoModal: PropTypes.func.isRequired,
};

export default ControlPanel;
