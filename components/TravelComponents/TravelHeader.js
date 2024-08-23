import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TravelHeader({ darkMode, navegation }) {
  return (
    <View
        style={{
          backgroundColor: "red",
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: darkMode.background,
          borderBottomWidth: 1,
          borderColor: darkMode.contentMessageBorderColor,
        }}
        className=" flex-row items-center space-x-[10]"
      >
        <TouchableOpacity
          onPress={() => {
            navegation.goBack();
          }}
          style={{
            backgroundColor: darkMode.backgroundDark,
            width: 40,
            height: 40,
            borderWidth: 1,
            borderColor: darkMode.borderBox,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="keyboard-return"
            size={24}
            color={darkMode.text}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: darkMode.text,
            fontSize: 20,
            fontFamily: "PlusJakartaSans-Bold",
            flexShrink: 1,
          }}
        >
          Encuentra y reserva tu próximo viaje con{" "}
          <Text
            style={{
              color: '#FBB57A',
              fontFamily: "PlusJakartaSans-Bold",
            }}
          >
            QuickCar
          </Text>
          , miles de opciones te esperan.
        </Text>
      </View>
  )
}