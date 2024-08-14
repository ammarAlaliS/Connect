import React, { useState, useEffect, memo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import MessageHeader from "../components/MessageComponets/MessageHeader";
import { clearMessages } from "../globalState/MessageSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchConversations } from "../components/MessageComponets/api/backendRequest";
import { useNavigation } from "@react-navigation/native";

import { formatDate, formatTime } from "../utils/formatTime";
import socket from "../socket";

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
    userId,
  } = params;
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const navegation = useNavigation();

  const allMessages = useSelector((state) => state.messages.messages || []);
  const global_user_id = useSelector((state) => state.user.global_user?._id);
  const token = useSelector((state) => state.user.global_user?.token);
  const profile_img_url = useSelector(
    (state) => state.user.global_user?.profile_img_url
  );
  const loading = useSelector((state) => state.loading);
  const firstFetch = useSelector((state) => state.messages.firstFetch);
  const currentPage = useSelector((state) => state.messages.currentPage);
  const setTimeZone = useSelector((state) => state.messages.setTimeZone);
  const totalPages = useSelector((state) => state.messages.totalPages);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearMessages());
      return () => {};
    }, [dispatch])
  );

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  console.log(`console de message para ver la estructura` + JSON.stringify(messages))

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (data) => {
        const tempMessage = {
          _id: data.message._id,
          content: data.message.content,
          timestamp: data.message.timestamp,
          read: data.message.read,
          sender: {
            _id: data.message.sender,
            global_user: {
              first_name: data.sender.first_name,
              last_name: data.sender.last_name,
              profile_img_url: data.sender.profile_img_url
            }
          },
          receiver: {
            _id: data.message.receiver,
            global_user: {
              first_name: data.receiver.first_name,
              last_name: data.receiver.last_name,
              profile_img_url: data.receiver.profile_img_url
            }
          }
        };
        setMessages(prevMessages => [tempMessage, ...prevMessages]);
      });
    } else {
      console.log("No hay socket conectado");
    }
  }, [socket, global_user_id, dispatch]);
  


  const renderMessage = ({ item, index }) => {
    const senderId = item.sender?._id;
    const receiverId = item.receiver?._id;

    if (!senderId || !receiverId) {
      console.error("Mensaje incompleto:", item);
      return null;
    }

    const isLastMessageOfDay =
      index === messages.length - 1 ||
      formatDate(item.timestamp) !== formatDate(messages[index + 1].timestamp);

    return (
      <View key={item._id}>
        {isLastMessageOfDay && (
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Bold",
              fontSize: 12,
              lineHeight: 18,
              color: darkMode.text,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            {formatDate(item.timestamp)}
          </Text>
        )}
        <View
          style={[
            senderId === userId
              ? styles.userMessageWrapper
              : styles.myMessageWrapper,
            {
              backgroundColor:
                senderId === userId
                  ? darkMode.contentMessageBg
                  : darkMode.contentMessageBgTwo,
              borderColor: darkMode.contentMessageBorderColor,
              marginHorizontal: 8,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans-Regular",
              fontSize: 14,
              lineHeight: 18,
              color:
                senderId === userId
                  ? darkMode.contentSenderText
                  : darkMode.contentReceiverText,
            }}
          >
            {item.content}
          </Text>
          <Text
            style={{
              color:
                senderId === userId
                  ? darkMode.contentSenderText
                  : darkMode.contentReceiverText,
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  const handleEndReached = () => {
    if (currentPage < totalPages) {
      fetchConversations(dispatch, userId, token, currentPage + 1, 15, loading);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode.screenBg, marginTop: statusBarHeight },
      ]}
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
      <View style={{ flex: 1 }}>
        <FlatList
          inverted
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ flexGrow: 1, borderWidth: 0 }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          refreshing={loading}
          onRefresh={() => navegation.goBack()}
          // ListFooterComponent={
          //   loading && (
          //     <View>
          //       <ActivityIndicator size="small" color={darkMode.text} />
          //     </View>
          //   )
          // }
        />
        <View style={styles.inputContainer(darkMode, loading)}>
          <Image
            source={{ uri: profile_img_url }}
            style={styles.profileImage(darkMode)}
            resizeMode="cover"
          />
          <TextInput
            style={styles.input(darkMode)}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={darkMode.text}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: (darkMode) => ({
    flex: 1,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    marginRight: 10,
    maxHeight: 240,
    backgroundColor: darkMode.background,
    color: darkMode.text,
    borderColor: darkMode.borderBox,
  }),
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
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
  inputContainer: (darkMode, loading) => ({
    backgroundColor: loading
      ? darkMode.backgroundDark
      : darkMode.backgroundDark,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  }),
  profileImage: (darkMode) => ({
    width: 45,
    height: 45,
    borderRadius: 9999,
    backgroundColor: darkMode.backgroundDark,
    borderWidth: 1,
    borderColor: darkMode.borderBox,
    marginRight: 10,
  }),
});

export default memo(MessageScreen);
