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
  ActivityIndicator,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import Eyes from "../icons/Eyes";
import UnEye from "../icons/UnEye";
import useCustomFonts from "../fonts/useCustomFonts";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, selectTheme } from "../globalState/themeSlice";
import { setUser } from "../globalState/userSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const SignInForm = () => {
  const navigation = useNavigation();
  const darkMode = useSelector(selectTheme);
  const darkModeBolean = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { fontsLoaded } = useCustomFonts();
  if (!fontsLoaded) {
  }

  const [buttonText, setButtonText] = React.useState(false);
  const [inputColor, setInputColor] = React.useState([
    "input",
    "inputError",
    "inputSuccess",
  ]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const getImageUri = (darkModeBolean) => {
    return darkModeBolean
      ? "https://storage.googleapis.com/quickcar-storage/quickcar.jpg"
      : "https://storage.googleapis.com/quickcar-storage/quickcar-removebg-preview%20(1).png";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StatusBar
        backgroundColor={Platform.OS === "android" ? "#000" : "#000000"}
        barStyle={Platform.OS === "android" ? "light-content" : "light-content"}
        translucent={false}
      />
      <LinearGradient
        colors={["#000", "#000", "#fff1"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.1 }}
        style={{ flex: 1 }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: darkMode.singInBgColor,
              borderLeftWidth: 1,
              borderColor: darkMode.borderBox,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
            },
          ]}
        >
          <ScrollView>
            <View className="  h-[700px] items-center justify-center py-10 px-4 ">
              <TouchableOpacity
                className=" mb-12"
                onPress={() => navigation.navigate("Home")}
              >
                <View className="flex-col items-center ">
                  <Animatable.Image
                    animation="rotate"
                    easing="ease-out"
                    iterationCount="infinite"
                    iterationDelay={1000}
                    source={{ uri: getImageUri(darkModeBolean) }}
                    className="w-24 h-24"
                    resizeMode="contain"
                  />
                  <Animatable.Text
                    animation="pulse"
                    iterationDelay={1500}
                    iterationCount="infinite"
                    className=" text-4xl "
                    style={{
                      fontFamily: "Eina01-BoldItalic",
                      color: darkMode.signInTextColor,
                    }}
                  >
                    Quickcar
                  </Animatable.Text>
                </View>
              </TouchableOpacity>
              <View style={{ width: "100%" }}>
                <Animatable.Text
                  animation="fadeInDown"
                  iterationCount={1}
                  iterationDelay={2000}
                  style={[
                    styles.welcome,
                    {
                      color: darkMode.text,
                    },
                  ]}
                >
                  Iniciar Sesion
                </Animatable.Text>
              </View>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const response = await fetch(
                      "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/login",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                      }
                    );

                    if (response.ok) {
                      const data = await response.json();
      
                      await AsyncStorage.setItem("userData", JSON.stringify(data));
                      await AsyncStorage.setItem("token", data.token);

                      dispatch(
                        setUser({
                          global_user: {
                            _id: data.id,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            profile_img_url: data.profile_img_url,
                            token: data.token,
                          },
                          driver_information: data.QuickCar,
                        })
                      );
                      // Mostrar mensaje de éxito
                      Toast.show({
                        type: "success",
                        text1: "Inicio de sesión exitoso",
                        text2: "Redirigiendo...",
                      });
                      navigation.navigate('MainScreen')
                     
                      // Limpiar el formulario
                      resetForm();
                      setButtonText(false);
                    } else {
                      // Mostrar mensaje de error si las credenciales son incorrectas
                      Toast.show({
                        type: "error",
                        text1: "Error contraseña o correo incorrecto",
                        text2: "Por favor, intenta de nuevo.",
                      });
                      setButtonText(false);
                    }
                  } catch (error) {
                    // Manejar errores generales
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: "Algo salió mal. Por favor, intenta de nuevo.",
                    });
                  } finally {
                    // Establecer isSubmitting en falso para permitir nuevos envíos
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isValid,
                  isSubmitting,
                }) => (
                  <View className="flex w-full space-y-3">
                    <View
                      style={[
                        styles[
                        inputColor.email ||
                        (touched.email && errors.email
                          ? "inputError"
                          : "input")
                        ],
                        {
                          backgroundColor: darkMode.singInInputBgColor,
                          borderColor: darkMode.singInBorderColor,
                        },
                      ]}
                    >
                      <Fontisto
                        name="email"
                        size={24}
                        color={darkMode.singInEmailIconColor}
                      />
                      <TextInput
                        placeholder="Email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        style={[
                          styles.username,
                          {
                            color: darkMode.text,
                          },
                        ]}
                        placeholderTextColor={darkMode.text}
                      />
                    </View>
                    {errors.email && touched.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}
                    <View
                      style={[
                        styles[
                        inputColor.email ||
                        (touched.email && errors.email
                          ? "inputError"
                          : "input")
                        ],
                        {
                          backgroundColor: darkMode.singInInputBgColor,
                          borderColor: darkMode.singInBorderColor,
                        },
                      ]}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={24}
                        color={darkMode.singInPasswordIconColor}
                      />
                      <TextInput
                        placeholder="Contraseña"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={!passwordVisible}
                        style={[
                          styles.username,
                          {
                            color: darkMode.text,
                          },
                        ]}
                        placeholderTextColor={darkMode.text}
                      />
                      <TouchableOpacity onPress={togglePasswordVisibility}>
                        {values.password ? (
                          passwordVisible ? (
                            <UnEye
                              width={24}
                              height={24}
                              color={darkMode.text}
                            />
                          ) : (
                            <Eyes
                              width={24}
                              height={24}
                              color={darkMode.text}
                            />
                          )
                        ) : null}
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password ? (
                      <Text style={styles.error}>{errors.password}</Text>
                    ) : null}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                      >
                        <Text
                          style={[
                            styles.text,
                            {
                              color: darkMode.singInRegisterTextColor,
                            },
                          ]}
                        >
                          Regístrate
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.text_password,
                          {
                            color: darkMode.singInForgotPtextColor,
                          },
                        ]}
                      >
                        ¿Olvidaste la Contraseña?
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                        setButtonText(true);
                      }}
                      disabled={
                        !values.email ||
                        !values.password ||
                        isSubmitting ||
                        !isValid
                      }
                    >
                      <LinearGradient
                        colors={["#060097", "#06BCEE", "#c10fff"]}
                        start={{ x: 0.2, y: 0.6 }}
                        end={{ x: 1.5, y: 0 }}
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 24,
                          alignItems: "center",
                          borderRadius: 2,
                        }}
                      >
                        <View>
                          {!buttonText ? (
                            <Text
                              style={[
                                styles.buttom,
                                {
                                  color: darkMode.singInButtonTextColor,
                                },
                              ]}
                            >
                              INICIAR SESION
                            </Text>
                          ) : (
                            <View className="flex-row items-center space-x-4">
                              <Text
                                style={[
                                  styles.buttom,
                                  {
                                    color: darkMode.singInButtonTextColor,
                                  },
                                ]}
                              >
                                INICIANDO ...
                              </Text>
                              <ActivityIndicator size="small" color="#FFF" />
                            </View>
                          )}
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 20, height: 20 },
    shadowRadius: 10,
    elevation: 30,
  },

  input: {
    fontFamily: "PlusJakartaSans-Regular",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  inputError: {
    fontFamily: "PlusJakartaSans-Regular",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(255, 0, 0, 0.02)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  username: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    flex: 1,
    paddingVertical: 10,
  },
  text: {
    fontFamily: "PlusJakartaSans-SemiBold",
    color: "blue",
    fontSize: 16,
  },
  text_password: {
    fontFamily: "PlusJakartaSans-SemiBold",
    color: "blue",
    fontSize: 16,
  },
  welcome: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  buttom: {
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  error: {
    fontFamily: "PlusJakartaSans-Regular",
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
});

export default SignInForm;
