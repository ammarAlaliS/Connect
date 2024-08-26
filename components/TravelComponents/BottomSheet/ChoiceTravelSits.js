import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { setNumberOfSeatRequested } from "../../../globalState/tripSlice";

const windowWidth = Dimensions.get('window').width;

export default function ChoiceTravelSits({ onClose }) {
  const [seats, setSeats] = useState(1);
  const dispatch = useDispatch();

  const updateSeats = (value) => {
    setSeats((prevSeats) => Math.max(1, Math.min(4, prevSeats + value)));
  };

  const handleAccept = () => {
    dispatch(setNumberOfSeatRequested({ numberOfSeatRequested: seats }));
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el número de asientos</Text>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => updateSeats(-1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.seatCount}>{seats}</Text>

        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => updateSeats(1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
        <Text style={styles.acceptButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 80,
    width: windowWidth , // Adjust width for better responsiveness
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign:"center"
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  seatCount: {
    fontSize: 40,
    fontWeight: "600",
    color: "#333",
  },
  incrementButton: {},
  decrementButton: {},

  acceptButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "PlusJakartaSans-Bold",
  },
});
