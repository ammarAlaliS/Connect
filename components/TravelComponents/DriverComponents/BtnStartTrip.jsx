import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const BtnStartTrip = () => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: "5%",
        left: "7%",
        zIndex: 50,
        backgroundColor: "#00ff0090",
        borderRadius: 60,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 16,
        padding: 16,
        height: 60,
        width: 60,
      }}
      onPress={() => {
        // setShowPassengerSearchesDetails(true);
      }}
    >
      <FontAwesome name="play" size={25} color="#000" />
    </TouchableOpacity>
  );
};

export default BtnStartTrip;
