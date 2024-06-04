import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import React, { useRef } from "react";
import { Animated, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const FooterMarket = () => {
  const [expanded, setExpanded] = useState(true);
  const heightAnim = useRef(new Animated.Value(40)).current;

  const idProduct = useSelector((state) => state.market?.idProduct);
  const ulrImage = useSelector((state) => state.market?.urlProductImage);

  const toggleExpand = () => {
    Animated.timing(heightAnim, {
      toValue: !expanded ? 40 : 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <LinearGradient
      colors={["#00000007", "#00000060", "#00000099"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={[styles.container, { height: (expanded ? 35 : 200) + 12 }]}
    >
      <Animated.View style={[styles.animatedContainer, { height: heightAnim }]}>
        <View style={styles.bar} onTouchEnd={toggleExpand}></View>
        <Text
          style={{
            // marginTop: 10,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Contacta con tu cliente o venderdor
        </Text>
        <View>
          <Text>Codigo Producto: {idProduct}</Text>
          <Image
            source={{
              uri: ulrImage,
            }}
            style={styles.imageContainer}
            resizeMode="cover"
          />
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
    borderRadius: 15,
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
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
export default FooterMarket;
