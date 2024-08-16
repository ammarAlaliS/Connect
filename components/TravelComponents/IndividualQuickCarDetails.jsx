import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import stylesMap from "./MapViewStyles";
import { selectTheme } from "../../globalState/themeSlice";
import { Marker } from "react-native-svg";
import MapView from "react-native-maps";

const IndividualQuickCarDetails = ({
  setShowQuickCarProfile,
  quickCarInfo,
}) => {
  const seatRequested = useSelector((state) => state.travel.seatRequested);
  const [showReviews, setShowReviews] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const darkMode = useSelector(selectTheme);
  const mapRef = useRef(null);
  return (
    <View
      style={{
        backgroundColor: "#f4f5f6",
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 100,
      }}
    >
      <View
        style={{
          height: 54,
          backgroundColor: "#2b00b6",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (showMapView) {
              setShowMapView(false);
            } else {
              setShowQuickCarProfile(false);
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ArrowLeftIcon color={"#f4f5f6"} height={30} width={30}>
            {" "}
          </ArrowLeftIcon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            fontFamily: "PlusJakartaSans-Bold",
          }}
        >
          {showMapView ? "Mapa" : "Perfil del QuickCar"}
        </Text>
      </View>

      {!showMapView && (
        <ScrollView
          style={{ width: "100%", flex: 1, marginTop: 20 }}
          stickyHeaderIndices={[0]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#f4f5f6",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "flex-start",
                paddingLeft: 20,
              }}
            >
              <Image
                source={{
                  uri: quickCarInfo.user?.driverImage
                    ? quickCarInfo.user?.driverImage
                    : "https://www.shutterstock.com/image-photo/closeup-portrait-happy-indian-young-600nw-2278702239.jpg",
                }}
                style={{
                  height: 105,
                  width: 105,
                  borderRadius: 50,
                  margin: 15,
                  marginBottom: 5,
                }}
              ></Image>

              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "PlusJakartaSans-Bold",
                  }}
                >
                  {quickCarInfo.user?.name + " " + quickCarInfo.user?.lastName}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                      <FontAwesome
                        key={item}
                        name="star"
                        size={12}
                        color={"#ffbb1c"}
                        style={{ marginRight: 2 }}
                      ></FontAwesome>
                    );
                  })}

                  <Text
                    style={{
                      fontSize: 13,
                      color: "#00000090",
                      marginLeft: 10,
                    }}
                  >
                    24 Reseñas
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 20,
              paddingBottom: 0,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                width: "40%",
                height: "100%",
                borderBottomWidth: !showReviews ? 4 : 0,
                borderColor: "#2b00b6",
                borderStyle: "solid",
                alignItems: "center",
              }}
              onPressOut={() => {
                setShowReviews(false);
              }}
            >
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: "PlusJakartaSans-Bold",
                  fontSize: 15,
                  color: "#2b00b6",
                }}
              >
                Sobre el conductor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "40%",
                height: "100%",
                alignItems: "center",
                borderBottomWidth: showReviews ? 4 : 0,
                borderColor: "#2b00b6",
                borderStyle: "solid",
                alignItems: "center",
              }}
              onPressOut={() => {
                setShowReviews(true);
              }}
            >
              <Text
                style={{
                  marginBottom: 10,
                  fontFamily: "PlusJakartaSans-SemiBold",
                  fontSize: 15,
                  color: "#000",
                }}
              >
                Reseñas
              </Text>
            </TouchableOpacity>
          </View>

          {/* Primer linea divisora */}
          <View
            style={{
              width: "100%",
              height: 0,
              borderColor: "#c3c3c3",
              borderWidth: 1.5,
              borderStyle: "solid",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4,
            }}
          ></View>

          {!showReviews && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
                alignItems: "center",
              }}
            >
              <Text
                style={{ marginBottom: 10, color: "#00000090", fontSize: 14 }}
              >
                Origen / Destino
              </Text>
              <TouchableOpacity
                onPressOut={() => {
                  setShowMapView(true);
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    fontFamily: "PlusJakartaSans-Bold",
                    fontSize: 15,
                    color: "#2b00b6",
                  }}
                >
                  Ver en el mapa
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!showReviews && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: 43,
                  paddingVertical: 5,
                  marginRight: 43,
                }}
              >
                <View
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: "#2b00b6",
                    borderRadius: 10,
                  }}
                ></View>
                <View
                  style={{
                    flex: 1,
                    width: 0,
                    borderWidth: 0.5,
                    borderColor: "#00000090",
                    borderStyle: "dashed",
                  }}
                ></View>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: "#ffbb1c",
                    borderRadius: 10,
                  }}
                ></View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13.5,
                    fontFamily: "PlusJakartaSans-Regular",
                    padding: 1,
                    color: "#00000090",
                  }}
                >
                  {quickCarInfo.starLocation.startLocationName}
                </Text>
                <Text
                  style={{
                    fontSize: 13.5,
                    fontFamily: "PlusJakartaSans-Regular",
                    padding: 1,
                    color: "#00000090",
                  }}
                >
                  {quickCarInfo.endLocation.endLocationName}
                </Text>
              </View>
            </View>
          )}

          {/* Horarios */}

          {!showReviews && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                width: "100%",
                marginBottom: 15,
              }}
            >
              <View style={{ width: "33%" }}>
                <Text style={{ color: "#00000090", textAlign: "center" }}>
                  Salida
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
                    fontSize: 15,
                    color: "#2b00b6",
                    textAlign: "center",
                  }}
                >
                  {quickCarInfo.startTime.hour +
                    ": " +
                    (quickCarInfo.startTime.minute == 0
                      ? "00"
                      : quickCarInfo.startTime.minute)}{" "}
                  {quickCarInfo.startTime.hour > 11 ? " pm" : " am"}
                </Text>
              </View>
              <View style={{ width: "34%" }}>
                <Text style={{ color: "#00000090", textAlign: "center" }}>
                  Llegada
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
                    fontSize: 15,
                    color: "#2b00b6",
                    textAlign: "center",
                  }}
                >
                  {quickCarInfo.endTime.hour +
                    ": " +
                    (quickCarInfo.endTime.minute == 0
                      ? "00"
                      : quickCarInfo.endTime.minute)}{" "}
                  {quickCarInfo.endTime.hour > 11 ? " pm" : " am"}
                </Text>
              </View>
              <View style={{ width: "33%" }}>
                <Text style={{ color: "#00000090", textAlign: "center" }}>
                  Tipo de Vehiculo
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
                    fontSize: 15,
                    color: "#2b00b6",
                    textAlign: "center",
                  }}
                >
                  {quickCarInfo.vehicleModel}
                </Text>
              </View>
            </View>
          )}

          {/*Segunda linea divisoria  */}
          {!showReviews && (
            <View
              style={{
                width: "100%",
                height: 0,
                borderColor: "#c3c3c3",
                borderWidth: 1.5,
                borderStyle: "solid",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
              }}
            ></View>
          )}

          {/*Detalles de los asientos  */}

          {!showReviews && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 15,
                width: "100%",
                marginBottom: 15,
              }}
            >
              <View style={{ width: "50%" }}>
                <Text style={{ color: "#00000090", textAlign: "center" }}>
                  Asientos libres
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
                    fontSize: 15,
                    color: "#2b00b6",
                    textAlign: "center",
                  }}
                >
                  {quickCarInfo.availableSeats} asientos
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ color: "#00000090", textAlign: "center" }}>
                  Precio por asiento
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans-Bold",
                    fontSize: 15,
                    color: "#2b00b6",
                    textAlign: "center",
                  }}
                >
                  $ {quickCarInfo.pricePerSeat}
                </Text>
              </View>
            </View>
          )}

          {/*Tercer linea divisoria  */}
          {!showReviews && (
            <View
              style={{
                width: "100%",
                height: 0,
                borderColor: "#c3c3c3",
                borderWidth: 1.5,
                borderStyle: "solid",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 4,
              }}
            ></View>
          )}

          {!showReviews && (
            <Text
              style={{
                marginTop: 15,
                color: "#00000090",
                marginLeft: "8.75%",
                marginBottom: 10,
              }}
            >
              Dias regulares
            </Text>
          )}

          {!showReviews && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: 100,
                flexWrap: "wrap",
              }}
            >
              {quickCarInfo.regularDays.map((item, index) => {
                return (
                  <View
                    style={{
                      width: "50%",
                      height: 30,
                      alignItems: "flex-start",
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        marginLeft: "35%",
                        textAlign: "left",
                        fontFamily: "PlusJakartaSans-SemiBold",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
          {showReviews &&
            [1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 15,
                    }}
                  >
                    {[1, 2, 3, 4].map((subItem, subindex) => {
                      return (
                        <FontAwesome
                          key={subindex}
                          name="star"
                          size={13}
                          color={"#555555"}
                          style={{ marginRight: 2 }}
                        ></FontAwesome>
                      );
                    })}
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans-Bold",
                        marginLeft: 5,
                      }}
                    >
                      Roberto Carlos
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", marginBottom: 10 }}>
                    <Image
                      source={{
                        uri: "https://www.shutterstock.com/image-photo/closeup-portrait-happy-indian-young-600nw-2278702239.jpg",
                      }}
                      style={{
                        height: 65,
                        width: 65,
                        borderRadius: 15,
                        marginTop: 5,
                        margin: 15,
                        marginBottom: 5,
                      }}
                    ></Image>
                    <Text
                      style={{
                        width: "70%",
                        textAlign: "justify",
                        fontFamily: "PlusJakartaSans-Regular",
                        fontSize: 13,
                      }}
                    >
                      Muy buen servicio, 10 de 10 Muy buen servicio, 10 de 10
                      Muy buen servicio, 10 de 10 Muy buen servicio, 10 de 10
                      buen servicio, 10 de 10 Muy buen servicio, 10 de 10
                    </Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
      {showMapView && (
        <View style={{ flex: 1, backgroundColor: "red" }}>
          <MapView
            customMapStyle={
              darkMode.text != "#fff"
                ? stylesMap.mapStyleLight
                : stylesMap.mapStyle
              // stylesMap.mapStyleLight
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
            {/* {marker && <Marker coordinate={marker} />} */}
            {/* {!inputIsActive &&
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
          })} */}
            {/* {!(tripOrigin.latitude == 0 && tripOrigin.longitude == 0) &&
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
          )} */}
            {/* {(placesSelected || (!placesSelected && inputIsActive)) &&
          !(tripOrigin.latitude == 0 && tripOrigin.longitude == 0) && (
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
          )} */}
            {/* {(placesSelected || (!placesSelected && inputIsActive)) &&
          !(
            tripDestination.latitude == 0 && tripDestination.longitude == 0
          ) && (
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
          )} */}
            {/* {!(userLocation.latitude == 0 && userLocation.longitude == 0) && (
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
        )} */}
          </MapView>
        </View>
      )}

      {/*Cuarta linea divisoria  */}
      <View
        style={{
          width: "100%",
          height: 0,
          borderColor: "#c3c3c3",
          borderWidth: 1.5,
          borderStyle: "solid",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        }}
      ></View>

      <View
        style={{
          backgroundColor: "#c3c3c380",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          paddingVertical: 15,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: 45,
            justifyContent: "center",
            backgroundColor: "#f4f5f6",
            width: "47%",
            borderRadius: 10,
            borderColor: "#c3c3c3",
            borderWidth: 1.5,
            borderStyle: "solid",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
          onPressOut={() => {
            setShowQuickCarProfile(false);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PlusJakartaSans-Bold",
              fontSize: 15,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 45,
            justifyContent: "center",
            backgroundColor: "#2b00b6",
            width: "47%",
            borderRadius: 10,
            borderColor: "#c3c3c3",
            borderWidth: 1.5,
            borderStyle: "solid",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PlusJakartaSans-Bold",
              fontSize: 15,
              color: "white",
            }}
          >
            {seatRequested == 0 ? "Proponer Viaje" : "Suscribirse al viaje"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IndividualQuickCarDetails;
