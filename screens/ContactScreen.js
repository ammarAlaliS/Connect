import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import api from "../api/api";
import MessagerContainer from "../components/MessageComponets/MessagerContainer";
import { useSelector } from "react-redux";
import socket from "../socket";

const statusBarHeight = StatusBar.currentHeight || 0;
const ContactScreen = ({ darkMode }) => {
  const API_BASE_URL = "https://obbaramarket-backend.onrender.com";
  const [searchTerm, setSearchTerm] = useState("");
  const [messageUserDataResult, setMessageUserData] = useState({
    conversations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const globalUserId = useSelector((state) => state.user.global_user?._id);
  const token = useSelector((state) => state.user.global_user?.token);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (globalUserId) {
          setLoading(true);
          const response = await api.get(
            `${API_BASE_URL}/api/ObbaraMarket/user/information/conversations/${globalUserId}?page=1&limit=20`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setMessageUserData(response.data || { conversations: [] });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(
          error.response?.data || { message: "Error al realizar la solicitud" }
        );
      }
    };

    fetchConversations();
  }, [globalUserId, token]);

  useEffect(() => {
    if (globalUserId) {
      const handleNewMessage = (data) => {
        console.log(
          'Evento "para actualizar messager container" recibido:',
          data
        );

        const { message, sender, receiver } = data;

        setMessageUserData((prevState) => {
          let updatedConversations = [...prevState.conversations];
          const existingConversationIndex = updatedConversations.findIndex(
            (conv) =>
              (conv.sender._id === message.sender &&
                conv.receiver._id === message.receiver) ||
              (conv.sender._id === message.receiver &&
                conv.receiver._id === message.sender)
          );

          const newMessage = { ...message };

          if (existingConversationIndex !== -1) {
            const updatedConversation =
              updatedConversations[existingConversationIndex];

            if (!updatedConversation.messages) {
              updatedConversation.messages = [];
            }
            if (
              !updatedConversation.messages.find(
                (m) => m._id === newMessage._id
              )
            ) {
              updatedConversation.messages.push(newMessage);
              updatedConversation.messages.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
              );
              updatedConversation.lastMessage = newMessage;
            }

            updatedConversations = [
              updatedConversation,
              ...updatedConversations.filter(
                (_, index) => index !== existingConversationIndex
              ),
            ];
          } else {
            updatedConversations = [
              {
                sender: { _id: message.sender, global_user: sender },
                receiver: { _id: message.receiver, global_user: receiver },
                messages: [newMessage],
                lastMessage: newMessage,
              },
              ...updatedConversations,
            ];
          }

          return { ...prevState, conversations: updatedConversations };
        });
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [globalUserId]);

  const getUniqueConversations = (conversations) => {
    if (!Array.isArray(conversations)) {
      return [];
    }

    const uniqueConversations = {};

    conversations.forEach((conversation) => {
      const isSender = globalUserId === conversation.sender._id;
      const otherUser = isSender ? conversation.receiver : conversation.sender;

      if (!uniqueConversations[otherUser._id]) {
        uniqueConversations[otherUser._id] = {
          user: otherUser.global_user,
          userId: otherUser._id,
          messages: [
            {
              ...conversation.lastMessage,
              senderId: conversation.sender._id,
              receiverId: conversation.receiver._id,
            },
          ],
        };
      } else {
        uniqueConversations[otherUser._id].messages.push({
          ...conversation.lastMessage,
          senderId: conversation.sender._id,
          receiverId: conversation.receiver._id,
        });
      }
    });

    const sortedConversations = Object.values(uniqueConversations).map(
      (conversation) => ({
        ...conversation,
        messages: conversation.messages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        ),
      })
    );

    return sortedConversations;
  };

  const uniqueConversations = getUniqueConversations(
    messageUserDataResult.conversations || []
  );

  const handleSearch = async (text) => {
    setSearchTerm(text);

    if (text.trim() === "") {
      setMessageUserData({ conversations: [] });
      return;
    }

    try {
      const response = await api.get(
        `${API_BASE_URL}/api/ObbaraMarket/user/information/conversations/search/${globalUserId}?query=${text}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && Array.isArray(response.data.conversations)) {
        setMessageUserData(response.data);
      } else {
        setMessageUserData({ conversations: [] });
      }
    } catch (error) {
      setError(
        error.response?.data || { message: "Error al realizar la solicitud" }
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          className="items-center justify-center flex-1"
          style={{ backgroundColor: darkMode.background }}
        >
          <View style={{ marginBottom: 120 + statusBarHeight }}>
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
            <ActivityIndicator size="large" color={darkMode.text} />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: darkMode.background }}>
          <View
            style={[
              styles.header,
              {
                borderColor: darkMode.borderBox,
                backgroundColor: darkMode.background,
              },
            ]}
          >
            <View style={styles.searchContainer}>
              <View
                style={[
                  styles.searchBar,
                  {
                    backgroundColor: darkMode.background,
                    borderColor: darkMode.borderBox,
                  },
                ]}
              >
                <TextInput
                  style={[styles.searchInput, { color: darkMode.text }]}
                  placeholder="Busca por nombre de usuario"
                  placeholderTextColor={darkMode.text}
                  underlineColorAndroid="transparent"
                  onChangeText={handleSearch}
                  value={searchTerm}
                />
                <TouchableOpacity
                  style={[
                    styles.searchButton,
                    {
                      borderColor: darkMode.borderBox,
                      backgroundColor: darkMode.backgroundDark,
                    },
                  ]}
                  onPress={() => {}}
                >
                  <Icon name="search" size={20} color={darkMode.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {error ? (
            <Text style={{ color: darkMode.text }}>
              {typeof error === "string" ? error : "Error desconocido"}
            </Text>
          ) : (
            <FlatList
              data={uniqueConversations}
              keyExtractor={(item) => item.userId}
              renderItem={({ item }) => {
                const { user, messages, userId } = item;
                const lastMessage = messages[0];

                if (!lastMessage || !user) {
                  return null;
                }

                return (
                  <MessagerContainer
                    userId={userId}
                    userImageUrl={user.profile_img_url}
                    userFirstName={user.first_name}
                    userLastName={user.last_name}
                    messageContent={lastMessage.content}
                    totalMessage={messages.length}
                    messageState={lastMessage.read ? "Leído" : "No leído"}
                    date={lastMessage.timestamp}
                    darkMode={darkMode}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text>No hay conversaciones</Text>}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  searchButton: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default ContactScreen;
