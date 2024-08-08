import React, { useState, useEffect, useRef, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Image
} from "react-native";
import MessageHeader from "../components/MessageComponets/MessageHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import socket from "../socket"; // Asegúrate de que la configuración del socket esté correcta

const statusBarHeight = StatusBar.currentHeight || 0;

const MessageScreen = ({ route }) => {
  const params = route.params || {};
  const {
    darkMode,
    userImageUrl,
    userFirstName,
    userLastName,
    messageContent,
    totalMessage,
    messageState,
  } = params;

  const API_BASE_URL = "https://obbaramarket-backend.onrender.com";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(false);
  const global_user_id = useSelector((state) => state.user.global_user?._id);
  const conversations = useSelector((state) => state.messages.conversations);
  const token = useSelector((state) => state.user.global_user?.token);
  const profile_img_url = useSelector((state) => state.user.global_user?.profile_img_url);
  const loading = useSelector((state) => state.loading);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socket.on("newMessage", (data) => {
      const { message, receiver, sender } = data;

      const tempMessage = {
        content: message.content,
        isSender: data.message.sender === global_user_id,
        loading: false,
        timestamp: message.timestamp,
        receiverId: message.receiver,
        senderId: message.sender,
        senderInfo: sender,
        receiverInfo: receiver,
      };
      setMessages((prevMessages) => [...prevMessages, tempMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [global_user_id]);

  useEffect(() => {
    if (conversations && global_user_id) {
      const formattedMessages = conversations.map((msg) => {
        const senderId = msg.sender._id;
        const isSender = senderId === global_user_id;

        return {
          content: msg.content,
          isSender: isSender,
          loading: false,
          timestamp: msg.timestamp,
          receiverId: msg.receiver._id,
          senderId: msg.sender._id,
        };
      });

      formattedMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(formattedMessages);
    } else {
      setMessages([]);
    }
  }, [conversations, global_user_id]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);

    const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";

    return messageDate.toLocaleDateString();
  };

  const groupMessagesByDay = (messages) => {
    const groupedMessages = {};

    messages.forEach((message) => {
      const date = new Date(message.timestamp);
      const dateKey = date.toDateString();

      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }

      groupedMessages[dateKey].push(message);
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDay(messages);

  const uniqueReceiverIds = new Set();
  Object.keys(groupedMessages).forEach((dateKey) => {
    groupedMessages[dateKey].forEach((message) => {
      if (message.receiverId && message.receiverId !== global_user_id) {
        uniqueReceiverIds.add(message.receiverId);
      }
    });
  });

  const uniqueSenderIds = new Set();
  Object.keys(groupedMessages).forEach((dateKey) => {
    groupedMessages[dateKey].forEach((message) => {
      if (message.senderId && message.senderId !== global_user_id) {
        uniqueSenderIds.add(message.senderId);
      }
    });
  });

  const receiverIdsArray = Array.from(uniqueReceiverIds);
  const senderIdArray = Array.from(uniqueSenderIds);

  const handleSendMessage = async () => {
    try {
      const userReceiverId = receiverIdsArray[0] || senderIdArray[0];

      if (!newMessage.trim()) {
        console.log("Message content cannot be empty.");
        return;
      }

      setLoadingMessage(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/ObbaraMarket/send/${userReceiverId}`,
        {
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setNewMessage("");
        setLoadingMessage(false);
      } else {
        console.log("Error sending message:", response.data.error);
        setLoadingMessage(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setLoadingMessage(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        item.isSender
          ? [
              styles.myMessageWrapper,
              {
                borderWidth: 1,
                borderColor: darkMode.contentMessageBorderColor,
              },
            ]
          : [
              styles.userMessageWrapper,
              {
                borderWidth: 1,
                borderColor: darkMode.contentMessageBorderColor,
              },
            ],
        {
          backgroundColor: item.isSender
            ? darkMode.contentMessageBgTwo
            : darkMode.contentMessageBg,
          borderColor: darkMode.contentMessageBorderColor,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={darkMode.text} />
      ) : (
        <View>
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Regular",
              fontSize: 14,
              lineHeight: 18,
              color: item.isSender
                ? darkMode.contentSenderText
                : darkMode.contentReceiverText,
            }}
          >
            {item.content}
          </Text>
          <Text
            style={{
              color: item.isSender
                ? darkMode.contentSenderText
                : darkMode.contentReceiverText,
              fontSize: 9,
            }}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      )}
    </View>
  );

  const renderDateHeader = ({ item }) => (
    <Text
      style={[
        styles.dateHeader,
        {
          color: "#fff",
          borderWidth: 1,
          borderColor: darkMode.contentMessageBorderColor,
        },
      ]}
      className=" bg-[#444446] m-auto px-2 py-1 my-1"
    >
      {formatDate(item)}
    </Text>
  );

  const data = Object.keys(groupedMessages).flatMap((dateKey) => [
    dateKey,
    ...groupedMessages[dateKey],
  ]);

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
      <View style={styles.messageListContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
          renderItem={({ item }) => {
            if (typeof item === "string") {
              return renderDateHeader({ item });
            } else {
              return renderMessage({ item });
            }
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        />
      </View>
      <View style={[styles.inputContainer]}>
        <Image
          source={{
            uri: profile_img_url,
          }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 9999,
            backgroundColor: darkMode.backgroundDark,
            borderWidth: 1,
            borderColor: darkMode.borderBox,
            marginRight:10
          }}
          resizeMode="cover"
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkMode.background,
              color: darkMode.text,
              borderColor: darkMode.borderBox,
            },
          ]}
          value={newMessage}
          placeholder="Escribe un mensaje..."
          placeholderTextColor={darkMode.text}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSendMessage}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={loadingMessage}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      {loadingMessage && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={darkMode.text} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginRight: 10,
    maxHeight: 240,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  messageListContainer: {
    flex: 1,
  },
  myMessageWrapper: {
    alignSelf: "flex-end",
    marginVertical: 2,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 6,
    maxWidth: "80%",
  },
  userMessageWrapper: {
    alignSelf: "flex-start",
    marginVertical: 2,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 6,
    maxWidth: "80%",
  },
  dateHeader: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 5,
    fontSize: 12,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default memo(MessageScreen);
