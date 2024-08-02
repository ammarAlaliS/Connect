import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import Back from "../../icons/Back";
import MenuPoints from "../../icons/MenuPoints";
export default function MessageHeader({ 
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
      style={{
        backgroundColor: darkMode.background,
        borderBottomWidth: 1,
        borderColor: darkMode.borderBox,
        padding: 10,
      }}
      className=" flex-row space-x-2 items-center"
    >
      <View>
        <Back size={30} color={darkMode.text} />
      </View>
      <View className=" flex-1 flex-row items-center space-x-2">
        <View>
          <Image
            source={{
              uri: userImageUrl,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 9999,
            }}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text
            className=""
            style={{
              fontSize: 18,
              fontFamily: "PlusJakartaSans-SemiBold",
              color: darkMode.text,
              lineHeight: 20,
            }}
          >
            {userFirtName} {userLastName}
          </Text>
        </View>
      </View>
      <View>
        <MenuPoints size={30} color={darkMode.text} />
      </View>
    </View>
  );
}
