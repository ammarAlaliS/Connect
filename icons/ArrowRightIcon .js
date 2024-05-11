import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowRightIcon = ({ width, height, color }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M17.25 8.25L21 12M21 12L17.25 15.75M21 12H3" />
    </Svg>
  );
};

export default ArrowRightIcon;
