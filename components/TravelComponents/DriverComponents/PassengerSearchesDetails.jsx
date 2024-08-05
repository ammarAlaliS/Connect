import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import ArrowLeftIcon from "../../../icons/ArrowLeftIcon";

const PassengerSearchesDetails = ({ setShowPassengerSearchesDetails }) => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#f4f5f6",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 102,
      }}
    >
      <View
        style={{
          height: 54,
          backgroundColor: "#ffbb1c",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowPassengerSearchesDetails(false);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ArrowLeftIcon color={"#f4f5f6"} height={30} width={30}>
            {" "}
          </ArrowLeftIcon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "#000",
            fontFamily: "PlusJakartaSans-Bold",
          }}
        >
          Tus pasajeros
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: "#00000090",
            fontFamily: "PlusJakartaSans-SemiBold",
          }}
        >
          Aun no tienes ningun pasajeros
        </Text>
      </View>
    </View>
  );
};

export default PassengerSearchesDetails;
