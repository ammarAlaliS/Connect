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
import AntDesign from "@expo/vector-icons/AntDesign";
import RenderDateHeader from "../../components/MessageComponets/RenderDateHeader"; 
export default function MessageHeader({
  darkMode,
  userImageUrl,
  userFirstName,
  userLastName,
  IsAtTop,
}) {
  return (
    <View
      style={{
        backgroundColor: darkMode.background,
        // borderBottomWidth: 1,
        // borderColor: !IsAtTop ? 'transparent' : darkMode.borderBox,
       paddingBottom:0,
       paddingHorizontal:10,
       paddingTop:10
      }}
      
    >
      <View className=" flex-row space-x-2 items-center">
        <View>
          <Back size={30} color={darkMode.text} />
        </View>
        <View className=" flex-1 flex-row items-center space-x-2">
          <View>
            {userImageUrl ? (
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
                  borderColor: darkMode.contentMessageBorderColor,
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 9999,
                  backgroundColor: darkMode.backgroundDark,
                  borderWidth: 1,
                  borderColor: darkMode.borderBox,
                }}
              >
                <AntDesign name="question" size={50} color={darkMode.text} />
              </View>
            )}
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
              {userFirstName} {userLastName}
            </Text>
          </View>
        </View>
        <View>
          <MenuPoints size={30} color={darkMode.text} />
        </View>
      </View>
      <View>
      {RenderDateHeader({ darkMode })}
      </View>
    </View>
  );
}
