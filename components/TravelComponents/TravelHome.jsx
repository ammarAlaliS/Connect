import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import stylesMap from "./MapViewStyles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import { selectTheme } from "../../globalState/themeSlice";
import { Image } from "react-native";
import carImage from "../../assets/car.png";
import userLocationImage from "../../assets/userLocationIcon.png";
import destinationLocationImage from "../../assets/destinationLocationIcon.png";
import originLocationImage from "../../assets/originLocationIcon.png";
import QuickCarDetailsButtom from "./QuickCarDetailsButtom";
// import QuickCarsSearchesDetails from "./QuickCarsSearchesDetails";
import SearchNearQuickCarButton from "./SearchNearQuickCarButton";
import { io } from "socket.io-client";
import {
  setQuickarData,
  updateIndividualQuickCarLocations,
  updateAllQuickCarCurrentLocation,
  receiveDataFromQuickarSocketLocations,
  setRoomsJoined,
} from "../../globalState/travelSlice";
import PassengersDetailsButtom from "./DriverComponents/PassengersDetailsButtom";
import PassengerSearchesDetails from "./DriverComponents/PassengerSearchesDetails";
import BtnStartTrip from "./DriverComponents/BtnStartTrip";
import { Text } from "react-native";

const API_BASE_URL = "https://obbaramarket-backend.onrender.com/";

const TravelHome = () => {
  const mapRef = useRef(null);

  const socket = io(API_BASE_URL, {
    transports: ["websocket"],
  });

  const [marker, setMarker] = useState(null);
  const [activeSocket, setActiveSocket] = useState(0);
  // const [isFocused, setIsFocused] = useState(false);
  const [showQuickCarDetails, setShowQuickCarDetails] = useState(false);
  const darkMode = useSelector(selectTheme);
  const placesSelected = useSelector((state) => state.travel.placesSelected);
  const quickCarsData = useSelector((state) => state.travel.quickCarsData);
  const region = useSelector((state) => state.travel.region);
  const tripOrigin = useSelector((state) => state.travel.tripOrigin);
  const tripDestination = useSelector((state) => state.travel.tripDestination);
  const userLocation = useSelector((state) => state.travel.userLocation);
  const inputIsActive = useSelector((state) => state.travel.inputIsActive);
  const roomsJoined = useSelector((state) => state.travel.roomsJoined);

  const [showPassengerSearchesDetails, setShowPassengerSearchesDetails] =
    useState(false);

  const dispatch = useDispatch();

  const userType = useSelector((state) => state.travel.userType);

  return (
    <View>
      {quickCarsData && quickCarsData.length > 0 && (
        <QuickCarDetailsButtom
          setShowQuickCarDetails={setShowQuickCarDetails}
        ></QuickCarDetailsButtom>
      )}
      {userType == "passenger" && (
        <SearchNearQuickCarButton></SearchNearQuickCarButton>
      )}

      {userType == "driver" && (
        <PassengersDetailsButtom
          setShowPassengerSearchesDetails={setShowPassengerSearchesDetails}
        ></PassengersDetailsButtom>
      )}

      {userType == "driver" && showPassengerSearchesDetails && (
        <PassengerSearchesDetails
          setShowPassengerSearchesDetails={setShowPassengerSearchesDetails}
        ></PassengerSearchesDetails>
      )}

      {placesSelected && <BtnStartTrip></BtnStartTrip>}

      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#c3c3c3" }}
      >
        <Text>Inciando remodelacion de interfaz de chofer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  autocompleteContainer: {
    // height: 44,
    // position: "absolute",
    // top: 10,
    // left: 10,
    // right: 10,
  },
  listView: {
    backgroundColor: "white",
  },
});

export default TravelHome;

//Documentacion del input de autocomplete
//https://www.npmjs.com/package/react-native-google-places-autocomplete
