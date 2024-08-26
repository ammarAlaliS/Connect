import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, SafeAreaView, Text, View } from "react-native";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import QuickCarHeaderTravelDetails from "../components/TravelComponents/QuickCarHeaderTravelDetails";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import { setQuickCarsDistances } from "../globalState/travelSlice";
import IndividualQuickCarDetails from "../components/TravelComponents/IndividualQuickCarDetails";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { selectTheme } from "../globalState/themeSlice";

const QuickCarsSearchesDetails = ({ route }) => {
  const quickCarsData = useSelector((state) => state.travel.quickCarsData);

  const tripOriginLocation = useSelector((state) => state.travel.tripOrigin);
  const tripDestinationLocation = useSelector(
    (state) => state.travel.tripDestination
  );
  const userLocation = useSelector((state) => state.travel.userLocation);
  const quickCarsDistances = useSelector(
    (state) => state.travel.quickCarsDistances
  );

  const startLocationName = useSelector(
    (state) => state.trip.startLocation.name
  );

  const endLocationName = useSelector((state) => state.trip.endLocation.name);

  const seatRequested = useSelector((state) => state.travel.seatRequested);
  const darkMode = useSelector(selectTheme);

  const [showQuickCarProfile, setShowQuickCarProfile] = useState(false);
  const [quickCarIndex, setQuickCarIndex] = useState(0);

  const dispatch = useDispatch();

  const { RequestLocationPermissions } = useLocation();

  useEffect(() => {
    RequestLocationPermissions();
  }, []);

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function calculateDistance(lat1, lon1, loc2) {
    const lat2 = loc2.latitude;
    const lon2 = loc2.longitude;

    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100;
  }

  useEffect(() => {
    let quickCarsDistances = [];

    if (quickCarsData && quickCarsData.length > 0) {
      for (let i = 0; i < quickCarsData.length; i++) {
        let quickCarDistance = {
          quickCarId: "",
          toOriginDistance: 0,
          toUserDistance: 0,
        };

        quickCarDistance.quickCarId = quickCarsData[i].id;

        quickCarDistance.toOriginDistance = calculateDistance(
          tripOriginLocation.latitude,
          tripOriginLocation.longitude,
          quickCarsData[i].CurrentQuickCarLocation
        );

        if (!(userLocation.latitude == 0 && userLocation.longitude == 0)) {
          quickCarDistance.toUserDistance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            quickCarsData[i].CurrentQuickCarLocation
          );
        } else {
          quickCarDistance.toUserDistance = -1;
        }

        quickCarsDistances.push(quickCarDistance);
      }
      dispatch(setQuickCarsDistances(quickCarsDistances));
    }
  }, [quickCarsData, tripOriginLocation, userLocation]);

  const params = route.params || {};

  const { thereIsData } = params;
  const navigation = useNavigation();
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkMode.backgroundDark,
        marginTop: statusBarHeight,
        // position: "absolute",
        // top: 0,
        // left: 0,
        // zIndex: 102,
      }}
    >
      {showQuickCarProfile && (
        <IndividualQuickCarDetails
          setShowQuickCarProfile={setShowQuickCarProfile}
          quickCarInfo={quickCarsData[quickCarIndex]}
          darkMode={darkMode}
        ></IndividualQuickCarDetails>
      )}
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: darkMode.background,
          borderBottomWidth: 1,
          borderColor: darkMode.contentMessageBorderColor,
        }}
        className=" flex-row items-center space-x-[10]"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            backgroundColor: darkMode.backgroundDark,
            width: 40,
            height: 40,
            borderWidth: 1,
            borderColor: darkMode.borderBox,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="keyboard-return"
            size={24}
            color={darkMode.text}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: darkMode.backgroundDark,
            flex: 1,
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: darkMode.contentMessageBorderColor,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "PlusJakartaSans-ExtraBold",
                color: darkMode.headerIconColor,
              }}
            >
              Punto de Inicio:{" "}
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "PlusJakartaSans-Bold",
                  color: darkMode.text,
                }}
              >
                {startLocationName}
              </Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "PlusJakartaSans-ExtraBold",
                color: darkMode.headerIconColor,
              }}
            >
              Destino:{" "}
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "PlusJakartaSans-Bold",
                  color: darkMode.text,
                }}
              >
                {endLocationName}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {seatRequested > 0 && <QuickCarHeaderTravelDetails darkMode={darkMode} />}
      {!quickCarsData && (
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            marginVertical: 10,
            fontFamily: "PlusJakartaSans-Bold",
            fontSize: 20,
          }}
        >
          No se encontraron QuickCars
        </Text>
      )}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {quickCarsData &&
          quickCarsData.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                  borderColor: "#00000010",
                  borderStyle: "solid",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 30,
                  elevation: 1,
                  backgroundColor: darkMode.background,
                  borderRadius: 20,
                  overflow: "hidden",
                  marginBottom:30
                }}
                onTouchEnd={() => {
                  setQuickCarIndex(index);
                  setShowQuickCarProfile(true);
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    // backgroundColor: '#9DBDFF'
                    backgroundColor: "#9DBDFF",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.user?.driverImage
                          ? item.user?.driverImage
                          : "https://www.shutterstock.com/image-photo/closeup-portrait-happy-indian-young-600nw-2278702239.jpg",
                      }}
                      style={{
                        height: 65,
                        width: 65,
                        borderRadius: 45,
                        margin: 15,
                        marginBottom: 5,
                        borderWidth: 1,
                        borderColor: darkMode.borderBox,
                        backgroundColor: darkMode.backgroundDark,
                      }}
                    ></Image>

                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "PlusJakartaSans-bold",
                          color: darkMode.text,
                        }}
                      >
                        {item.user?.name + " " + item.user?.lastName}
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
                            fontFamily: "PlusJakartaSans-bold",
                            color: darkMode.text,
                            marginLeft: 10,
                          }}
                        >
                          24 Reseñas
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: 15,
                      backgroundColor: darkMode.backgroundDark,
                      padding: 5,
                      paddingHorizontal:7,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: darkMode.borderBox,
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "900", color:'#387F39' }}>
                      $ {item.pricePerSeat}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color:darkMode.text
                      }}
                    >
                      {item.availableSeats} plazas libres
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginVertical: 2,
                    backgroundColor: darkMode.backgroundDark,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans-SemiBold",
                      color: "#52535a",
                      fontSize: 15.5,
                      textAlignVertical: "center",
                    }}
                  >
                    A{" "}
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans-Bold",
                        color: "#06BCEE",
                      }}
                    >
                      {quickCarsDistances && quickCarsDistances.length > 0
                        ? quickCarsDistances.filter(
                            (el) => el.quickCarId == item.id
                          )[0]?.toUserDistance + " km"
                        : "? km"}
                    </Text>{" "}
                    de ti
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    |
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans-SemiBold",
                      color: darkMode.text,
                      fontSize: 15.5,
                      textAlignVertical: "center",
                    }}
                  >
                    A{" "}
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans-Bold",
                        color: "#06BCEE",
                      }}
                    >
                      {quickCarsDistances && quickCarsDistances.length > 0
                        ? quickCarsDistances.filter(
                            (el) => el.quickCarId == item.id
                          )[0]?.toOriginDistance + " km"
                        : "? km"}
                    </Text>{" "}
                    de tu salida
                  </Text>
                </View>

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
                      {item.starLocation.startLocationName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13.5,
                        fontFamily: "PlusJakartaSans-Regular",
                        padding: 1,
                        color: "#00000090",
                      }}
                    >
                      {item.endLocation.endLocationName}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingHorizontal: 10,
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "25%" }}>
                    <Text
                      style={{
                        width: 80,
                        color: "#2b00b6",
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {item.startTime.hour + " " + item.startTime.minute}{" "}
                      {item.startTime.hour > 11 ? " pm" : " am"}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "75%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        width: "50%",
                        color: "#2b00b6",
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {item.vehicleModel} / Black
                    </Text>
                    <View>
                      <TouchableOpacity
                        style={{
                          height: 36,
                          backgroundColor: "#2b00b6",
                          width: "auto",
                          justifyContent: "center",
                          borderRadius: 7,
                        }}
                        onPressOut={() => {
                          Alert.alert("Proponiendo viaje");
                        }}
                      >
                        <Text
                          style={{
                            width: "auto",
                            color: "#fff",
                            textAlign: "center",
                            fontWeight: "700",
                            marginHorizontal: 10,
                          }}
                        >
                          Proponer Viaje
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(QuickCarsSearchesDetails);
