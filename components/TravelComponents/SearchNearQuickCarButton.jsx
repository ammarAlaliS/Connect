import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { Animated } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsInputActive,
  setPlacesSelected,
  setTripDestination,
  setTripDestinationName,
  setTripOrigin,
  setTripOriginName,
  setQuickarData,
  setMapRegion,
  setSeatRequested,
  setStartTime,
} from "../../globalState/travelSlice";
import useLocation from "../../hooks/useLocation";

const SearchNearQuickCarButton = () => {
  const widthAnim = useRef(new Animated.Value(250)).current;

  const dispatch = useDispatch();

  const showInitialCard = useSelector((state) => state.travel.showInitialCard);
  const isOriginAutoCompleteFocused = useSelector(
    (state) => state.travel.isOriginAutoCompleteFocused
  );
  const placesSelected = useSelector((state) => state.travel.placesSelected);
  const quickCarsData = useSelector((state) => state.travel.quickCarsData);
  const tripOrigin = useSelector((state) => state.travel.tripOrigin);
  const tripOriginName = useSelector((state) => state.travel.tripOriginName);
  const tripDestination = useSelector((state) => state.travel.tripDestination);
  const tripDestinationName = useSelector(
    (state) => state.travel.tripDestinationName
  );
  const quickCarsDistances = useSelector(
    (state) => state.travel.quickCarsDistances
  );
  const locationForegroundPermissions = useSelector(
    (state) => state.travel.locationForegroundPermissions
  );
  const userLocation = useSelector((state) => state.travel.userLocation);
  const startTime = useSelector((state) => state.travel.startTime);
  const seatRequested = useSelector((state) => state.travel.seatRequested);
  const inputIsActive = useSelector((state) => state.travel.inputIsActive);
  const region = useSelector((state) => state.travel.region);

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

  const { RequestLocationPermissions } = useLocation();

  const searchNearQuickCars = async () => {
    RequestLocationPermissions();

    dispatch(setIsInputActive(false));
    dispatch(setTripOriginName(""));
    dispatch(setTripDestinationName(""));
    dispatch(setPlacesSelected(false));
    dispatch(setTripOrigin({ latitude: 0, longitude: 0 }));
    dispatch(setTripDestination({ latitude: 0, longitude: 0 }));
    dispatch(setSeatRequested(0));
    dispatch(setStartTime({ hour: 0, minutes: 0 }));

    try {
      const data = await fetch(
        "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/drivers-nearby?userLatitude=" +
          40.391275 +
          "&userLongitude=" +
          -3.739357
      ).then((res) => res.json());

      if (data && data.conductores && data.conductores[0]) {
        dispatch(setQuickarData(data.conductores));

        dispatch(
          setMapRegion({
            latitude: 40.391275,
            latitudeDelta: 0.2022,
            longitude: -3.739357,
            longitudeDelta: 0.2021,
          })
        );
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
        searchNearQuickCars();
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
