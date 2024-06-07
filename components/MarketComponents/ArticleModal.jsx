import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMessageBoxState } from "../../globalState/marketSlice.js";
import ModalInitialChat from "./ModalInitialChat.jsx";
import ArticleCarousel from "./ArticleCarousel.jsx";

const ArticleModal = () => {
  const dispatch = useDispatch();
  const isMessageBoxActive = useSelector(
    (state) => state.market?.isMessageBoxActive
  );

  const heightAnim = useRef(new Animated.Value(15)).current;

  const idProduct = useSelector((state) => state.market?.idProduct);
  const ulrImage = useSelector((state) => state.market?.urlProductImage);

  const handleToggleMessageBox = () => {
    dispatch(setMessageBoxState());
  };

  const toggleExpand = () => {
    Animated.timing(heightAnim, {
      toValue: isMessageBoxActive ? 15 : 250,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    toggleExpand();
  }, [isMessageBoxActive]);

  return (
    <View
      style={{
        backgroundColor: "#00000030",
        height: "100%",
        paddingTop: 60,
        paddingHorizontal: 5,
      }}
    >
      <Animated.View style={[styles.animatedContainer]}>
        <View style={styles.detailsContainer}>
          {/* <View
            style={{ height: 2, width: "100%", backgroundColor: "#c3c3c3" }}
          ></View> */}
          <View style={styles.secondDetailsContainer}>
            <Text style={styles.titleStyles}>Mercedes Benz {idProduct}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#f1f1f1", fontWeight: "700" }}
              >
                $1,500
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 14,
                  color: "#f1f1f1",
                  fontWeight: "700",
                }}
              >
                2 disponibles
              </Text>
            </View>
          </View>
          {/* CARRUCEL */}
          <ArticleCarousel></ArticleCarousel>

          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#c3c3c3",
            }}
          ></View>

          <View
            style={{
              width: "100%",
              backgroundColor: "#f4f5f6",
              display: "flex",
              flex: 1,
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "900", marginLeft: 5 }}>
              Detalles
            </Text>

            <ScrollView>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "55%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      width: "40%",
                      textAlign: "left",
                    }}
                  >
                    Estado:
                  </Text>
                  <Text
                    style={{ fontSize: 15, width: "40%", textAlign: "left" }}
                  >
                    nuevo
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "55%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "700",
                      width: "40%",
                      textAlign: "left",
                    }}
                  >
                    Ubicacion:
                  </Text>
                  <Text
                    style={{ fontSize: 15, width: "40%", textAlign: "left" }}
                  >
                    Valencia
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "30%",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "700" }}>
                    Descripcion:
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  paddingHorizontal: 10,
                  textAlign: "justify",
                  fontWeight: "400",
                }}
              >
                Auto con 3000 km de uso, papeles en regla, con un pequeño golpe
                lateral Auto con 3000 km de uso, papeles en regla, con un
                pequeño golpe lateral Auto con 3000 km de uso, papeles en regla,
                con un pequeño golpe lateral Auto con 3000 km de uso, papeles en
                regla, con un pequeño golpe lateral Auto con 3000 km de uso.
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "300%",
                  justifyContent: "space-between",
                  marginTop: 5,
                  paddingLeft: 10,
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "700" }}>
                  Informacion del Vendedor:
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Image
                  source={{
                    uri: ulrImage,
                  }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  resizeMode="cover"
                />
                <View>
                  <Text
                    style={{
                      // fontSize: 16,
                      marginLeft: 10,
                      fontWeight: "800",
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                    }}
                  >
                    Carlos Perez
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 10,
                      // fontWeight: "600",
                      fontStyle: "italic",
                    }}
                  >
                    Pide un QuickCar
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginLeft: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                {/* <Grayscale> */}
                <Image
                  source={{
                    uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                  }}
                  style={{
                    height: 40,
                    width: 40,
                    marginRight: 20,
                    marginLeft: 10,
                    opacity: 0.6,
                    borderWidth: 2,
                    borderColor: "#f4f5f6",
                  }}
                  resizeMode="contain"
                />
                {/* </Grayscale> */}
                <Text>Se unio en 2019</Text>
              </View>
            </ScrollView>
          </View>
          <View style={{ width: "100%" }}>
            <ModalInitialChat></ModalInitialChat>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    width: "100%",
    backgroundColor: "#f4f5f6",
    padding: 3,
    borderRadius: 5,
    height: "95%",
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
    // position: "absolute",
    // bottom: 0,
  },
  detailsContainer: {
    backgroundColor: "#2b00b6",
    // paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 10,
    height: "100%",
  },
  secondDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 4,
    // backgroundColor: "#c3c3c3",
  },
  titleStyles: { fontWeight: "900", fontSize: 22, color: "#f1f1f1" },
  descriptionContainer: { height: 60, width: "75%" },
  bottonContainer: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Medium",
    fontWeight: "700",
    color: "#f1f1f1",
    backgroundColor: "#2b00b6",
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 4,
    borderRadius: 3,
  },
});
export default ArticleModal;
