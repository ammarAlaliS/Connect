import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../globalState/loadingSlice';
import { setConversations } from '../../globalState/MessageSlice'

import axios from "axios";

export default function MessagerContainer({
  darkMode,
  userImageUrl,
  userFirstName,
  userLastName,
  messageContent,
  totalMessage,
  messageState,
  userId
}) {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const [userMessageInteraction, setUserMessageInteraction ] = useState([]);
  const navigation = useNavigation();
  const API_BASE_URL = "https://obbaramarket-backend.onrender.com";
  const token = useSelector((state) => state.user.global_user?.token);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const fetchConversations = async () => {
    dispatch(setLoading(true));
    try {
      if (userId) {
        const response = await axios.get(
          `${API_BASE_URL}/api/ObbaraMarket/conversations/${userId}?page=1&limit=10`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        let result = response.data;
        if (result && result.messages) {
          dispatch(
            setConversations({
              totalMessages: result.totalMessages, 
              totalPages: result.totalPages, 
              currentPage: result.currentPage, 
              conversations: result.messages
            })
          );
        } else {
          setUserMessageInteraction({ messages: [] });
        }
      }
    } catch (error) {
      setError(error.response || { message: "Error al realizar la solicitud" });
    } finally {
      dispatch(setLoading(false));
    
    }
  };


  return (
    <TouchableOpacity
      onPress={() => {
        fetchConversations();
        navigation.navigate("MessageScreen", {
          darkMode,
          userImageUrl,
          userFirstName,
          userLastName,
          messageContent,
          totalMessage,
          messageState,
          userMessageInteraction,
        });
      }}
    >
      <View
        className="flex-row items-center px-2 py-[10px] pt-[20px] space-x-2"
        style={{
          width: "100%",
          backgroundColor: darkMode.background,
          borderBottomWidth: 1,
          borderColor: darkMode.borderBox,
        }}
      >
        <View className="h-full">
          <Image
            source={{
              uri: userImageUrl,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 9999,
              backgroundColor: darkMode.backgroundDark,
              borderWidth: 1,
              borderColor: darkMode.borderBox
            }}
            resizeMode="cover"
          />
          <View className="w-full flex-1 items-end">
            <View
              style={{
                borderColor: darkMode.borderBox,
                borderBottomLeftRadius: 10,
              }}
              className="w-[50%] flex-1 mb-[12px] border-l-[1px] border-b-[1px]"
            ></View>
          </View>
        </View>
        <View className="flex-1">
          <Text
            className=""
            style={{
              fontSize: 18,
              fontFamily: "PlusJakartaSans-SemiBold",
              color: darkMode.text,
              lineHeight: 20,
            }}
          >
            {userFirstName} {userLastName}
          </Text>
          <Text
            className=""
            style={{
              fontFamily: "PlusJakartaSans-Regular",
              fontSize: 14,
              color: darkMode.text,
              lineHeight: 20,
              marginLeft: 12,
            }}
          >
            {showMore ? messageContent : `${messageContent.slice(0, 45)}...`}
          </Text>
          <TouchableOpacity onPress={toggleShowMore} className="">
            <View className="flex-row items-center justify-start">
              <Text
                style={{
                  color: darkMode.showText,
                  fontSize: 12,
                }}
              >
                {showMore ? "Leer menos" : "Leer más"}
              </Text>
              <Text
                style={{
                  color: darkMode.showText,
                  fontSize: 12,
                }}
                className="mt-[3px]"
              >
                {showMore 
                  ? <MaterialIcons name="keyboard-arrow-down" size={24} color={darkMode.showText} /> 
                  : <MaterialIcons name="keyboard-arrow-right" size={24} color={darkMode.showText} />
                }
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {!showMore && (
          <View className="flex-col items-center">
            <View
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: darkMode.headerIconColor,
              }}
            >
              <Text
                className="text-sm"
                style={{
                  color: darkMode.text,
                  fontFamily: "PlusJakartaSans-Bold",
                }}
              >
                {totalMessage}
              </Text>
            </View>
            <Text
              className="text-sm font-semibold"
              style={{
                color: darkMode.text,
              }}
            >
              {messageState}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
