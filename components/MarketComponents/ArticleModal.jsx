import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Animated, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ModalInitialChat from "./ModalInitialChat.jsx";
import ArticleCarousel from "./ArticleCarousel.jsx";
import XMarkIcon from "../../icons/XMarkIcon.js";

const ArticleModal = ({ setShowModal }) => {
  const idProduct = useSelector((state) => state.market?.idProduct);
  const ulrImage = useSelector((state) => state.market?.urlProductImage);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer]}>
        <View style={styles.detailsContainer}>
          <View style={styles.secondDetailsContainer}>
            <View
              style={styles.xMarkIconContainer}
              onTouchEnd={() => {
                setShowModal(false);
              }}
            >
              <TouchableOpacity>
                <XMarkIcon width={30} height={30} color={"#f1f1f1"}></XMarkIcon>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleStyles}>Mercedes Benz {idProduct}</Text>
            <View style={styles.subTitlesContainer}>
              <Text style={styles.fisrtSubTitle}>$1,500</Text>
              <Text style={styles.secondSubtitle}>2 disponibles</Text>
            </View>
          </View>
          {/* CARRUCEL */}
          <ArticleCarousel></ArticleCarousel>

          <View style={styles.dividingLine}></View>

          <View style={styles.principalDetailContainer}>
            <Text style={styles.detailsTitle}>Detalles</Text>

            <ScrollView>
              <View style={styles.secondDetailsScrollViewContainer}>
                <View style={styles.stateContainer}>
                  <Text style={styles.titleState}>Estado:</Text>
                  <Text style={styles.state}>Nuevo</Text>
                </View>

                <View style={styles.locationContainer}>
                  <Text style={styles.locationTitle}>Ubicacion:</Text>
                  <Text style={styles.location}>Valencia</Text>
                </View>

                <View style={styles.descriptionTitleContainer}>
                  <Text style={styles.descriptionTitle}>Descripcion:</Text>
                </View>
              </View>

              <Text style={styles.principalDescriptionContainer}>
                Auto con 3000 km de uso, papeles en regla, con un pequeño golpe
                lateral Auto con 3000 km de uso, papeles en regla, con un
                pequeño golpe lateral Auto con 3000 km de uso, papeles en regla,
                con un pequeño golpe lateral Auto con 3000 km de uso, papeles en
                regla, con un pequeño golpe lateral Auto con 3000 km de uso.
              </Text>
              <View style={styles.sellerInfoContainer}>
                <Text style={styles.sellerInfo}>Informacion del Vendedor:</Text>
              </View>

              <View style={styles.secondSellerInfoContainer}>
                <Image
                  source={{
                    uri: ulrImage,
                  }}
                  style={styles.sellerImage}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.sellerName}>Carlos Perez</Text>
                  <Text style={styles.sellerContactInfo}>Pide un QuickCar</Text>
                </View>
              </View>

              <View style={styles.quickcarImageContainer}>
                <Image
                  source={{
                    uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                  }}
                  style={styles.quickcarImage}
                  resizeMode="contain"
                />
                <Text>Se unio en 2019</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.chatContainer}>
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
    padding: 10,
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
  container: {
    backgroundColor: "#00000030",
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 5,
  },
  subTitlesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  fisrtSubTitle: { fontSize: 18, color: "#f1f1f1", fontWeight: "700" },
  secondSubtitle: {
    marginLeft: 20,
    fontSize: 14,
    color: "#f1f1f1",
    fontWeight: "700",
  },
  xMarkIconContainer: {
    position: "absolute",
    top: 7,
    end: 7,
    width: 30,
    height: 30,
    zIndex: 100,
  },
  dividingLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#c3c3c3",
  },
  principalDetailContainer: {
    width: "100%",
    backgroundColor: "#f4f5f6",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  secondDetailsScrollViewContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    marginLeft: 10,
  },
  stateContainer: {
    display: "flex",
    flexDirection: "row",
    width: "55%",
    justifyContent: "space-between",
  },
  titleState: {
    fontSize: 15,
    fontWeight: "700",
    width: "40%",
    textAlign: "left",
  },
  state: { fontSize: 15, width: "40%", textAlign: "left" },
  detailsTitle: { fontSize: 20, fontWeight: "900", marginLeft: 5 },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    width: "55%",
    justifyContent: "space-between",
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: "700",
    width: "40%",
    textAlign: "left",
  },
  location: { fontSize: 15, width: "40%", textAlign: "left" },
  descriptionTitleContainer: {
    display: "flex",
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
    marginTop: 5,
  },
  descriptionTitle: { fontSize: 15, fontWeight: "700" },
  principalDescriptionContainer: {
    paddingHorizontal: 10,
    textAlign: "justify",
    fontWeight: "400",
  },
  sellerInfoContainer: {
    display: "flex",
    flexDirection: "row",
    width: "300%",
    justifyContent: "space-between",
    marginTop: 5,
    paddingLeft: 10,
  },
  sellerInfo: { fontSize: 15, fontWeight: "700" },
  secondSellerInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  sellerImage: { width: 60, height: 60, borderRadius: 30 },
  sellerName: {
    marginLeft: 10,
    fontWeight: "800",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  sellerContactInfo: {
    fontSize: 12,
    marginLeft: 10,
    fontStyle: "italic",
  },
  quickcarImageContainer: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quickcarImage: {
    height: 40,
    width: 40,
    marginRight: 20,
    marginLeft: 10,
    opacity: 0.6,
    borderWidth: 2,
    borderColor: "#f4f5f6",
  },
  chatContainer: { width: "100%" },
});
export default ArticleModal;
