import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
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
  const darkMode = useSelector(selectTheme);

  useEffect(() => {
    console.log("El componente esta enfocado");
    console.log(isFocused);
    console.log(!isFocused ?? 46);
  }, [isFocused]);

  return (
    <View>
      <SearchInput setRegion={setRegion} setMarker={setMarker}></SearchInput>

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
        showsUserLocation={true}
      >
        {marker && <Marker coordinate={marker} />}
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
