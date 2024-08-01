import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";

const IndividualQuickCarDetails = ({
  setShowQuickCarProfile,
  quickCarInfo,
}) => {
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
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowQuickCarProfile(false);
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
          Perfil del QuickCar
        </Text>
      </View>

      <ScrollView>
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
          <View
            style={{
              width: "40%",
              height: "100%",
              borderBottomWidth: 4,
              borderColor: "#2b00b6",
              borderStyle: "solid",
              alignItems: "center",
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
          </View>
          <View
            style={{
              width: "40%",
              height: "100%",
              alignItems: "center",
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
          </View>
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

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 10, color: "#00000090", fontSize: 14 }}>
            Origen / Destino
          </Text>
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

        {/* Horarios */}

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

        {/*Segunda linea divisoria  */}
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

        {/*Detalles de los asientos  */}

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

        {/*Tercer linea divisoria  */}
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
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: 100,
          }}
        >
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text>Lunes</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualQuickCarDetails;
