import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const API_BASE_URL =
  "https://obbaramarket-backend.onrender.com/api/ObbaraMarket";
const socket = io("https://obbaramarket-backend.onrender.com", {
  transports: ["websocket"],
});

const Comment = ({ data, darkMode }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  return (
    <View
      className="flex-row rounded-sm items-center space-x-2 py-5 px-4"
      style={{
        backgroundColor: darkMode.background,
        borderWidth: 1,
        borderColor: darkMode.borderBox,
      }}
    >
      <View className="h-full">
        <Image
          source={{ uri: data.author.global_user.profile_img_url }}
          className="w-16 h-16 rounded-full"
          style={{
            borderWidth: 1,
            borderColor: darkMode.borderBox,
          }}
        />
      </View>
      <View className="flex-1 space-y-4">
        <View className="flex-row justify-between">
          <Text
            style={{ fontFamily: "PlusJakartaSans-Bold", color: darkMode.text }}
            className="text-sm"
          >
            {data.author.global_user.first_name}{" "}
            {data.author.global_user.last_name}
          </Text>
          <View className="items-end">
            <Text
              style={{
                fontFamily: "PlusJakartaSans-Bold",
                color: darkMode.text,
              }}
              className="text-[12px]"
            >
              {`${new Date(data.createdAt).toLocaleDateString()}`}
            </Text>
          </View>
        </View>
        <View
          className=" p-2 rounded-xl"
          style={{
            backgroundColor: darkMode.backgroundDark,
            borderWidth: 1,
            borderColor: darkMode.borderBox,
          }}
        >
          <Text className="text-[15px]" style={{ color: darkMode.text}}>
            {showMore ? data.content : `${data.content.slice(0, 120)}`}
          </Text>

          <View className="flex-row items-center justify-between">
            {data.content.length > 120 && (
              <TouchableOpacity onPress={toggleShowMore}>
                <Text className=" text-blue-700">
                  {showMore ? "Leer menos" : "Leer más"}
                </Text>
              </TouchableOpacity>
            )}
            <View className="  flex-1 justify-end items-end">
              <Text
                style={{ fontFamily: "PlusJakartaSans-Bold", color: darkMode.text }}
                className="text-[10px] w-[30px]  "
              >
                {formatTime(data.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Commet_C = ({ blogId, darkMode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

    socket.on("newComment", handleCommentsUpdated);

    return () => {
      socket.off("newComment", handleCommentsUpdated);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/blogs/${blogId}/comments?page=1&limit=20`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCommentsUpdated = (newComment) => {
    console.log("Nuevo comentario recibido:", newComment);
    setData((prevData) => [newComment, ...prevData]);
  };

  return (
    <View
      className="flex-1 px-4 py-2"
      style={{ backgroundColor: darkMode.backgroundDark }}
    >
      <ScrollView className="space-y-2">
        {data.map((data, index) => (
          <View key={index}>
            <Comment data={data} darkMode={darkMode} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Commet_C;
