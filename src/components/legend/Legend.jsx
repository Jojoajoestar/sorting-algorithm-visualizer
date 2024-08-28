import React, { useState, useMemo } from "react";
import "./Legend.css";
import Colors from "../colors/Colors";
import { FaChevronUp, FaChevronDown } from "react-icons/fa"; // Importing icons

const Legend = ({ algorithm }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleLegend = () => {
    setIsExpanded(!isExpanded);
  };

  const legendItems = useMemo(() => {
    switch (algorithm) {
      case "Bubble Sort":
      case "Insertion Sort":
      case "Merge Sort":
      case "Quick Sort":
      case "Heap Sort":
      case "Tim Sort":
      case "Radix Sort":
        return [
          { color: Colors.default, text: "Unsorted" },
          { color: Colors.comparing, text: "Comparing" },
          { color: Colors.swapping, text: "Swapping" },
          { color: Colors.sorted, text: "Sorted" },
          { color: Colors.pivot, text: "Pivot" },
        ];
      default:
        return [];
    }
  }, [algorithm]);

  return (
    <div
      className={`legend ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={toggleLegend}
    >
      {isExpanded ? (
        <>
          <div className="legend-header">
            Legend
            <FaChevronUp className="legend-toggle-icon" /> {/* Minimize icon */}
          </div>
          <ul>
            {legendItems.map((item, index) => (
              <li key={index} className="legend-item">
                <div
                  className="color-box"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="legend-text">{item.text}</div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="legend-toggle">
          Legend
          <FaChevronDown className="legend-toggle-icon" /> {/* Expand icon */}
        </div>
      )}
    </div>
  );
};

export default Legend;
