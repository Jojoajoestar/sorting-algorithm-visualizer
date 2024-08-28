import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import AlgorithmInfo from "../info/AlgorithmInfo";
import Pseudocode, { getPseudocode } from "../pseudocode/Pseudocode";
import "./InfoModal.css";

/**
 * InfoModal Component
 *
 * This component is a modal dialog that provides tabs for viewing algorithm information
 * and pseudocode. It also allows stepping through the pseudocode.
 *
 * Props:
 * - isOpen (bool): Controls whether the modal is open or closed.
 * - algorithm (string): The algorithm to display information and pseudocode for.
 * - currentLine (number): The current line of pseudocode being highlighted.
 * - onClose (function): Callback to close the modal.
 * - onStepThrough (function): Callback to step through the pseudocode.
 */
const InfoModal = ({ isOpen, algorithm, currentLine, onClose, onStepThrough }) => {
  const [tabIndex, setTabIndex] = useState(0); // Tracks the current tab
  const [currentStepIndex, setCurrentStepIndex] = useState(currentLine || 0); // Tracks the current line in the pseudocode

  // Fetch pseudocode based on the selected algorithm
  const pseudocode = getPseudocode(algorithm);
  const pseudocodeLength = pseudocode ? pseudocode.length : 0;

  // Handles tab switching
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  // Advances to the next step in the pseudocode
  const handleNextStep = () => {
    if (currentStepIndex < pseudocodeLength - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      onStepThrough(nextStepIndex);
    }
  };

  // Goes back to the previous step in the pseudocode
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevStepIndex);
      onStepThrough(prevStepIndex);
    }
  };

  // Closes modal on pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Updates the step index when the currentLine prop changes
  useEffect(() => {
    setCurrentStepIndex(currentLine || 0);
  }, [currentLine]);

  return (
    <Modal open={isOpen} onClose={onClose} className="modal-container">
      <div className="modal-content">
        <Button className="modal-close-button" onClick={onClose} aria-label="Close">
          &times;
        </Button>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Information" />
          <Tab label="Pseudocode" />
        </Tabs>
        <div className="modal-body">
          {/* Algorithm Information Tab */}
          {tabIndex === 0 && <AlgorithmInfo algorithm={algorithm} />}
          {/* Pseudocode Tab */}
          {tabIndex === 1 && pseudocodeLength > 0 && (
            <>
              <Pseudocode algorithm={algorithm} currentLine={currentStepIndex} />
              <div className="pseudocode-controls">
                <Button onClick={handlePreviousStep} disabled={currentStepIndex <= 0}>
                  Previous Step
                </Button>
                <Button onClick={handleNextStep} disabled={currentStepIndex >= pseudocodeLength - 1}>
                  Next Step
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

// PropTypes validation to ensure correct props are passed
InfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  algorithm: PropTypes.string.isRequired,
  currentLine: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onStepThrough: PropTypes.func.isRequired,
};

export default InfoModal;
