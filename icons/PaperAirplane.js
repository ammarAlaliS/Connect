import React from "react";
import { Path, Svg } from "react-native-svg";

const PaperAirplane = ({ width, height, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
    width={width}
    height={height}
    color={"#ffffff90"}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
    />
  </Svg>
);

export default PaperAirplane;
