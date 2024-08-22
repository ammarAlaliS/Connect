import { FontAwesome } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

const QuickCarDetails = ({ showReviews, quickCarInfo }) => {
  return (
    <>
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
                  Muy buen servicio, 10 de 10 Muy buen servicio, 10 de 10 Muy
                  buen servicio, 10 de 10 Muy buen servicio, 10 de 10 buen
                  servicio, 10 de 10 Muy buen servicio, 10 de 10
                </Text>
              </View>
            </View>
          );
        })}
    </>
  );
};

export default QuickCarDetails;
