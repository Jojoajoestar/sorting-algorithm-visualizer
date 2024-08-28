import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'; // Updated Icon
import "./IntroModal.css";

/**
 * IntroModal Component
 *
 * This component provides an introductory tutorial for the sorting algorithm visualizer.
 * It includes multiple steps and allows the user to skip the tutorial or prevent it from
 * showing up again in the future.
 */
const IntroModal = () => {
  const [open, setOpen] = useState(true);
  const [dontShow, setDontShow] = useState(false);
  const [step, setStep] = useState(0);

  // Check local storage to determine if the tutorial should be shown
  useEffect(() => {
    const show = localStorage.getItem('dontShowIntro') !== 'true';
    setOpen(show);
  }, []);

  // Closes the modal and optionally prevents it from showing again
  const handleClose = () => {
    if (dontShow) {
      localStorage.setItem('dontShowIntro', 'true');
    }
    setOpen(false);
  };

  // Advances to the next step in the tutorial
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Skips the tutorial and closes the modal
  const handleSkip = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="intro-modal-container">
        <LightbulbOutlinedIcon className="welcome-icon" fontSize="large" />
        {step === 0 && (
          <>
            <Typography className="intro-modal-header" component="h2">
              Welcome to the Sorting Algorithm Visualizer!
            </Typography>
            <Typography className="intro-modal-body">
              This tool allows you to visualize different sorting algorithms in action.
              Choose an algorithm, adjust the array size and speed, and watch as the bars are sorted in real-time.
            </Typography>
            <Button className="intro-modal-button" onClick={handleNextStep} variant="contained">
              Next
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <Typography className="intro-modal-header" component="h2">
              Control Panel Overview
            </Typography>
            <Typography className="intro-modal-body">
              Use the Control Panel to select the sorting algorithm, adjust the array size, and control the sorting speed.
            </Typography>
            <Button className="intro-modal-button" onClick={handleNextStep} variant="contained">
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Typography className="intro-modal-header" component="h2">
              Algorithm Information
            </Typography>
            <Typography className="intro-modal-body">
              Hover over any algorithm in the Control Panel to learn more about it, including its time complexity and use cases.
            </Typography>
            <Button className="intro-modal-button" onClick={handleClose} variant="contained">
              Finish
            </Button>
          </>
        )}
        <label className="intro-modal-checkbox-container">
          <Checkbox
            className="intro-modal-checkbox"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
          />
          <Typography variant="body2">Don't show this again</Typography>
        </label>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          You can reset this preference in the settings at any time.
        </Typography>
        <Button className="intro-modal-skip" onClick={handleSkip} variant="text">
          Skip Tutorial
        </Button>
      </Box>
    </Modal>
  );
};

export default IntroModal;
