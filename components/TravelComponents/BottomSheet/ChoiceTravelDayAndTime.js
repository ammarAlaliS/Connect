import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { setStartTime } from "../../../globalState/tripSlice";
import { useDispatch } from "react-redux";

const { width } = Dimensions.get("window");

export default function ChoiceTravelDayAndTime({ onClose }) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const dispatch = useDispatch();
``
  const handleConfirm = () => {
    const formattedHour = hour.padStart(2, "0");
    const formattedMinute = minute.padStart(2, "0");
    const time = `${formattedHour}:${formattedMinute} ${ampm}`;
    dispatch(
      setStartTime({
        hour: parseInt(formattedHour, 10), 
        minutes: parseInt(formattedMinute, 10),
        period: ampm,
      })
    );
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hora del Viaje en Quickcar</Text>

      <View style={styles.timeContainer}>
        <Ionicons name="time-outline" size={30} color="#007AFF" />
        <Text style={styles.timeText}>{`${hour.padStart(
          2,
          "0"
        )}:${minute.padStart(2, "0")} ${ampm}`}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Hora"
          keyboardType="numeric"
          maxLength={2}
          value={hour}
          onChangeText={(text) => {
            if (/^\d{0,2}$/.test(text)) setHour(text);
          }}
          textAlign="center"
        />
        <TextInput
          style={styles.input}
          placeholder="Minutos"
          keyboardType="numeric"
          maxLength={2}
          value={minute}
          onChangeText={(text) => {
            if (/^\d{0,2}$/.test(text)) setMinute(text);
          }}
          textAlign="center"
        />
        <View style={styles.ampmContainer}>
          <TouchableOpacity
            style={[styles.ampmButton, ampm === "AM" && styles.selectedButton]}
            onPress={() => setAmpm("AM")}
          >
            <Text style={styles.ampmText}>AM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.ampmButton, ampm === "PM" && styles.selectedButton]}
            onPress={() => setAmpm("PM")}
          >
            <Text style={styles.ampmText}>PM</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
    marginBottom: 20,
    fontFamily: "PlusJakartaSans-Bold",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
  },
  inputContainer: {
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingHorizontal: 8,
    fontSize: 16,
    textAlign: "center",
    elevation: 1,
    fontFamily: "PlusJakartaSans-Bold",
  },
  ampmContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
  ampmButton: {
    width: "48%",
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: "#06BCEE",
    alignItems: "center",
    justifyContent: "center",
  },
  ampmText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold",
  },
  selectedButton: {
    backgroundColor: "#007AFF",
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "PlusJakartaSans-Bold",
  },
});
