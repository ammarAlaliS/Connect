import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Animated,
  Image,
  SafeAreaView,
  Text,
  Easing,
} from "react-native";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import useCustomFonts from "../fonts/useCustomFonts";

const statusBarHeight = StatusBar.currentHeight || 0;

const LoadScreen = () => {
  const { fontsLoaded, fontError, onLayoutRootView } = useCustomFonts();
  
  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" translucent />
      <View style={styles.container}>
        <BlurView intensity={100} style={styles.blur}>
          <View style={styles.container_content}>
            <Animatable.Image
              animation="zoomIn"
              easing="ease-out"
              duration={2000}
              source={{
                uri: "https://storage.googleapis.com/quickcar-storage/quickcar-removebg-preview%20(1).png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <Animatable.View
              animation="pulse"
              delay={2000}
              style={styles.indicatorContainer}
            >
              <ActivityIndicator size="large" color="#000" />
            </Animatable.View>
       
          </View>
          <View
            style={[
              {
                position: "absolute",
                bottom: 200,
          
               
              },
            ]}
          >
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover", 
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 200,
    marginBottom: 20,
    borderRadius: 15,
  },
  container_content: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "PlusJakartaSans-Bold",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicatorContainer: {
    marginTop: 40,
    alignItems: "center",
  },
});

export default LoadScreen;
