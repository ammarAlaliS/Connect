import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Animated, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ModalInitialChat from "./ModalInitialChat.jsx";
import ArticleCarousel from "./ArticleCarousel.jsx";
import XMarkIcon from "../../icons/XMarkIcon.js";

const NewProductForm = ({ setShowModal }) => {
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
                <XMarkIcon width={30} height={30} color={"#000"}></XMarkIcon>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.principalDetailContainer}>
            <Text style={styles.detailsTitle}>Nuevo Producto</Text>
            <View style={styles.dividingLine}></View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.secondSellerInfoContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                }}
                style={styles.sellerImage}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.sellerName}>Carlos Perez</Text>
              </View>
            </View>
            <Text style={styles.sellerContactInfo}>
              Publicacion publica en ObbaraMarket
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                marginTop: 20,
                paddingLeft: 10,
                fontFamily: "PlusJakartaSans-Bold",
              }}
            >
              Tipo de Articulo
            </Text>

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#000",
                borderStyle: "solid",
                height: 43,
                width: "80%",
                marginLeft: 15,
                paddingLeft: 10,
                marginTop: 5,
                fontSize: 16,
                borderRadius: 3,
              }}
            >
              Selecciona una categiria
            </TextInput>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000030",
    height: "100%",
    padding: 12,
    paddingTop: 60,
  },
  animatedContainer: {
    width: "100%",
    backgroundColor: "#f4f5f6",
    borderRadius: 5,
    height: "95%",
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  detailsContainer: {
    paddingHorizontal: 0,
    borderRadius: 10,
    height: "100%",
  },
  secondDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
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
    justifyContent: "center",
    paddingTop: 5,
  },
  detailsTitle: {
    fontSize: 25,
    fontWeight: "900",
    marginLeft: 5,
    fontFamily: "PlusJakartaSans-Bold",
  },
  chatContainer: { width: "100%" },
  secondSellerInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 10,
  },
  sellerImage: { width: 45, height: 45, borderRadius: 23 },
  sellerName: {
    marginLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
  },
  sellerContactInfo: {
    fontSize: 14,
    marginLeft: 10,
    fontStyle: "italic",
    fontFamily: "PlusJakartaSans-Regular",
    width: "100%",
    textAlign: "center",
    marginTop: -5,
  },
});
export default NewProductForm;
