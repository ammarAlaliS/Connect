import { View } from "react-native";
import { Path, Svg } from "react-native-svg";

const ArrowRightHeroIcon = ({ width, height, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
    width={width}
    height={height}
    color={color}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </Svg>
);

export default ArrowRightHeroIcon;
