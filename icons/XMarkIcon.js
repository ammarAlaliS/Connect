import React from "react";
import { Path, Svg } from "react-native-svg";

const XMarkIcon = ({ width, height, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    color={color}
    className="size-6"
    height={height}
    width={width}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
);

export default XMarkIcon;
