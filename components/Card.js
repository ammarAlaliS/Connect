import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import useCustomFonts from "../fonts/useCustomFonts";
import * as Animatable from "react-native-animatable";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Card = ({ darkMode, handlePress, activeScreen }) => {
  const user = useSelector((state) => state.user);
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const navegation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      className=" px-6 py-2 "
      style={{
        width: "100%",
        backgroundColor: darkMode.background,
        borderBottomWidth: 1,
        borderColor: darkMode.borderBox,
      }}
    >
      <View className="flex-row space-x-2 items-center">
        <View className="flex items-center">
          {user && user.global_user && user.global_user.profile_img_url ? (
            <Animatable.Image
              source={{
                uri: user.global_user.profile_img_url,
              }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: "rgba(255, 205, 87, 0.6)",
                backgroundColor: darkMode.backgroundDark,
              }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: "rgba(255, 205, 87, 0.6)",
                backgroundColor: darkMode.backgroundDark,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></View>
          )}
          <Text
            style={{
              fontFamily: "PlusJakartaSans-SemiBold",
              color: darkMode.text,
            }}
            className="text-sm"
          >
            Usuario
          </Text>
        </View>
        <View className="p-2 space-y-2 " style={{ flex: 1 }}>
          <View className="flex-row items-baseline justify-between ml-2">
            <View>
              {user && user.global_user && (
                <View className="text-base flex flex-wrap">
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans-SemiBold",
                      color: darkMode.text,
                    }}
                  >
                    ¡Hola de nuevo!
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans-Bold",
                      color: darkMode.text,
                      lineHeight: 25,
                    }}
                    className="text-lg ml-2"
                  >
                    {" "}
                    {user.global_user.first_name} {user.global_user.last_name}{" "}
                  </Text>
                </View>
              )}
            </View>
            <View className=" justify-center items-center">
              <Text
                className=" w-7 h-7 rounded-full"
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontSize: 14,
                  fontFamily: "PlusJakartaSans-Bold",
                  backgroundColor: darkMode.backgroundDark,
                  borderWidth:1,
                  borderColor: darkMode.borderBox,
                  color: darkMode.text
                }}
              >
                0
              </Text>
              <Text
              
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontSize: 12,
                  fontFamily: "PlusJakartaSans-Bold",
                  color: darkMode.text
                }}
              >
                viajes totales
              </Text>
            </View>
          </View>
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            style={{
              backgroundColor: darkMode.backgroundDark,
              paddingHorizontal:8,
              paddingVertical:5,
              paddingBottom:7,
              borderRadius: 5,
              textAlign: "left",
              borderWidth: 1,
              borderColor: darkMode.borderBox,
            }}
          >
            <Animatable.Text
              animation="bounceIn"
              delay={500}
              style={{
                fontFamily: "PlusJakartaSans-SemiBold",
                fontSize: 12,
                color: darkMode.text,
              }}
            >
              ¿Listo para tu próximo viaje en QuickCar?
            </Animatable.Text>
            <Animatable.Text
              animation="bounceIn"
              delay={1000}
              style={{
                fontFamily: "PlusJakartaSans-SemiBold",
                fontSize: 12,
                color: darkMode.text,
              }}
            >
              Elige tu conductor y tu asiento.
            </Animatable.Text>
          </Animatable.View>
          <View className=" flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={() => {
                navegation.navigate("Travel");
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: darkMode.borderBox,
                  backgroundColor: "#0000ff",
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  borderRadius: 9999,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "PlusJakartaSans-SemiBold",
                    paddingBottom: 2,
                  }}
                >
                  Buscar viaje
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: darkMode.borderBox,
                  backgroundColor: "#FFCD57",
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  borderRadius: 9999,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <AntDesign name="pluscircle" size={16} color="white" />
                <Text
                  style={{
                    color: "black",
                    fontSize: 14,
                    fontFamily: "PlusJakartaSans-SemiBold",
                    paddingBottom: 2,
                  }}
                >
                  Ser conductor
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
