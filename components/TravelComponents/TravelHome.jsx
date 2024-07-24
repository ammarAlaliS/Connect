import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import stylesMap from "./MapViewStyles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useEffect, useRef, useState } from "react";
import XMarkIcon from "../../icons/XMarkIcon";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import MapIcon from "../../icons/MapIcon";
import SearchInput from "./SearchInput";
import { setIsOriginAutoCompleteFocused } from "../../globalState/travelSlice";
import { selectTheme } from "../../globalState/themeSlice";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import carImage from "../../assets/car.png";
import QuickCarDetailsButtom from "./QuickCarDetailsButtom";
import { Modal } from "react-native";
import QuickCarsSearchesDetails from "./QuickCarsSearchesDetails";

const TravelHome = () => {
  const [region, setRegion] = useState({
    latitude: 40.355594,
    longitude: -3.702583,
    latitudeDelta: 0.1522,
    longitudeDelta: 0.221,
    // latitude: 37.78825,
    // longitude: -122.4324,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showQuickCarDetails, setShowQuickCarDetails] = useState(false);
  const darkMode = useSelector(selectTheme);
  const placesSelected = useSelector((state) => state.travel.placesSelected);

  useEffect(() => {
    console.log("El componente esta enfocado");
    console.log(isFocused);
    console.log(!isFocused ?? 46);
  }, [isFocused]);

  const listQuickCars = [
    { latitude: 40.474112, longitude: -3.573604 },
    { latitude: 40.468495, longitude: -3.639607 },
    { latitude: 40.426692, longitude: -3.645916 },
    { latitude: 40.335654, longitude: -3.602275 },
    { latitude: 40.381723, longitude: -3.635751 },
    { latitude: 40.394951, longitude: -3.759253 },
    { latitude: 40.394951, longitude: -3.759253 },
    { latitude: 40.43665, longitude: -3.663058 },
    { latitude: 40.453972, longitude: -3.720027 },
    { latitude: 40.492609, longitude: -3.686962 },
  ];

  const polylineCoordinates = [
    { latitude: 40.479112, longitude: -3.573604 },
    { latitude: 40.472, longitude: -3.58 }, // Punto adicional
    { latitude: 40.47, longitude: -3.59 }, // Punto adicional
    { latitude: 40.474495, longitude: -3.639607 },
  ];

  return (
    <View>
      <SearchInput setRegion={setRegion} setMarker={setMarker}></SearchInput>
      {showQuickCarDetails && (
        <QuickCarsSearchesDetails
          setShowQuickCarDetails={setShowQuickCarDetails}
        ></QuickCarsSearchesDetails>
      )}

      {placesSelected && (
        <QuickCarDetailsButtom
          setShowQuickCarDetails={setShowQuickCarDetails}
        ></QuickCarDetailsButtom>
      )}
      <MapView
        customMapStyle={
          // darkMode.darkMode ? stylesMap.mapStyleLight : stylesMap.mapStyle
          stylesMap.mapStyleLight
        }
        style={{
          width: "100%",
          height: "100%",
        }}
        region={region}
        // initialRegion={{
        //   latitude: 40.355594,
        //   longitude: -3.702583,
        //   latitudeDelta: 0.1522,
        //   longitudeDelta: 0.221,
        // }}
        // showsUserLocation={true}
      >
        {marker && <Marker coordinate={marker} />}
        {placesSelected &&
          listQuickCars.map((item, index) => {
            return (
              <Marker coordinate={item} key={index}>
                <Image
                  source={carImage}
                  style={{ height: 50, width: 20 }}
                  resizeMode="contain"
                ></Image>
              </Marker>
            );
          })}
        {placesSelected && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#2b00b6" // Color de la línea
            strokeWidth={6} // Ancho de la línea
          />
        )}
        {/* <Marker coordinate={polylineCoordinates[0]}></Marker>
        <Marker coordinate={polylineCoordinates[3]}></Marker> */}
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
