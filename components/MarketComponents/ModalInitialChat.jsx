import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

const ModalInitialChat = ({ darkMode }) => {
  const user = useSelector((state) => state.user);
  return (
    <View className="flex-row flex-1">
      <View
        style={{
          marginBottom: 0,
          marginLeft: 4,
          marginRight: 0,
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: darkMode.background,
            alignItems: "center",
            borderRadius: 9999,
            paddingLeft: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: darkMode.borderBox,
          }}
          className="d-flex flex-row space-x-2"
        >
          <View className="flex items-center">
            {user && user.global_user && user.global_user.profile_img_url ? (
              <Image
                source={{
                  uri: user.global_user.profile_img_url,
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9999,
                  borderWidth: 2,
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: "rgba(255, 205, 87, 0.6)",
                  backgroundColor: darkMode.backgroundDark,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
            )}
          </View>
          <TextInput
            style={{
              backgroundColor: darkMode.background,
              flex: 1,
              paddingTop: 8,
              paddingRight: 8,
              paddingBottom: 8,
              paddingLeft: 0,
              borderRadius: 9999,
              fontFamily: "PlusJakartaSans-SemiBold",
              color: darkMode.text,
              fontSize:13
            }}
            placeholder={`Envia un mensaje ${ user.global_user.first_name}`}
            placeholderTextColor={darkMode.text}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View
        style={{
          marginBottom: 2,
          marginRight: 4,
          marginLeft: 4,
          borderRadius: 2,
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: darkMode.borderBox,
              backgroundColor: darkMode.background,
              alignItems: "center",
              borderRadius: 9999,
              paddingRight: 14,
              paddingLeft: 14,
            }}
            className="d-flex flex-row"
          >
            <Icon
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 2,
              }}
              name="send"
              size={16}
              color={darkMode.text}
            />

            <TextInput
              style={{
                width: 0,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 2,
              }}
              className=" bg-red-500"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalInitialChat;
