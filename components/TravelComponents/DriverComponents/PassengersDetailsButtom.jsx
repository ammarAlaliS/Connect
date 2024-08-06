import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const PassengersDetailsButtom = ({ setShowPassengerSearchesDetails }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: "5%",
        right: "35%",
        zIndex: 50,
        backgroundColor: "#ffbb1c",
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 10,
        width: "30%",
        paddingBottom: 16,
      }}
      onPress={() => {
        setShowPassengerSearchesDetails(true);
      }}
    >
      <FontAwesome name="angle-up" size={35} color="#000" />
      <Text
        style={{
          fontSize: 17,
          fontFamily: "PlusJakartaSans-Regular",
          position: "absolute",
          bottom: 3,
          width: "100%",
          textAlign: "center",
        }}
      >
        Pasajeros
      </Text>
    </TouchableOpacity>
  );
};

export default PassengersDetailsButtom;
