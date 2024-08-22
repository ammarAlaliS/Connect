import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { selectTheme } from "../../globalState/themeSlice";
import QuickCarDetails from "./DriverComponents/QuickCarDetails";
import MapQuickCarDetails from "./DriverComponents/MapQuickCarDetails";
import { io } from "socket.io-client";

const IndividualQuickCarDetails = ({
  setShowQuickCarProfile,
  quickCarInfo,
}) => {
  const seatRequested = useSelector((state) => state.travel.seatRequested);
  const [showReviews, setShowReviews] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const darkMode = useSelector(selectTheme);
  const API_BASE_URL = "https://obbaramarket-backend.onrender.com/";
  const socket = io(API_BASE_URL, {
    transports: ["websocket"],
  });

  useEffect(() => {
    for (let room in socket.rooms) {
      if (room !== socket.id) {
        // Evitar dejar la sala predeterminada del propio socket
        socket.leave(room);
      }
    }

    socket.emit("joinDriverRoom", quickCarInfo.id);

    socket.on("reciveDriverLocation", (driverLocation) => {
      console.log("Se reciben datos");
      console.log("yes");
      // updateQuickCarData(driverLocation);
      //ESTO SE TIENE QUE OBTIMIZAR
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("reciveDriverLocation");
      socket.disconnect();
    };
  }, []);

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

          <QuickCarDetails
            showReviews={showReviews}
            quickCarInfo={quickCarInfo}
          ></QuickCarDetails>
        </ScrollView>
      )}

      {showMapView && (
        <MapQuickCarDetails quickCarInfo={quickCarInfo}></MapQuickCarDetails>
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
          onPressOut={() => {
            Alert.alert("Suscribiendose al viaje");
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
            Proponer Viaje
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IndividualQuickCarDetails;
