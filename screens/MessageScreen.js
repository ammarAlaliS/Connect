import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import MessageHeader from "../components/MessageComponets/MessageHeader";

const statusBarHeight = StatusBar.currentHeight || 0;

function MessageScreen({ route }) {
  const {
    darkMode,
    userImageUrl,
    userFirstName,
    userLastName,
    messageContent,
    totalMessage,
    messageState,
  } = route.params;

  const [messages, setMessages] = useState([
    { content: messageContent, isUser: true },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const tempMessage = { content: newMessage, isUser: false, loading: true };
      setMessages((prevMessages) => [...prevMessages, tempMessage]);
      setNewMessage("");
      setLoading(true);

      // Simula una llamada a la API (reemplazar con la llamada real)
      setTimeout(() => {
        setLoading(false);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg === tempMessage ? { ...msg, loading: false } : msg
          )
        );
      }, 2000); // Simula un retraso de 2 segundos
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: darkMode.backgroundDark }]}
    >
      <MessageHeader
        darkMode={darkMode}
        userImageUrl={userImageUrl}
        userFirstName={userFirstName}
        userLastName={userLastName}
        messageContent={messageContent}
        totalMessage={totalMessage}
        messageState={messageState}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.userMessageContainer}>
          {messages
            .filter((message) => message.isUser)
            .map((message, index) => (
              <Text
                style={[
                  styles.messageText,
                  styles.userMessage,
                  { color: darkMode.text },
                ]}
                key={index}
              >
                {message.content}
              </Text>
            ))}
        </View>
        <View style={styles.myMessageContainer}>
          {messages
            .filter((message) => !message.isUser)
            .map((message, index) => (
              <View key={index} style={styles.myMessageWrapper}>
                {message.loading ? (
                  <ActivityIndicator size="small" color="#06BCEE" />
                ) : (
                  <Text
                    style={[
                      styles.messageText,
                      styles.myMessage,
                      { color: darkMode.text },
                    ]}
                  >
                    {message.content}
                  </Text>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={[styles.inputContainer, { backgroundColor: darkMode.background, borderColor: darkMode.borderBox}]}>
        <TextInput
          style={[styles.input, { color: darkMode.text }]}
          placeholder="Escribe un mensaje"
          placeholderTextColor={darkMode.text}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  scrollView: {
    flex: 1,
  },
  userMessageContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  myMessageContainer: {
    paddingHorizontal: 16,
  },
  messageText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#1A5319",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#06BCEE",
  },
  myMessageWrapper: {
    alignSelf: "flex-end",
    borderRadius: 10,
    maxWidth: "100%",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default MessageScreen;
