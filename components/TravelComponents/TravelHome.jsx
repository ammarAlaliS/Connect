import {
  Alert,
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
import Icon from "react-native-vector-icons/FontAwesome";
import MapIcon from "../../icons/MapIcon";
import SearchInput from "./SearchInput";

const TravelHome = () => {
  const GOOGLE_PLACES_API_KEY = "AIzaSyAAwUd5bO7daxQUktwliIcG4YA8M5mWhrY";
  const showInitialCard = useSelector((state) => state.travel.showInitialCard);

  const refInputAutoComplete = useRef();

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

  const handleLocationSelect = (data, details) => {
    setIsFocused(true);
    const { lat, lng } = details.geometry.location;
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarker({
      latitude: lat,
      longitude: lng,
    });
  };

  useEffect(() => {
    console.log("El componente esta enfocado");
    console.log(isFocused);
    console.log(!isFocused ?? 46);
  }, [isFocused]);

  return (
    <View>
      {isFocused && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99,
            height: "100%",
            width: "100%",
            backgroundColor: "#00000050",
          }}
        >

        
        </View>
      )}

      {!showInitialCard && (
        <View
          style={{
            width: "85%",
            position: "absolute",
            top: "3%",
            left: 0,
            zIndex: 100,
            marginHorizontal: "7.5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: !isFocused ? "white" : "#f4f5f6",
              padding: 1,
              display: "flex",
              flexDirection: "row",
              borderWidth: 0.5,
              borderColor: "#000",
              borderStyle: "solid",
              borderRadius: 5,
            }}
          >
            {isFocused && (
              <View
                style={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingVertical: 13,
                  width: "10%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 18,
                    width: 18,
                    borderRadius: 9,
                    backgroundColor: "#2b00b6",
                  }}
                ></View>
                <View
                  style={{
                    flex: 1,
                    borderLeftWidth: 3,
                    borderColor: "#00000030",
                    borderStyle: "solid",
                    width: 1,
                  }}
                ></View>
                <View
                  style={{
                    height: 18,
                    width: 18,
                    borderRadius: 9,
                    backgroundColor: "#ffbb1c",
                  }}
                ></View>
              </View>
            )}
            <View
              style={
                isFocused
                  ? {
                      width: isFocused ? "90%" : "100%",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: 10,
                    }
                  : {
                      height: 46,
                      width: isFocused ? "90%" : "100%",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      paddingRight: 10,
                      // borderWidth: 0.5,
                      // borderColor: "#000",
                      // borderStyle: "solid",
                      // borderRadius: 5,
                    }
              }
              onTouchStart={() => {
                setIsFocused(true);
              }}
            >
              <View
                style={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <GooglePlacesAutocomplete
                  ref={refInputAutoComplete}
                  placeholder={
                    isFocused ? "Origen del viaje" : "Busca un QuickCar"
                  }
                  fetchDetails={true}
                  onPress={handleLocationSelect}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "es",
                    components: "country:es",
                  }}
                  styles={{
                    textInput: {
                      fontSize: 16,
                      textAlign: "left",
                      color: "black",
                      backgroundColor: !isFocused ? "white" : "#f4f5f6",
                    },
                    listView: styles.listView,
                  }}
                />
                {isFocused && (
                  <TouchableOpacity
                    style={{ marginTop: 9 }}
                    onPressOut={() => {
                      refInputAutoComplete.current.clear();
                      refInputAutoComplete.current.blur();
                      setIsFocused(false);
                    }}
                  >
                    <XMarkIcon
                      height={26}
                      width={26}
                      color={"#000"}
                    ></XMarkIcon>
                  </TouchableOpacity>
                )}
                {!isFocused && (
                  <TouchableOpacity
                    style={{
                      marginTop: 0,
                      // backgroundColor: "red",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      style={{ padding: 0 }}
                      name="search"
                      size={21}
                      color={"#00000050"}
                      onPress={() => {
                        //
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {isFocused && (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderColor: "#00000030",
                    borderStyle: "solid",
                  }}
                >
                  <TextInput
                    placeholder="Destino del viaje"
                    style={{ height: 46, paddingLeft: 10 }}
                  ></TextInput>
                  {isFocused && (
                    <TouchableOpacity
                      style={{ marginTop: 9 }}
                      // onPressOut={() => {
                      //   refInputAutoComplete.current.clear();
                      //   refInputAutoComplete.current.blur();
                      //   setIsFocused(false);
                      // }}
                    >
                      <XMarkIcon
                        height={26}
                        width={26}
                        color={"#000"}
                      ></XMarkIcon>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>

          {isFocused && (
            <View
              style={{
                backgroundColor: "#f4f5f6",
                marginTop: 40,
                height: 46,
                justifyContent: "space-between",
                paddingHorizontal: 10,
                borderRadius: 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MapIcon color={"#0000ff99"} height={25} width={30}></MapIcon>
              <TextInput
                style={{ width: "100%" }}
                placeholder="Fecha y Hora"
              ></TextInput>
            </View>
          )}
        </View>
      )}

      <MapView
        customMapStyle={stylesMap.mapStyleLight}
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
