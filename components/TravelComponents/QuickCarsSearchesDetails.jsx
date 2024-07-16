import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import ChevronUpDown from "../../icons/ChevronUpDownIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import ClockIcon from "../../icons/ClockIcon";
import QuickCarHeaderTravelDetails from "./QuickCarHeaderTravelDetails";
import { ScrollView } from "react-native";

const QuickCarsSearchesDetails = ({ setShowQuickCarDetails }) => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#f4f5f6",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 102,
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
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowQuickCarDetails(false);
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

      <QuickCarHeaderTravelDetails></QuickCarHeaderTravelDetails>
      <ScrollView>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <View
              key={item}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                borderBottomWidth: 1,
                borderStyle: "solid",
                borderColor: "#00000090",
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
                      uri: "https://www.shutterstock.com/image-photo/closeup-portrait-happy-indian-young-600nw-2278702239.jpg",
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
                      Roberto Carlos
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
                    // backgroundColor: "red",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    marginRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: "900" }}>$ 15</Text>
                  <Text style={{ fontSize: 13, color: "#00000090" }}>
                    3 asientos libres
                  </Text>
                </View>
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
                    Barcelona Barcelona
                  </Text>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontFamily: "PlusJakartaSans-Regular",
                      padding: 1,
                      color: "#00000090",
                    }}
                  >
                    Madrid Madrid
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
                    10:00 am
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
                    Honda Civic / Black
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
                        {item % 2 == 0
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
    </View>
  );
};

export default QuickCarsSearchesDetails;
