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
import QuickCarsSearchesDetails from "./QuickCarsSearchesDetails";
import SearchNearQuickCarButton from "./SearchNearQuickCarButton";
import { io } from "socket.io-client";
import {
  setQuickarData,
  updateIndividualQuickCarLocations,
  updateAllQuickCarCurrentLocation,
  receiveDataFromQuickarSocketLocations,
  setRoomsJoined,
} from "../../globalState/travelSlice";

const API_BASE_URL = "https://obbaramarket-backend.onrender.com/";

const TravelHome = () => {
  const mapRef = useRef(null);

  const socket = useRef(null);

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

  // const polylineCoordinates = [
  //   { latitude: 40.479112, longitude: -3.573604 },
  //   { latitude: 40.472, longitude: -3.58 }, // Punto adicional
  //   { latitude: 40.47, longitude: -3.59 }, // Punto adicional
  //   { latitude: 40.474495, longitude: -3.639607 },
  // ];

  const dispatch = useDispatch();

  const animateToRegion = (region) => {
    if (mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
          pitch: 2,
          heading: 20,
          altitude: 200,
          zoom: 12,
        },
        { duration: 1000 }
      );
    }
  };

  useEffect(() => {
    console.log("La region esta cambiando");
    if (region && region.latitude && region.longitude) {
      animateToRegion(region);
    }
  }, [region]);

  useEffect(() => {
    if (tripOrigin.latitude != 0 && tripOrigin.longitude != 0) {
      animateToRegion(tripOrigin);
    }
  }, [tripOrigin]);

  useEffect(() => {
    if (tripDestination.latitude != 0 && tripDestination.longitude != 0) {
      animateToRegion(tripDestination);
    }
  }, [tripDestination]);

  const updateQuickCarData = (driverLocation) => {
    console.log("Se manda a llamar a la funcion");

    dispatch(
      receiveDataFromQuickarSocketLocations({
        id: quickCarsData.filter(
          (el) =>
            el.CurrentQuickCarLocation.longitude == driverLocation.longitude
        )[0].id,
        ...driverLocation,
      })
    );
  };

  const joinToCarRooms = () => {
    if (quickCarsData && quickCarsData.length > 0 && socket.current) {
      let roomsJoinedTemporal = [...roomsJoined];

      let quickCarDateFilter = quickCarsData.filter(
        (el) => roomsJoinedTemporal.filter((ell) => ell == el.id).length == 0
      );

      for (let i = 0; i < quickCarDateFilter.length; i++) {
        roomsJoinedTemporal.push(quickCarDateFilter[i].id);
        socket.current.emit("joinDriverRoom", quickCarDateFilter[i].id);
        console.log("Se unio a la sala" + quickCarDateFilter[i].id);
      }
      if (quickCarDateFilter.length > 0) {
        dispatch(setRoomsJoined(roomsJoinedTemporal));
      }
    }
  };

  useEffect(() => {
    socket.current = io(API_BASE_URL, {
      transports: ["websocket"],
    });

    socket.current.on("reciveDriverLocation", (driverLocation) => {
      console.log("Se reciben datos");
      console.log("yes");
      updateQuickCarData(driverLocation);
    });
    console.log("Mierdaa");

    // Clean up the socket connection on component unmount
    return () => {
      socket.current.off("reciveDriverLocation");
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    joinToCarRooms();
  }, [quickCarsData]);

  const emitToAllQuickCars = () => {
    if (quickCarsData && quickCarsData.length > 0 && socket.current) {
      setActiveSocket(activeSocket + 1);
      for (let i = 0; i < quickCarsData.length; i++) {
        let room = quickCarsData[i].id;
        let driverLocation = {
          latitude:
            quickCarsData[i].CurrentQuickCarLocation.latitude +
            new Date().getSeconds() * 0.0005,
          longitude: quickCarsData[i].CurrentQuickCarLocation.longitude,
        };
        socket.current.emit("sendDriverLocation", { room, driverLocation });
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(new Date().getSeconds());
      emitToAllQuickCars();
    }, 6000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      console.log("Interval cleared");
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Se pidio la actualizacion");
      dispatch(updateAllQuickCarCurrentLocation());
    }, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      console.log("Interval cleared update all quickcar locations");
    };
  }, []);

  return (
    <View>
      <SearchInput setMarker={setMarker}></SearchInput>
      {showQuickCarDetails && (
        <QuickCarsSearchesDetails
          setShowQuickCarDetails={setShowQuickCarDetails}
        ></QuickCarsSearchesDetails>
      )}

      {quickCarsData && quickCarsData.length > 0 && (
        <QuickCarDetailsButtom
          setShowQuickCarDetails={setShowQuickCarDetails}
        ></QuickCarDetailsButtom>
      )}
      <SearchNearQuickCarButton></SearchNearQuickCarButton>
      <MapView
        customMapStyle={
          // darkMode.darkMode ? stylesMap.mapStyleLight : stylesMap.mapStyle
          stylesMap.mapStyleLight
        }
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={{
          latitude: 40.355594,
          longitude: -3.702583,
          latitudeDelta: 0.1522,
          longitudeDelta: 0.221,
        }}
        ref={mapRef}
      >
        {marker && <Marker coordinate={marker} />}
        {!inputIsActive &&
          quickCarsData &&
          quickCarsData.length > 0 &&
          quickCarsData.map((item, index) => {
            return (
              <Marker coordinate={item.CurrentQuickCarLocation} key={index}>
                <Image
                  source={carImage}
                  style={{ height: 50, width: 20 }}
                  resizeMode="contain"
                ></Image>
              </Marker>
            );
          })}
        {!(tripOrigin.latitude == 0 && tripOrigin.longitude == 0) &&
          !(
            tripDestination.latitude == 0 && tripDestination.longitude == 0
          ) && (
            <Polyline
              coordinates={[
                {
                  latitude: tripOrigin.latitude,
                  longitude: tripOrigin.longitude,
                },
                {
                  latitude: tripDestination.latitude,
                  longitude: tripDestination.longitude,
                },
              ]}
              strokeColor="#2b00b6" // Color de la línea
              strokeWidth={6} // Ancho de la línea
            />
          )}
        {!(tripOrigin.latitude == 0 && tripOrigin.longitude == 0) && (
          <Marker
            coordinate={{
              latitude: tripOrigin.latitude,
              longitude: tripOrigin.longitude,
            }}
          >
            <Image
              source={originLocationImage}
              style={{ height: 60, width: 20 }}
              resizeMode="contain"
            ></Image>
          </Marker>
        )}
        {!(tripDestination.latitude == 0 && tripDestination.longitude == 0) && (
          <Marker
            coordinate={{
              latitude: tripDestination.latitude,
              longitude: tripDestination.longitude,
            }}
          >
            <Image
              source={destinationLocationImage}
              style={{ height: 60, width: 20 }}
              resizeMode="contain"
            ></Image>
          </Marker>
        )}
        {!(userLocation.latitude == 0 && userLocation.longitude == 0) && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
          >
            <Image
              source={userLocationImage}
              style={{ height: 70, width: 20 }}
              resizeMode="contain"
            ></Image>
          </Marker>
        )}
      </MapView>
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
