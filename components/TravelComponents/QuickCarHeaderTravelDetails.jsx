import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import CalendarIcon from "../../icons/CalendarIcon";
import ClockIcon from "../../icons/ClockIcon";
import { useSelector } from "react-redux";
import SquarePlusIcon from "../../icons/SquarePlusIcon";

const QuickCarHeaderTravelDetails = () => {
  const tripOriginName = useSelector((state) => state.travel.tripOriginName);
  const tripDestinationName = useSelector(
    (state) => state.travel.tripDestinationName
  );
  const startTime = useSelector((state) => state.travel.startTime);
  const seatRequested = useSelector((state) => state.travel.seatRequested);

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
        marginTop: -2,
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
              fontSize: 14,
              fontFamily: "PlusJakartaSans-Regular",
              padding: 1,
              color: "#00000090",
              fontWeight: "800",
            }}
          >
            {tripOriginName.substr(0, 30)}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PlusJakartaSans-Regular",
              padding: 1,
              color: "#00000090",
              fontWeight: "800",
            }}
          >
            {tripDestinationName.substr(0, 30)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          paddingRight: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <ClockIcon height={22} width={22} color={"#000"}></ClockIcon>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PlusJakartaSans-Regular",
              marginLeft: 5,
              color: "#00000090",
              fontWeight: "800",
            }}
          >
            {startTime.hour + ":" + startTime.minutes}
            {startTime.hour > 11 ? " am" : " pm"}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <SquarePlusIcon
            color={"#000"}
            height={22}
            width={22}
          ></SquarePlusIcon>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "PlusJakartaSans-Regular",
              marginLeft: 5,
              color: "#00000090",
              fontWeight: "800",
            }}
          >
            {seatRequested} {seatRequested > 1 ? "asientos" : "asiento"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuickCarHeaderTravelDetails;
