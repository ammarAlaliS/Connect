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
const API_BASE_URL =
  "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/blogs";

const CommentForm = ({ blogId, token }) => {
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
    <View style={styles.shadowView} className=" rounded-t-2xl mx-2 mb-2">
      <View className="flex-row items-center space-x-2">
        <View className="h-full items-center">
          <Image
            source={{ uri: user.global_user.profile_img_url }}
            className="w-16 h-16 rounded-full bg-gray-100"
          />
          <Text
            style={{ fontFamily: "PlusJakartaSans-Bold" }}
            className="text-sm"
          >
            {user.global_user.first_name}
          </Text>
          <View className=" w-full flex-1 items-end">
            <View className=" w-[50%] flex-1 mb-4 border-l-2 border-b-2"></View>
          </View>
        </View>
        <View className="flex-1 space-y-4">
          <View className="flex-row justify-between">
            <Text
              style={{ fontFamily: "PlusJakartaSans-Bold" }}
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
                  <View className=" bg-gray-100  rounded-xl p-2 mb-4">
                    <ScrollView className=" max-h-40">
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange("comment")}
                        onBlur={handleBlur("comment")}
                        value={values.comment}
                        placeholder={placeholderText}
                        multiline
                      />
                    </ScrollView>
                  </View>
                  <View className=" pt-4  items-end justify-between  border-t-2 border-gray-200/40 flex-row">
                    <Text
                      style={{ fontFamily: "Eina01-BoldItalic" }}
                      className=" text-3xl "
                    >
                      QuickCar
                    </Text>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      className=" h-10 w-10 bg-[#8504FF] rounded-full items-center justify-center"
                    >
                      <Send size={24} color="white" style={{ marginLeft: 3 }} />
                    </TouchableOpacity>
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
    color: "#fff",
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
    backgroundColor: "#fff",
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
