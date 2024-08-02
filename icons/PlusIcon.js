import { Path, Svg } from "react-native-svg";

const PlusIcon = ({ width, height, color, strokeWidth, onPressOut }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    className="size-6"
    color={color}
    width={width}
    height={height}
    onPressOut={onPressOut}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </Svg>
);

export default PlusIcon;
