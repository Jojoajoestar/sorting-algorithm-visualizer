import React, { useState } from "react";
import AlgorithmInfo from "./AlgorithmInfo";
import Pseudocode from "../pseudocode/Pseudocode";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import "./InfoSection.css";

/**
 * InfoSection Component
 *
 * This component displays sections for algorithm information and pseudocode.
 * Each section can be toggled to show or hide its content.
 *
 * Props:
 * - algorithm (string): The name of the algorithm to display information and pseudocode for.
 * - currentLine (number): The current line of pseudocode to highlight.
 */
const InfoSection = ({ algorithm, currentLine }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showPseudocode, setShowPseudocode] = useState(true);

  // Toggles visibility of the algorithm information section
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Toggles visibility of the pseudocode section
  const togglePseudocode = () => {
    setShowPseudocode(!showPseudocode);
  };

  return (
    <div className="info-section">
      {/* Section for algorithm information */}
      <div className={`info-header ${showInfo ? "open" : ""}`} onClick={toggleInfo}>
        <div>
          <InfoIcon className="info-header-icon" /> {algorithm} Information
        </div>
        {showInfo ? "▼" : "▲"}
      </div>
      <div className={`info-content ${showInfo ? "show" : ""}`}>
        <AlgorithmInfo algorithm={algorithm} />
      </div>

      {/* Section for pseudocode display */}
      <div className={`info-header ${showPseudocode ? "open" : ""}`} onClick={togglePseudocode}>
        <div>
          <CodeIcon className="info-header-icon" /> Pseudocode
        </div>
        {showPseudocode ? "▼" : "▲"}
      </div>
      <div className={`info-content ${showPseudocode ? "show" : ""}`}>
        <Pseudocode algorithm={algorithm} currentLine={currentLine} />
      </div>
    </div>
  );
};

export default InfoSection;
