import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import stylesMap from "./MapViewStyles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import { selectTheme } from "../../globalState/themeSlice";
import { Image } from "react-native";
import carImage from "../../assets/car.png";
import QuickCarDetailsButtom from "./QuickCarDetailsButtom";
import QuickCarsSearchesDetails from "./QuickCarsSearchesDetails";
import SearchNearQuickCarButton from "./SearchNearQuickCarButton";
import { setMapRegion } from "../../globalState/travelSlice";
import { useMapRef } from "../../hooks/useMapRef";

const TravelHome = () => {
  // const [region, setMapRegion] = useState({
  //   latitude: 40.355594,
  //   longitude: -3.702583,
  //   latitudeDelta: 0.1522,
  //   longitudeDelta: 0.221,
  //   // latitude: 37.78825,
  //   // longitude: -122.4324,
  //   // latitudeDelta: 0.0922,
  //   // longitudeDelta: 0.0421,
  // });

  // const { mapRef, setMapRef, animateToRegion } = useMapRef();
  const mapRef = useRef(null);

  const [marker, setMarker] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showQuickCarDetails, setShowQuickCarDetails] = useState(false);
  const darkMode = useSelector(selectTheme);
  const placesSelected = useSelector((state) => state.travel.placesSelected);
  const quickCarsData = useSelector((state) => state.travel.quickCarsData);
  const region = useSelector((state) => state.travel.region);
  const tripOrigin = useSelector((state) => state.travel.tripOrigin);
  const tripDestination = useSelector((state) => state.travel.tripDestination);

  useEffect(() => {
    console.log("El componente esta enfocado");
    console.log(isFocused);
    console.log(!isFocused ?? 46);
  }, [isFocused]);

  const polylineCoordinates = [
    { latitude: 40.479112, longitude: -3.573604 },
    { latitude: 40.472, longitude: -3.58 }, // Punto adicional
    { latitude: 40.47, longitude: -3.59 }, // Punto adicional
    { latitude: 40.474495, longitude: -3.639607 },
  ];

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("La region esta cambiando");
  //   console.log(region);
  // }, [region]);

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
    if (region) {
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

  return (
    <View>
      <SearchInput setMarker={setMarker}></SearchInput>
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
        // region={region}
        // onRegionChangeComplete={(newRegion) => {
        //   console.log("Se esta intentando hacer el cambio");
        //   dispatch(setMapRegion(newRegion));
        // }}
        initialRegion={{
          latitude: 40.355594,
          longitude: -3.702583,
          latitudeDelta: 0.1522,
          longitudeDelta: 0.221,
        }}
        // showsUserLocation={true}
        ref={mapRef}
      >
        {marker && <Marker coordinate={marker} />}
        {quickCarsData &&
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
        {/* {placesSelected && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#2b00b6" // Color de la línea
            strokeWidth={6} // Ancho de la línea
          />
        )} */}
        {!(tripOrigin.latitude == 0 && tripOrigin.longitude == 0) && (
          <Marker
            coordinate={{
              latitude: tripOrigin.latitude,
              longitude: tripOrigin.longitude,
            }}
          ></Marker>
        )}
        {!(tripDestination.latitude == 0 && tripDestination.longitude == 0) && (
          <Marker
            coordinate={{
              latitude: tripDestination.latitude,
              longitude: tripDestination.longitude,
            }}
          ></Marker>
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
