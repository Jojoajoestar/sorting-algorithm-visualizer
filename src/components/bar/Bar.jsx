// src/components/bar/Bar.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Bar.css";

/**
 * Bar component represents a single element in the sorting visualization.
 * It adjusts its height based on the input value and changes color according to the sorting state.
 *
 * @param {number} length - The value that determines the height of the bar.
 * @param {string} color - The color of the bar, indicating its current sorting state.
 * @param {number} width - The width of the bar.
 * @param {number} speed - The speed of the sorting animation.
 * @param {number} navbarHeight - The height of the navbar, used to calculate available screen height.
 */
const Bar = ({ length, color, width, speed, navbarHeight }) => {
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight - navbarHeight);

    useEffect(() => {
        const handleResize = () => {
            setAvailableHeight(window.innerHeight - navbarHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navbarHeight]);

    const transitionDuration = `${200 / speed}ms`;

    const barStyle = {
        height: `${(length / 100) * availableHeight * 0.8}px`,
        width: `${width}px`,
        backgroundColor: color,
        transitionDuration,
        transform: "scale(1)",
        filter: "brightness(1)",
    };

    return (
        <div
            className="bar"
            style={barStyle}
            data-value={length}
            data-color={color}
            role="progressbar"
            aria-valuenow={length}
            aria-valuemin="0"
            aria-valuemax="100"
        ></div>
    );
};

Bar.propTypes = {
    length: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    navbarHeight: PropTypes.number.isRequired,
};

export default Bar;
