import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMessageBoxState } from "../../globalState/marketSlice.js";

const FooterMarket = () => {
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
    <LinearGradient
      colors={["#00000007", "#00000060", "#00000099"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={[
        styles.container,
        { height: (isMessageBoxActive ? 15 : 250) + 12 },
      ]}
    >
      <Animated.View style={[styles.animatedContainer, { height: heightAnim }]}>
        <View style={styles.bar} onTouchEnd={handleToggleMessageBox}></View>

        <View style={styles.detailsContainer}>
          <View style={styles.secondDetailsContainer}>
            <Text style={styles.titleStyles}>Mercedes Benz {idProduct}</Text>
            <Text style={{ fontSize: 18 }}>$1,500</Text>
          </View>
          <View style={styles.thirdContainer}>
            <Image
              source={{
                uri: ulrImage,
              }}
              style={styles.imageContainer}
              resizeMode="cover"
            />
            <View style={styles.descriptionContainer}>
              <Text>
                Auto con 3000 km de uso, papeles en regla, con un pequeño golpe
                lateral
              </Text>
            </View>
            <Text style={styles.bottonContainer}>Haz una oferta</Text>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
  },
  animatedContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 12,
    position: "absolute",
    bottom: 0,
  },
  bar: {
    width: 100,
    height: 5,
    backgroundColor: "#c3c3c3",
    borderRadius: 2,
    marginHorizontal: "auto",
    marginBottom: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: "#c3c3c3",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingTop: 15,
  },
  secondDetailsContainer: { display: "flex", flexDirection: "column" },
  titleStyles: { fontWeight: "900", fontSize: 18 },
  thirdContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
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
export default FooterMarket;
