import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CalendarIcon from "../../icons/CalendarIcon";
import ClockIcon from "../../icons/ClockIcon";

const QuickCarHeaderTravelDetails = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#00000010",
        borderStyle: "solid",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <MaterialCommunityIcons
            name="arrow-up-down"
            size={20}
            color={"#2b00b6"}
          ></MaterialCommunityIcons>
        </View>
        <View>
          <Text
            style={{
              fontSize: 13.5,
              fontFamily: "PlusJakartaSans-Regular",
              padding: 1,
              color: "#00000090",
            }}
          >
            Barcelona Barcelona
          </Text>
          <Text
            style={{
              fontSize: 13.5,
              fontFamily: "PlusJakartaSans-Regular",
              padding: 1,
              color: "#00000090",
            }}
          >
            Madrid Madrid
          </Text>
        </View>
      </View>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
          }}
        >
          <CalendarIcon color={"#000"} height={22} width={22}></CalendarIcon>
          <Text
            style={{
              fontSize: 13.5,
              fontFamily: "PlusJakartaSans-Regular",
              marginLeft: 5,
              color: "#00000090",
            }}
          >
            15 de Julio 2024
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
          }}
        >
          <ClockIcon height={22} width={22} color={"#000"}></ClockIcon>
          <Text
            style={{
              fontSize: 13.5,
              fontFamily: "PlusJakartaSans-Regular",
              marginLeft: 5,
              color: "#00000090",
            }}
          >
            10:00 am
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuickCarHeaderTravelDetails;
