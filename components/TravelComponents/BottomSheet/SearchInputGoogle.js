import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const GOOGLE_MAPS_API_KEY = "AIzaSyAAwUd5bO7daxQUktwliIcG4YA8M5mWhrY";

const SearchInputGoogle = () => {
  const [inputValue, setInputValue] = useState("");
  const googlePlacesRef = useRef();

  const handleCurrentLocation = () => {
    Alert.alert(
      "Ubicación actual",
      "Funcionalidad de ubicación actual no implementada"
    );
  };

  const handlePlaceSelect = (data, details) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      const placeName = details.name || details.formatted_address;

      console.log("Lugar:", placeName, "Latitud:", lat, "Longitud:", lng);
      Alert.alert(
        "Ubicación seleccionada",
        `Lugar: ${placeName}\nLatitud: ${lat}\nLongitud: ${lng}`
      );
    }
  };

  const clearInput = () => {
    setInputValue("");
    googlePlacesRef.current?.setAddressText("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder="Buscar"
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "es",
          }}
          fetchDetails={true}
          onPress={handlePlaceSelect}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.textInput,
            listView: styles.listView,
            description: styles.description,
            row: styles.row,
          }}
          textInputProps={{
            value: inputValue,
            onChangeText: setInputValue,
            placeholderTextColor: "#aaa",
          }}
        />
       
        {inputValue.length > 0 && (
          <TouchableOpacity
            style={styles.iconButtonDelete}
            onPress={clearInput}
          >
            <Ionicons name="close" size={20} color="#000" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleCurrentLocation}
        >
          <FontAwesome5 name="map-marker-alt" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  autocompleteContainer: {
    flex: 1,
    zIndex: 2,
  },
  textInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    marginRight: 25,
    paddingRight: 35,
  },
  iconButtonDelete: {
    position: "absolute",
    right: 35,
    top: "50%",
    transform: [{ translateY: -13 }],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    zIndex: 10,
  },
  iconButton: {
    position: "absolute",
    right: -10,
    top: "50%",
    transform: [{ translateY: -18 }],
    backgroundColor: "#25252C",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    zIndex: 10,
  },
  listView: {
    position: "absolute",
    top: 60,
    zIndex: 2,
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchInputGoogle;
