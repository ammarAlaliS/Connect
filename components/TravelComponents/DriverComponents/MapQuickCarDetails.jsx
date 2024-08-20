import MapView from "react-native-maps";
import { useSelector } from "react-redux";
import stylesMap from "../MapViewStyles";
import { useEffect, useRef } from "react";
import { selectTheme } from "../../../globalState/themeSlice";
import { Marker } from "react-native-svg";
import { Image } from "react-native";
import originLocationImage from "../../../assets/originLocationIcon.png";
import destinationLocationImage from "../../../assets/destinationLocationIcon.png";

const MapQuickCarDetails = ({ quickCarInfo }) => {
  const darkMode = useSelector(selectTheme);
  const mapRef = useRef(null);
  const tripOriginLocation = useSelector((state) => state.travel.tripOrigin);
  const tripDestinationLocation = useSelector(
    (state) => state.travel.tripDestination
  );
  useEffect(() => {}, []);
  return (
    <MapView
      customMapStyle={
        darkMode.text != "#fff" ? stylesMap.mapStyleLight : stylesMap.mapStyle
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
      {/* <Marker
        coordinate={{
          latitude: tripOriginLocation.latitude,
          longitude: tripOriginLocation.longitude,
        }}
      >
        <Image
          source={originLocationImage}
          style={{ height: 60, width: 20 }}
          resizeMode="contain"
        ></Image>
      </Marker>

      <Marker
        coordinate={{
          latitude: tripDestinationLocation.latitude,
          longitude: tripDestinationLocation.longitude,
        }}
      >
        <Image
          source={destinationLocationImage}
          style={{ height: 60, width: 20 }}
          resizeMode="contain"
        ></Image>
      </Marker> */}
    </MapView>
  );
};

export default MapQuickCarDetails;
