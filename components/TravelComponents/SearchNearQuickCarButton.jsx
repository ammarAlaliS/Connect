import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { Animated } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  setIsInputActive,
  setPlacesSelected,
  setTripDestination,
  setTripDestinationName,
  setTripOrigin,
  setTripOriginName,
} from "../../globalState/travelSlice";

const SearchNearQuickCarButton = () => {
  const widthAnim = useRef(new Animated.Value(250)).current;

  const dispatch = useDispatch();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(widthAnim, {
        toValue: 250,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.delay(1000),
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [widthAnim]);

  const searchQuickCars = async () => {
    if (tripOriginLocation.latitude == 0 && tripOriginLocation.longitude == 0) {
      Alert.alert("Seleccione el origen");
      return;
    }

    try {
      const data = await fetch(
        "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/drivers-nearby-trip-filters?starLocationLatitude=" +
          tripOriginLocation.latitude +
          "&starLocationLongitude=" +
          tripOriginLocation.longitude +
          "&endLocationLatitude=" +
          tripDestinationLocation.latitude +
          "&endLocationLongitude=" +
          tripDestinationLocation.longitude +
          "&starTimeHour=" +
          startTime.hour +
          "&starTimeMinutes=" +
          startTime.minutes +
          "&numberOfSeatRequested=" +
          seatRequested
      ).then((res) => res.json());

      if (data && data.conductores && data.conductores[0]) {
        dispatch(setQuickarData(data.conductores));
      }
    } catch (error) {
      console.log("Ocurrio un error");
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        width: 48,
        height: 48,
        bottom: "5%",
        left: 20,
        zIndex: 101,
        backgroundColor: "#2b00b6",
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      onPress={() => {
        dispatch(setIsInputActive(true));
        dispatch(setTripOriginName(""));
        dispatch(setTripDestinationName(""));
        dispatch(setPlacesSelected(false));
        dispatch(setTripOrigin({ latitude: 0, longitude: 0 }));
        dispatch(setTripDestination({ latitude: 0, longitude: 0 }));
      }}
    >
      <FontAwesome
        name="search"
        size={24}
        color="#fff"
        style={{ marginBottom: 5 }}
      />
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: "#2b00b6",
            position: "absolute",
            top: 0,
            left: 25,
            zIndex: -1,
            borderColor: "#c3c3c3",
            borderStyle: "solid",
            justifyContent: "center",
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            alignItems: "flex-start",
            overflow: "hidden",
          },
          {
            width: widthAnim,
          },
        ]}
        className="d-flex"
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            marginLeft: 16,
            fontFamily: "PlusJakartaSans-SemiBold",
            lineHeight: 17,
            textAlign: "center",
            color: "#fff",
            width: 225,
          }}
        >
          Busca QuickCars en tu ubicacion
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SearchNearQuickCarButton;
