import React, { useState, useEffect, memo, useCallback, useRef } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MessageHeader from "../components/MessageComponets/MessageHeader";
import { setCurrentDate, clearMessages } from "../globalState/MessageSlice";

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
  const groupedMessages = useSelector(
    (state) => state.messages.groupedMessages
  );

  const [groupedData, setGroupedData] = useState([]);

  const global_user_id = useSelector((state) => state.user.global_user?._id);
  const token = useSelector((state) => state.user.global_user?.token);
  const profile_img_url = useSelector(
    (state) => state.user.global_user?.profile_img_url
  );
  const loading = useSelector((state) => state.loading);
  const currentDate = useSelector((state) => state.messages.currentDate);

  const flatListRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearMessages());
      return () => {};
    }, [dispatch])
  );

  useEffect(() => {
    const data = groupedMessages.map((group) => ({
      date: group.date,
      data: group.messages,
    }));

    setGroupedData(data);
  }, [groupedMessages, dispatch]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        item.sender._id === userId
          ? styles.userMessageWrapper
          : styles.myMessageWrapper,
        {
          backgroundColor:
            item.sender._id === userId
              ? darkMode.contentMessageBg
              : darkMode.contentMessageBgTwo,
          borderColor: darkMode.contentMessageBorderColor,
        },
      ]}
      className=" mx-4"
    >
      <Text
        style={{
          fontFamily: "PlusJakartaSans-Regular",
          fontSize: 14,
          lineHeight: 18,
          color:
            item.sender._id === userId
              ? darkMode.contentSenderText
              : darkMode.contentReceiverText,
        }}
      >
        {item.content}
      </Text>
      <Text
        style={{
          color:
            item.sender._id === userId
              ? darkMode.contentSenderText
              : darkMode.contentReceiverText,
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {formatTime(item.timestamp)}
      </Text>
    </View>
  );

  const renderGroup = ({ item }) => (
    <View style={[styles.dateHeader, {}]}>
      <View className=" flex-row my-2">
        <View
          className="flex-1 relative"
          style={{
            borderBottomWidth:2,
            borderColor: darkMode.borderBox,
            borderStyle: "dotted",
            marginBottom:8
          }}
        />
        <View
          style={[
            {
            
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={[
              styles.date,
              {
                color: "#fff",
                borderColor: darkMode.contentMessageBorderColor,
                backgroundColor: "#444446",
                borderRadius: 9999,
                paddingHorizontal: 8,
                borderTopWidth: 1,
                borderColor: darkMode.contentMessageBorderColor,
                marginHorizontal:8

              },
            ]}
          >
            {item.date}
          </Text>
        </View>
        <View
          className="flex-1"
          style={{
            borderBottomWidth:2,
            borderColor: darkMode.borderBox,
            paddingTop: 10,
            borderStyle: "dotted",
            marginBottom:8
          }}
        />
      </View>
      <FlatList
        inverted
        data={item.data}
        renderItem={renderMessage}
        ListEmptyComponent={<Text>No hay mensajes disponibles.</Text>}
      />
    </View>
  );

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
        {loading ? (
          <View
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: darkMode.background,
            }}
          >
            <View className=" mb-48">
              <Image
                source={{
                  uri: "https://storage.googleapis.com/quickcar-storage/quickcar-removebg-preview%20(1).png",
                }}
                style={{
                  width: 100,
                  height: 100,
                }}
                resizeMode="contain"
              />
              <ActivityIndicator size="small" color={darkMode.text} />
            </View>
          </View>
        ) : (
          <FlatList
            data={groupedData}
            inverted
            renderItem={renderGroup}
            keyExtractor={(group) => group.date}
            contentContainerStyle={{ flexGrow: 1, borderWidth: 0 }}
            ListEmptyComponent={<Text>No hay mensajes disponibles.</Text>}
          />
        )}

        {loading ? null : (
          <View
            style={[
              {
                backgroundColor: loading
                  ? darkMode.background
                  : darkMode.backgroundDark,
                borderWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              },
            ]}
          >
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
                marginRight: 10,
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
              placeholder="Escribe un mensaje..."
              placeholderTextColor={darkMode.text}
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  dateHeader: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 12,
  },
});

export default memo(MessageScreen);
