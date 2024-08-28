import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, selectTheme } from "../globalState/themeSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Eyes from "../icons/Eyes";
import UnEye from "../icons/UnEye";
import {
  setData
} from "../globalState/RegisterSlice";

// Esquema de validación de Formik usando Yup
const SignInSchema = Yup.object().shape({
  firstName: Yup.string().required("El nombre es obligatorio"),
  lastName: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("Formato de correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const darkMode = useSelector(selectTheme);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (values) => {
    const { firstName, lastName, email, password } = values;
    dispatch(setData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }))
    Toast.show({
      type: "success",
      text1: "Registro exitoso",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.container,
        {
          backgroundColor: darkMode.backgroundDark,
        },
      ]}
    >
      <StatusBar
        backgroundColor={Platform.OS === "android" ? "#000" : "#000000"}
        barStyle={Platform.OS === "android" ? "light-content" : "light-content"}
        translucent={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View
          animation="fadeInUp"
          style={styles.content}
          className="space-y-16"
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: darkMode.text,
                },
              ]}
            >
              Antes de comenzar, ingresa tu información
            </Text>
            <Text style={styles.subtitle}>
              Completa los siguientes campos para continuar con el registro.
            </Text>
          </View>
          <View>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
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
                <View style={styles.form}>
                  <View style={styles.row}>
                    <View style={styles.inputContainer}>
                      <Text
                        style={[
                          styles.label,
                          {
                            color: darkMode.text,
                          },
                        ]}
                      >
                        Nombre
                      </Text>
                      <View className=" flex-row relative">
                        <View
                          style={{ borderColor: darkMode.text }}
                          className=" border-l-2 border-b-2 h-[40%] w-6 rounded-bl-lg"
                        />
                        <View className="flex-1 flex-row items-center justify-center">
                          <AntDesign name="user" size={24} color="#06BCEE" />
                          <TextInput
                            style={[
                              styles.input,
                              touched.firstName && errors.firstName
                                ? styles.inputError
                                : styles.inputSuccess,
                              {
                                backgroundColor: darkMode.singInInputBgColor,
                                borderColor: darkMode.singInBorderColor,
                                color: darkMode.text,
                                fontFamily: "PlusJakartaSans-Bold",
                              },
                            ]}
                            onChangeText={handleChange("firstName")}
                            placeholder="Nombre"
                            onBlur={handleBlur("firstName")}
                            value={values.firstName}
                            placeholderTextColor={darkMode.textOpacity}
                          />
                        </View>
                      </View>
                      {touched.firstName && errors.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                      )}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text
                        style={[
                          styles.label,
                          {
                            color: darkMode.text,
                          },
                        ]}
                      >
                        Apellido
                      </Text>
                      <View className=" flex-row relative">
                        <View
                          style={{ borderColor: darkMode.text }}
                          className=" border-l-2 border-b-2 h-[40%] w-6 rounded-bl-lg"
                        />
                        <View className="flex-1 flex-row items-center justify-center ">
                          <AntDesign name="user" size={24} color="#06BCEE" />
                          <TextInput
                            style={[
                              styles.input,
                              touched.lastName && errors.lastName
                                ? styles.inputError
                                : styles.inputSuccess,
                              {
                                backgroundColor: darkMode.singInInputBgColor,
                                borderColor: darkMode.singInBorderColor,
                                color: darkMode.text,
                                fontFamily: "PlusJakartaSans-Bold",
                              },
                            ]}
                            placeholder="Apellido"
                            onChangeText={handleChange("lastName")}
                            onBlur={handleBlur("lastName")}
                            value={values.lastName}
                            placeholderTextColor={darkMode.textOpacity}
                          />
                        </View>
                      </View>
                      {touched.lastName && errors.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.label,
                        {
                          color: darkMode.text,
                        },
                      ]}
                    >
                      Correo electrónico
                    </Text>
                    <View className=" flex-row relative">
                      <View
                        style={{ borderColor: darkMode.text }}
                        className=" border-l-2 border-b-2 h-[40%] w-6 rounded-bl-lg"
                      />
                      <View className="flex-1 flex-row items-center justify-center space-x-2">
                        <View className="ml-2">
                          <Fontisto name="email" size={24} color="#06BCEE" />
                        </View>
                        <TextInput
                          style={[
                            styles.input,
                            touched.email && errors.email
                              ? styles.inputError
                              : styles.inputSuccess,
                            {
                              backgroundColor: darkMode.singInInputBgColor,
                              borderColor: darkMode.singInBorderColor,
                              color: darkMode.text,
                              fontFamily: "PlusJakartaSans-Bold",
                            },
                          ]}
                          placeholder="Ingresa tu correo"
                          keyboardType="email-address"
                          onChangeText={handleChange("email")}
                          onBlur={handleBlur("email")}
                          value={values.email}
                          placeholderTextColor={darkMode.textOpacity}
                        />
                      </View>
                    </View>
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: darkMode.text,
                      
                      },
                    ]}
                  >
                    Contraseña
                  </Text>
                  <View style={{ flexDirection: 'row', position: 'relative' }}>
                    <View
                      style={{
                        borderColor: darkMode.text,
                        borderLeftWidth: 2,
                        borderBottomWidth: 2,
                        height: '40%',
                        width: 24,
                        borderBottomLeftRadius: 8
                      }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
                      <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color="#06BCEE"
                      />
                      <View
                        style={[
                          styles.input,
                          {
                            borderColor: darkMode.singInBorderColor,
                            backgroundColor: darkMode.singInInputBgColor,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingHorizontal: 16,
                          },
                        ]}
                      >
                        <TextInput
                          style={[
                            touched.password && errors.password
                              ? styles.inputError
                              : styles.inputSuccess,
                            {
                              color: darkMode.text,
                              fontFamily: "PlusJakartaSans-Bold",
                              flexGrow: 1,
                              maxWidth: '100%',
                            },
                          ]}
                          secureTextEntry={!passwordVisible}
                          placeholder="Ingresa tu contraseña"
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                          placeholderTextColor={darkMode.textOpacity}
                        />
                        {values.password ? (
                          <TouchableOpacity onPress={togglePasswordVisibility}>
                            {passwordVisible ? (
                              <UnEye width={24} height={24} color={darkMode.text} />
                            ) : (
                              <Eyes width={24} height={24} color={darkMode.text} />
                            )}
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                
                  <View className=" mt-20  ">
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={{
                        backgroundColor: darkMode.buttonNext,
                        alignItems: "center",
                        borderRadius: 9999,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={[
                          styles.button,
                          {
                            color: "#fff",
                          },
                        ]}
                      >
                        Siguiente
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    color: "#888",
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 16,
  },
  form: {},
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "PlusJakartaSans-Bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 99999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexGrow: 1,
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    fontFamily: "PlusJakartaSans-SemiBold",
    textTransform: "uppercase",
    marginBottom: 3,
  },
});

export default Register;
