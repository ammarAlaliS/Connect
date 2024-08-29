import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

export default function VerifyEmailComponent( { darkMode }) {
  const userName = useSelector((state) => state.register.firstName);
  const userLastName = useSelector((state) => state.register.lastName);
  const email = useSelector((state) => state.register.email);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Verificar tu correo es una manera segura de proteger tu cuenta.
        </Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Verifica tu email</Text>
          <Text style={styles.cardDescription}>
            Hola{" "}
            <Text style={{ fontFamily: "PlusJakartaSans-ExtraBold" }}>
              {userName} {userLastName}
            </Text>{" "}
            ingresa el código de 6 dígitos enviado por el equipo de{" "}
            <Text style={{ fontFamily: "PlusJakartaSans-ExtraBold" }}>
              Quickcar
            </Text>{" "}
            a tu cuenta de gmail{" "}
            <Text style={{ fontFamily: "PlusJakartaSans-ExtraBold" }}>
              {email}
            </Text>{" "}
            para verificar tu identidad.
          </Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Código de Verificación</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              placeholder="123456"
            />
          </View>
          <TouchableOpacity
              style={{
                backgroundColor: darkMode.buttonNext,
                alignItems: "center",
                borderRadius: 9999,
                padding: 10,
              }}
            >
              <Text
                style={[
                  {
                    color: "#fff",
                    fontFamily: "PlusJakartaSans-SemiBold",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  },
                ]}
              >
                Verificar Correo
              </Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  titleContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginBottom: 5,
    fontFamily: "PlusJakartaSans-ExtraBold",
    textTransform: "uppercase",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "PlusJakartaSans-ExtraBold",
  },
  cardDescription: {
    fontSize: 16,
    color: "#555",
    fontFamily: "PlusJakartaSans-Regular",
  },
  cardContent: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontFamily: "PlusJakartaSans-ExtraBold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    fontFamily: "PlusJakartaSans-Bold",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
