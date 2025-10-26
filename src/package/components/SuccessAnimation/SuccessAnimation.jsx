import React from 'react';
import './SuccessAnimation.scss';

const SuccessAnimation = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Success-Animation"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 400 400"
      style={{ whiteSpace: 'pre' }}>
      <g id="Circle" transform="translate(200,200) translate(-30.765,-23.931)">
        <g id="Ellipse-1" opacity="1" transform="translate(30.765,23.931)">
          <path
            id="Ellipse-Path-1"
            fill="none"
            d="M0,-159.466C88.0709,-159.466,159.466,-88.0709,159.466,0C159.466,88.0709,88.0709,159.466,0,159.466C-88.0709,159.466,-159.466,88.0709,-159.466,0C-159.466,-88.0709,-88.0709,-159.466,0,-159.466Z"
            stroke="#01db9c"
            strokeOpacity="1"
            strokeWidth="50"
            strokeMiterlimit="4"
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeDasharray="1001.7"
            strokeDashoffset="-1001.7"
            style={{
              animation:
                '1s linear both Ellipse-Path-1_sw, 1s linear both Ellipse-Path-1_do',
            }}
          />
        </g>
      </g>
      <g
        id="Success_Tick"
        visibility="hidden"
        transform="translate(205.75,194.75) translate(-29,36)"
        style={{ animation: '1s linear forwards Success_Tick_v' }}>
        <g id="Shape-1" opacity="1">
          <path
            id="Path-1"
            fill="none"
            d="M-48,-34C-48,-34,2,16,2,16C2,16,94.5,-77.5,94.5,-77.5"
            stroke="#01db9c"
            strokeOpacity="1"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="202.234"
            strokeDashoffset="-202.234"
            style={{
              animation: '1s linear both Path-1_sw, 1s linear both Path-1_do',
            }}
          />
        </g>
      </g>
    </svg>
  );
};

export default SuccessAnimation;
