import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "../globalState/themeSlice";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import TravelHeader from "../components/TravelComponents/TravelHeader";

const statusBarHeight = StatusBar.currentHeight || 0;
const { height: screenHeight } = Dimensions.get("window");

const TravelScreen = () => {
  const darkMode = useSelector(selectTheme);
  const colors = darkMode;
  const navigation = useNavigation();

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [seats, setSeats] = useState("");
  const [activeField, setActiveField] = useState(""); // Define state to track active field

  // Ref for the BottomSheet
  const bsRef = useRef(null);
  const snapPoints = useMemo(() => ["10", "80%"], []);

  const handleSheetChanges = (index) => {
    console.log("BottomSheet index:", index);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: darkMode.backgroundDark,
          paddingTop: statusBarHeight,
        },
      ]}
    >
      <TravelHeader darkMode={darkMode} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundContainer}>
          <ImageBackground
            source={require("../assets/imgs/bg.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            {
              borderWidth: 1,
              borderColor: darkMode.borderBox,
              overflow: "hidden",
              backgroundColor: darkMode.background,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setActiveField("fromLocation");
              bsRef.current?.expand();
            }}
          >
            <Text style={[styles.input, { color: colors.text }]}>
              {fromLocation || "De"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveField("toLocation");
              bsRef.current?.expand();
            }}
          >
            <Text style={[styles.input, { color: colors.text }]}>
              {toLocation || "A"}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Día y Hora"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            value={dateTime}
            onChangeText={setDateTime}
          />
          <TextInput
            placeholder="Asientos"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            value={seats}
            onChangeText={setSeats}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <BottomSheet
        ref={bsRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={{ color: colors.text }}>
            {activeField === "fromLocation"
              ? "Seleccione la ubicación de partida"
              : activeField === "toLocation"
              ? "Seleccione la ubicación de destino"
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
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    transform: [{ translateY: -screenHeight * 0.1 }],
    marginHorizontal: 20,
    borderRadius: 20,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TravelScreen;
