import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ContactIcon from "../../icons/ContactIcon";
import PaperAirplane from "../../icons/PaperAirplane";
import { TouchableOpacity } from "react-native";

const ModalInitialChat = () => {
  return (
    <View style={styles.modalInitialChatContainer}>
      <View style={styles.secondChatContainer} className="d-flex flex-row">
        <ContactIcon width={35} height={35} color="#2b00b6" />
        <Text style={styles.chatTitleContainer}>
          Envia un mensaje al vendedor
        </Text>
      </View>
      <View style={styles.ThirdChatContainer} className="d-flex flex-row">
        <TextInput style={styles.inputContainer} multiline={true}>
          Hola, ¿Sigue disponible?
        </TextInput>
        <TouchableOpacity>
          <PaperAirplane
            height={35}
            width={35}
            color={"#2b00b6"}
          ></PaperAirplane>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalInitialChatContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#c3c3c3",
    paddingTop: 5,
  },
  secondChatContainer: {
    paddingLeft: 10,
    alignItems: "center",
  },
  chatTitleContainer: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    marginBottom: 7,
  },
  ThirdChatContainer: {
    height: 50,
    width: "96%",
    backgroundColor: "#e3e3e4",
    marginHorizontal: "2%",
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  inputContainer: {
    color: "#000",
    fontSize: 16,
    width: "90%",
    paddingHorizontal: 10,
    fontFamily: "PlusJakartaSans-Regular",
  },
});

export default ModalInitialChat;
