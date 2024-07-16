import { View, Text, Image } from "react-native";
import React from "react";

export default function MessagerContainer({
  darkMode,
  userImageUrl,
  userFirtName,
  userLastName,
  messageContent,
  totalMessage,
  messageState,
}) {
  return (
    <View
      className="flex-row items-center justify-start p-4 space-x-2"
      style={{
        width: "100%",
        backgroundColor: darkMode.background,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: darkMode.borderBox,

      }}
    >
      <View>
        <Image
          source={{
            uri: userImageUrl,
          }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 9999,
            marginBottom: 10,
          }}
          resizeMode="cover"
        />
      </View>
      <View className="flex-1">
        <Text
          className=" text-lg font-semibold"
          style={{
            color: darkMode.text,
          }}
        >
          {userFirtName}
        </Text>
        <Text
          className=" text-base font-semibold"
          style={{
            color: darkMode.text,
          }}
        >
          {messageContent}
        </Text>
      </View>
      <View className=" flex-col items-center ">
        <View className=" bg-green-400  w-7 h-7 rounded-full flex items-center justify-center">
          <Text
            className=" text-lg font-semibold"
            style={{
              color: darkMode.text,
            }}
          >
            {totalMessage}
          </Text>
        </View>
        <Text
          className=" text-sm font-semibold"
          style={{
            color: darkMode.text,
          }}
        >
          {messageState}
        </Text>
      </View>
    </View>
  );
}
