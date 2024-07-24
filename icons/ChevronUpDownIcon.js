import { Path, Svg } from "react-native-svg";

const ChevronUpDown = ({ height, width, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
    height={height}
    width={width}
    color={color}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
    />
  </Svg>
);

export default ChevronUpDown;
