import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MyIcon = ({ width, height, color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6 18 18 6M6 6l12 12" stroke={color} />
    </Svg>
  );
};

export default MyIcon;
