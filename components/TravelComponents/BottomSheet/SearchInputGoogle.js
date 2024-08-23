import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

const SearchInputGoogle = ({ onLocationChange }) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectLocation = (data, details) => {
    const location = details?.formatted_address || "";
    setSelectedLocation(location);
    onLocationChange(location); // Call the callback function
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handleSelectLocation}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          description: styles.description, // Style for suggestion text
          row: styles.row, // Style for each row in the suggestions list
        }}
      />
      <Text style={styles.selectedLocation}>{selectedLocation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  autocompleteContainer: {
    flex: 1,
    zIndex: 1,
  },
  textInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  listView: {
    backgroundColor: "white",
  },
  description: {
    fontSize: 16,
  },
  row: {
    padding: 10,
  },
  selectedLocation: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default SearchInputGoogle;
