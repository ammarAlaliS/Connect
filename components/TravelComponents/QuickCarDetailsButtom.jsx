import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setRoomsJoined } from "../../globalState/travelSlice";

const QuickCarDetailsButtom = ({ setShowQuickCarDetails }) => {
  const API_BASE_URL = "https://obbaramarket-backend.onrender.com/";
  const socket = io(API_BASE_URL, {
    transports: ["websocket"],
  });

  const quickCarsData = useSelector((state) => state.travel.quickCarsData);

  const emitToAllQuickCars = () => {
    if (quickCarsData && quickCarsData.length > 0) {
      for (let i = 0; i < quickCarsData.length; i++) {
        let room = quickCarsData[i].id;
        let driverLocation = {
          latitude:
            quickCarsData[i].CurrentQuickCarLocation.latitude +
            new Date().getSeconds() * 0.0005,
          longitude: quickCarsData[i].CurrentQuickCarLocation.longitude,
        };
        socket.emit("sendDriverLocation", { room, driverLocation });
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      emitToAllQuickCars();
    }, 6000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        width: 48,
        height: 48,
        bottom: "5%",
        right: 20,
        zIndex: 101,
        backgroundColor: "#ffbb1c",
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      onPress={() => {
        setShowQuickCarDetails(true);
      }}
    >
      <FontAwesome
        name="angle-up"
        size={44}
        color="#000"
        style={{ marginBottom: 5 }}
      />
    </TouchableOpacity>
  );
};

export default QuickCarDetailsButtom;
