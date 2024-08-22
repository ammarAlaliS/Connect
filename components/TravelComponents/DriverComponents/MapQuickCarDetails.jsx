import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import stylesMap from "../MapViewStyles";
import { useEffect, useRef } from "react";
import { selectTheme } from "../../../globalState/themeSlice";
import { Image } from "react-native";
import originLocationImage from "../../../assets/originLocationIcon.png";
import destinationLocationImage from "../../../assets/destinationLocationIcon.png";
import userLocationImage from "../../../assets/userLocationIcon.png";
import car from "../../../assets/car.png";

const MapQuickCarDetails = ({ quickCarInfo }) => {
  const darkMode = useSelector(selectTheme);
  const mapRef = useRef(null);
  const tripOriginLocation = useSelector((state) => state.travel.tripOrigin);
  const tripDestinationLocation = useSelector(
    (state) => state.travel.tripDestination
  );
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
      <Marker
        coordinate={{
          latitude: tripOriginLocation.latitude,
          longitude: tripOriginLocation.longitude,
        }}
      >
        <Image
          source={userLocationImage}
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
      </Marker>

      <Marker
        coordinate={{
          latitude: quickCarInfo.CurrentQuickCarLocation.latitude,
          longitude: quickCarInfo.CurrentQuickCarLocation.longitude,
        }}
      >
        <Image
          source={car}
          style={{ height: 60, width: 20 }}
          resizeMode="contain"
        ></Image>
      </Marker>

      {!(
        tripDestinationLocation.latitude == 0 &&
        tripDestinationLocation.longitude == 0
      ) &&
        !(
          tripOriginLocation.latitude == 0 && tripOriginLocation.longitude == 0
        ) && (
          <Polyline
            coordinates={[
              {
                latitude: tripOriginLocation.latitude,
                longitude: tripOriginLocation.longitude,
              },
              {
                latitude: tripDestinationLocation.latitude,
                longitude: tripDestinationLocation.longitude,
              },
            ]}
            strokeColor="#2b00b6" // Color de la línea
            strokeWidth={6} // Ancho de la línea
            lineDashPattern={[2, 5]}
          />
        )}

      <Marker
        coordinate={{
          latitude: quickCarInfo.starLocation.latitude,
          longitude: quickCarInfo.starLocation.longitude,
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
          latitude: quickCarInfo.endLocation.latitude,
          longitude: quickCarInfo.endLocation.longitude,
        }}
      >
        <Image
          source={destinationLocationImage}
          style={{ height: 60, width: 20 }}
          resizeMode="contain"
        ></Image>
      </Marker>

      <Polyline
        coordinates={[
          {
            latitude: quickCarInfo.starLocation.latitude,
            longitude: quickCarInfo.starLocation.longitude,
          },
          {
            latitude: quickCarInfo.endLocation.latitude,
            longitude: quickCarInfo.endLocation.longitude,
          },
        ]}
        strokeColor="#2b00b6" // Color de la línea
        strokeWidth={6} // Ancho de la línea
      />
    </MapView>
  );
};

export default MapQuickCarDetails;
