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
import SearchInputGoogle from "../components/TravelComponents/BottomSheet/SearchInputGoogle";

const statusBarHeight = StatusBar.currentHeight || 0;
const { height: screenHeight } = Dimensions.get("window");

const TravelScreen = () => {
  const darkMode = useSelector(selectTheme);
  const colors = darkMode;
  2;

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [time, setTime] = useState("");
  const [sit, setSit] = useState("");
  const [activeField, setActiveField] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    require("../assets/imgs/bg.jpg"),
    require("../assets/imgs/bg2.jpg"),
    require("../assets/imgs/bg3.jpg"),
    require("../assets/imgs/bg4.jpg"),
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
  
  const handleLocationChange = (location) => {
    console.log("Selected Location:", location);
    if (activeField === "fromLocation") {
      setFromLocation(location);
    } else if (activeField === "toLocation") {
      setToLocation(location);
    }
    bsRef.current?.collapse(); 
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
      <TravelHeader darkMode={darkMode} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundContainer}>
          <Animated.Image
            source={images[imageIndex]}
            style={[styles.backgroundImage, { opacity: imageOpacity }]}
            resizeMode="cover"
          />
          <Animated.Image
            source={images[(imageIndex + 1) % images.length]}
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
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderRadius: 9999,
                backgroundColor: "#6200EE",
                marginVertical: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                width: "100%",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: colors.borderBox,
              }}
              onPress={() => {
                console.log("Search button pressed");
              }}
              activeOpacity={0.8}
            >
              <FontAwesome5
                name="search"
                size={20}
                color={"#fff"}
                style={styles.icon}
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                }}
              >
                Buscar viaje
              </Text>
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
        
          {activeField === "fromLocation" ? (
            <SearchInputGoogle onLocationChange={handleLocationChange} />
          ) : activeField === "toLocation" ? (
            <Text>"Seleccione la ubicación de destino"</Text>
          ) : activeField === "time" ? (
            <Text>"Seleccione la ubicación de destino"</Text>
          ) : activeField === "sit" ? (
            <Text>"Seleccione la ubicación de destino"</Text>
          ) : (
            <Text>"Seleccione la ubicación de destino"</Text>
          )}
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
    position: "relative",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
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

  bottomSheetContent: {
    backgroundColor: "red",
  },
});

export default TravelScreen;
