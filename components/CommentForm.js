import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Send from "../icons/Send";
import Icon from "react-native-vector-icons/FontAwesome";
const API_BASE_URL =
  "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/blogs";

const CommentForm = ({ blogId, token, darkMode }) => {
  const user = useSelector((state) => state.user);
  const placeholderText = `¿Qué estás pensando ${user.global_user.first_name}?`;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${blogId}/comments`,
        {
          content: values.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <View
      style={[
        styles.shadowView,
        {
          backgroundColor: darkMode.background,
          borderWidth: 1,
          borderColor: darkMode.borderBox,
        },
      ]}
      className=" rounded-t-2xl mx-2 mb-2"
    >
      <View className="flex-row items-center space-x-2">
        <View className="h-full items-center">
          <Image
            source={{ uri: user.global_user.profile_img_url }}
            className="w-16 h-16 rounded-full bg-gray-100"
            style={{
              borderWidth: 1,
              borderColor: darkMode.borderBox,
            }}
          />
          <Text
            style={{ fontFamily: "PlusJakartaSans-Bold", color: darkMode.text }}
            className="text-sm"
          >
            {user.global_user.first_name}
          </Text>
          <View className=" w-full flex-1 items-end">
            <View
              style={{ borderColor: darkMode.borderBox }}
              className=" w-[50%] flex-1 mb-4 border-l-2 border-b-2"
            ></View>
          </View>
        </View>
        <View className="flex-1 space-y-4">
          <View className="flex-row justify-between">
            <Text
              style={{
                fontFamily: "PlusJakartaSans-Bold",
                color: darkMode.text,
              }}
              className=" text-base"
            >
              Escribe tu reseña
            </Text>
          </View>
          <View className="">
            <Formik
              initialValues={{ comment: "" }}
              validationSchema={Yup.object({
                comment: Yup.string().required("El comentario es obligatorio"),
              })}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View
                    className=" rounded-xl p-2 mb-4"
                    style={{
                      backgroundColor: darkMode.backgroundDark,
                      borderWidth: 1,
                      borderColor: darkMode.borderBox,
                    }}
                  >
                    <ScrollView className=" max-h-40">
                      <TextInput
                        onChangeText={handleChange("comment")}
                        onBlur={handleBlur("comment")}
                        value={values.comment}
                        placeholder={placeholderText}
                        placeholderTextColor={darkMode.text}
                        style={{ color: darkMode.text }}
                        multiline
                      />
                    </ScrollView>
                  </View>
                  <View
                    className=" pt-4  items-end justify-between  border-t-2 flex-row"
                    style={{ borderColor: darkMode.borderBox }}
                  >
                    <Text
                      style={{
                        fontFamily: "Eina01-BoldItalic",
                        color: darkMode.text,
                      }}
                      className=" text-3xl "
                    >
                      QuickCar
                    </Text>
                    <View
                      style={{
                        marginBottom: 2,
                        marginRight: 4,
                        marginLeft: 4,
                        borderRadius: 2,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          handleSubmit()
                        }}
                      >
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
                            onChangeText={(text) => setSearch(text)}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},

  buttonText: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  shadowView: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 }, // Sombra hacia arriba
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Necesario para Android
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default CommentForm;
