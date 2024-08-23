import React, { useState } from "react";
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
} from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "../globalState/themeSlice";
import { useNavigation } from "@react-navigation/native";
import TravelHeader from "../components/TravelComponents/TravelHeader";

const statusBarHeight = StatusBar.currentHeight || 0;
const { height: screenHeight } = Dimensions.get("window");

const TravelScreen = () => {
  const darkMode = useSelector(selectTheme);
  const colors = darkMode;
  const navegation = useNavigation();

  // Estado para los inputs
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [seats, setSeats] = useState("");

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
      <TravelHeader darkMode={darkMode} navegation={navegation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundContainer}>
          <ImageBackground
            source={require("../assets/imgs/bg.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>
        <View style={[
          styles.inputContainer,
          {
            borderWidth:1,
            borderColor: darkMode.borderBox,
            overflow:'hidden',
            backgroundColor: darkMode.background
          }
        ]}>
          <TextInput
            placeholder="De"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            value={fromLocation}
            onChangeText={setFromLocation}
          />
          <TextInput
            placeholder="A"
            placeholderTextColor={colors.placeholder}
            style={[styles.input, { color: colors.text }]}
            value={toLocation}
            onChangeText={setToLocation}
          />
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
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -screenHeight * 0.1 }], 
    marginHorizontal:20,
    borderRadius:20,
  },
  input: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
  },
});

export default TravelScreen;