import React from "react";
import { Text, TextInput, View } from "react-native";
import ContactIcon from "../../icons/ContactIcon";

const ModalInitialChat = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        backgroundColor: "#c3c3c3",
        paddingTop: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 10,
          alignItems: "center",
        }}
      >
        <ContactIcon width={35} height={35} color="#2b00b6" />
        <Text style={{ marginLeft: 10, fontWeight: "600", fontSize: 16 }}>
          Envia un mensaje al vendedor
        </Text>
      </View>
      <View
        style={{
          height: 50,
          width: "96%",
          backgroundColor: "#e3e3e4",
          marginHorizontal: "2%",
          borderRadius: 5,
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            color: "#000",
            fontSize: 16,
            // fontWeight: "500",
            width: "100%",
            paddingHorizontal: 10,
          }}
          multiline={true}
        >
          Hola, ¿Sigue disponible?
        </TextInput>
      </View>
    </View>
  );
};

export default ModalInitialChat;
