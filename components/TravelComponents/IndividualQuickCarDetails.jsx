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
          }}
        >
          <Text>Origen/Destino</Text>
          <Text>Ver en el mapa</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default IndividualQuickCarDetails;
