import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "../globalState/themeSlice";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import TravelHeader from "../components/TravelComponents/TravelHeader";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const statusBarHeight = StatusBar.currentHeight || 0;
const { height: screenHeight } = Dimensions.get("window");

const TravelScreen = () => {
  const darkMode = useSelector(selectTheme);
  const colors = darkMode;
  const navigation = useNavigation();

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [time, setTime] = useState("");
  const [sit, setSit] = useState("");
  const [activeField, setActiveField] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    require("../assets/imgs/bg.jpg"),
    require("../assets/imgs/bg2.jpg"),
    
  ];

  const bsRef = useRef(null);
  const snapPoints = useMemo(() => ["53%"], []);

  
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const newImageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 700,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(newImageOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        newImageOpacity.setValue(0);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, imageOpacity, newImageOpacity]);

  useEffect(() => {
   
    Animated.timing(newImageOpacity, {
      toValue: 1,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [imageIndex, newImageOpacity]);

  const handleSheetChanges = (index) => {
    console.log("BottomSheet index:", index);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundDark,
          paddingTop: statusBarHeight,
        },
      ]}
    >
      <TravelHeader darkMode={darkMode} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundContainer}>
          <Animated.Image
            source={images[imageIndex]} // Use the current image
            style={[styles.backgroundImage, { opacity: imageOpacity }]}
            resizeMode="cover"
          />
          <Animated.Image
            source={images[(imageIndex + 1) % images.length]} // Next image
            style={[
              styles.backgroundImage,
              { opacity: newImageOpacity, position: "absolute" },
            ]}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: [{ translateY: -screenHeight * 0.1 }],
            marginHorizontal: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.borderBox,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setActiveField("fromLocation");
                bsRef.current?.expand();
              }}
              style={[
                styles.inputField,
                { backgroundColor: colors.background },
              ]}
              activeOpacity={1}
            >
              <FontAwesome5
                name="location-arrow"
                size={20}
                color={colors.text}
                style={styles.icon}
              />
              <Text style={[styles.inputText, { color: colors.text }]}>
                {fromLocation || "De"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveField("toLocation");
                bsRef.current?.expand();
              }}
              style={[
                styles.inputField,
                styles.borderTop,
                {
                  backgroundColor: colors.background,
                  borderTopWidth: 1,
                  borderColor: colors.borderBox,
                },
              ]}
              activeOpacity={1}
            >
              <MaterialIcons
                name="place"
                size={20}
                color={colors.text}
                style={styles.icon}
              />
              <Text style={[styles.inputText, { color: colors.text }]}>
                {toLocation || "A"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveField("time");
                bsRef.current?.expand();
              }}
              style={[
                styles.inputField,
                styles.borderTop,
                {
                  backgroundColor: colors.background,
                  borderTopWidth: 1,
                  borderColor: colors.borderBox,
                },
              ]}
              activeOpacity={1}
            >
              <FontAwesome5
                name="calendar-alt"
                size={20}
                color={colors.text}
                style={styles.icon}
              />
              <Text style={[styles.inputText, { color: colors.text }]}>
                {time || "Hora y Fecha"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setActiveField("sit");
                bsRef.current?.expand();
              }}
              style={[
                styles.inputField,
                styles.borderTop,
                {
                  backgroundColor: colors.background,
                  borderTopWidth: 1,
                  borderColor: colors.borderBox,
                },
              ]}
              activeOpacity={1}
            >
              <FontAwesome5
                name="chair"
                size={20}
                color={colors.text}
                style={styles.icon}
              />
              <Text style={[styles.inputText, { color: colors.text }]}>
                {sit || "Asientos"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log("Search button pressed");
              }}
              activeOpacity={0.8}
            >
              <FontAwesome5
                name="search"
                size={20}
                color={colors.text}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Buscar viaje</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bsRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={{ color: colors.text }}>
            {activeField === "fromLocation"
              ? "Seleccione la ubicación de partida"
              : activeField === "toLocation"
              ? "Seleccione la ubicación de destino"
              : activeField === "time"
              ? "Seleccione la hora y fecha"
              : activeField === "sit"
              ? "Seleccione los asientos"
              : "Contenido del BottomSheet"}
          </Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundContainer: {
    width: "100%",
    height: screenHeight * 0.4,
    position: "relative", // Ensure the image is positioned relative to this container
  },
  backgroundImage: {
    width: "100%", // Ensure the image covers the width of the container
    height: "100%", // Ensure the image covers the height of the container
    position: "absolute", // Position the image absolutely to ensure it fills the container
    top: 0,
    left: 0,
  },
  card: {
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  borderTop: {},
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#6200EE",
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default TravelScreen;
