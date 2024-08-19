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
  const seatRequested = useSelector((state) => state.travel.seatRequested);

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
        backgroundColor: "#f4f5f6",
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
        ></IndividualQuickCarDetails>
      )}

      <View
        style={{
          height: 54,
          backgroundColor: "#2b00b6",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MainScreen");
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
          Busca un QuickCar
        </Text>
      </View>
      {seatRequested > 0 && (
        <QuickCarHeaderTravelDetails></QuickCarHeaderTravelDetails>
      )}
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
      <ScrollView>
        {quickCarsData &&
          quickCarsData.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#00000090",

                  borderBottomWidth: 1,
                  borderColor: "#00000010",
                  borderStyle: "solid",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: 1,
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
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
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
                      }}
                    ></Image>

                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                          fontFamily: "PlusJakartaSans-Regular",
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
                            color: "#00000090",
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
                      alignItems: "flex-end",
                      marginRight: 15,
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "900" }}>
                      $ {item.pricePerSeat}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#00000090" }}>
                      {item.availableSeats} asientos libres
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
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans-SemiBold",
                      color: "#52535a",
                      fontSize: 15.5,
                    }}
                  >
                    A{" "}
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans-Bold",
                        color: "#2b00b6",
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
                      color: "#52535a",
                      fontSize: 15.5,
                    }}
                  >
                    A{" "}
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans-Bold",
                        color: "#2b00b6",
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
                          {seatRequested == 0
                            ? "Proponer Viaje"
                            : "Suscribirse al viaje"}
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
