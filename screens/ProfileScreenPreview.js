import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { selectTheme } from "../globalState/themeSlice";
import Fontisto from "@expo/vector-icons/Fontisto";
import * as Animatable from "react-native-animatable";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import VerifyEmailComponent from "../components/RegisterComponents/VerifyEmailComponent";
import axios from "axios";

const ProfileScreenPreview = () => {
  const userName = useSelector((state) => state.register.firstName);
  const userLastName = useSelector((state) => state.register.lastName);
  const email = useSelector((state) => state.register.email);
  const password = useSelector((state) => state.register.password);

  const [selectedRole, setSelectedRole] = useState("user");
  const [bioText, setBioText] = useState("");

  const darkMode = useSelector(selectTheme);
  const numberOfCharacters = password.length;
  const [showPassword, setShowPassword] = useState(true);
  const bsRef = useRef(null);
  const snapPoints = useMemo(() => ["70%"], []);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePresentationFile, setProfileImagePresentationFile] =
    useState(null);

  const handleSubmitDataToCreateAnewAccount = async () => {
    try {
      

      const formData = new FormData();
      formData.append("first_name", userName);
      formData.append("last_name", userLastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", selectedRole);
      formData.append("user_description", bioText);

      if (profileImageFile) {
        formData.append("profile_img_url", {
          uri: profileImageFile.uri,
          type: "image/jpeg",
          name: "profile_img.jpg",
        });
      }

      if (profileImagePresentationFile) {
        formData.append("presentation_img_url", {
          uri: profileImagePresentationFile.uri,
          type: "image/jpeg",
          name: "presentation_img_url",
        });
      }
      
      console.log(formData)
      const response = await fetch(
        "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Cuenta creada exitosamente:", data);
      } else {
        const errorData = await response.json();
        console.error(
          "Error al crear la cuenta:",
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleImageSelect = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Lo sentimos, necesitamos permisos para acceder a tu galería.");
      return;
    }

    // Seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImageFile(result.assets[0]);
    }
  };

  const handleImageSelected = async () => {
     // Solicitar permisos para acceder a la galería
     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     if (status !== "granted") {
       alert("Lo sentimos, necesitamos permisos para acceder a tu galería.");
       return;
     }
     // Seleccionar una imagen
     const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       quality: 1,
     });
 
     if (!result.canceled) {
      setProfileImagePresentationFile(result.assets[0]);
     }
  };

  const closeBottomSheet = () => {
    bsRef.current?.close();
  };

  const handleSheetChanges = (index) => {
    console.log("Bottom sheet changed to index:", index);
    // Aquí puedes agregar cualquier lógica adicional que necesites cuando el BottomSheet cambie.
  };

  return (
    <SafeAreaView className=" h-full">
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: darkMode.backgroundDark,
          },
        ]}
      >
        <View>
          <View style={styles.coverContainer}>
            <TouchableOpacity onPress={handleImageSelected}>
              <Image
                size={80}
                source={
                  profileImagePresentationFile
                    ? { uri: profileImagePresentationFile.uri }
                    : require("../assets/imgs/carretera.webp")
                }
                style={styles.coverImage}
              />
            </TouchableOpacity>

            <View style={styles.coverOverlay} />
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleImageSelect}>
                <Avatar.Image
                  size={80}
                  source={
                    profileImageFile
                      ? { uri: profileImageFile.uri }
                      : require("../assets/imgs/carretera.webp")
                  }
                  style={
                    profileImageFile
                      ? { borderWidth: 1, borderColor: darkMode.borderBox }
                      : styles.placeholderImage
                  }
                />
              </TouchableOpacity>
              <View style={styles.profileInfo} className="mt-20">
                <Text style={styles.profileName}>
                  {userName} {userLastName}
                </Text>
                <View className=" flex-row items-center space-x-2">
                  <Text style={styles.label} className=" mt-1">
                    Seleccione:
                  </Text>
                  <Picker
                    selectedValue={selectedRole}
                    onValueChange={(itemValue) => setSelectedRole(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#FFF"
                  >
                    <Picker.Item label="Usuario" value="user" />
                    <Picker.Item label="Conductor" value="driver" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          <Animatable.View animation="fadeInUp">
            <View style={styles.bioContainer}>
              <Text
                style={[
                  {
                    color: darkMode.text,
                    marginBottom: 16,
                    fontSize: 20,
                    fontFamily: "PlusJakartaSans-Bold",
                  },
                ]}
              >
                "Agrega una descripción de ti mismo."
              </Text>
              <TextInput
                style={[styles.bioInput, { color: darkMode.text }]}
                multiline
                placeholder={`Describete aquí... Este campo es opcional`}
                value={bioText}
                onChangeText={setBioText}
                placeholderTextColor={darkMode.textOpacity}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={[
                  {
                    color: darkMode.text,
                    marginBottom: 16,
                    fontSize: 20,
                    fontFamily: "PlusJakartaSans-Bold",
                  },
                ]}
              >
                Tu correo
              </Text>
              <View className=" flex-row items-center space-x-2 pl-4">
                <View className="ml-2">
                  <Fontisto name="email" size={24} color="#06BCEE" />
                </View>
                <Text
                  style={[
                    {
                      color: darkMode.textOpacity,

                      fontSize: 16,
                      fontFamily: "PlusJakartaSans-Bold",
                      flex: 1,
                    },
                  ]}
                >
                  {email}
                </Text>

                <Text
                  style={{
                    color: "rgba(255, 38, 38, 0.5)",
                    fontSize: 14,
                    fontFamily: "PlusJakartaSans-Bold",
                    borderWidth: 1,
                    borderColor: "rgba(255, 38, 38, 0.5)",
                    padding: 2,
                    paddingHorizontal: 6,
                    backgroundColor: "rgba(255, 38, 38, 0.2)",
                  }}
                >
                  No verificado
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 16,
              }}
            >
              <Text
                style={[
                  {
                    color: darkMode.text,
                    marginBottom: 16,
                    fontSize: 20,
                    fontFamily: "PlusJakartaSans-Bold",
                  },
                ]}
              >
                Tu contraseña
              </Text>
              <View className=" flex-row items-center space-x-2 pl-4">
                <View className="ml-2">
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color="#06BCEE"
                  />
                </View>
                <Text
                  style={[
                    {
                      color: darkMode.textOpacity,
                      fontSize: 14,
                      fontFamily: "PlusJakartaSans-Bold",
                      flex: 1,
                      textAlignVertical: "center",
                    },
                  ]}
                >
                  {showPassword ? "*".repeat(numberOfCharacters) : password}
                </Text>
                {showPassword ? (
                  <TouchableOpacity
                    onPress={() => {
                      setShowPassword(false);
                    }}
                  >
                    <Text
                      style={{
                        color: darkMode.textOpacity,
                        fontSize: 14,
                        fontFamily: "PlusJakartaSans-Bold",
                        borderWidth: 1,
                        borderColor: darkMode.borderBox,
                        padding: 2,
                        paddingHorizontal: 6,
                      }}
                    >
                      Mostrar
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setShowPassword(true);
                    }}
                  >
                    <Text
                      style={{
                        color: darkMode.textOpacity,
                        fontSize: 14,
                        fontFamily: "PlusJakartaSans-Bold",
                        borderWidth: 1,
                        borderColor: darkMode.borderBox,
                        padding: 2,
                        paddingHorizontal: 6,
                      }}
                    >
                      Ocultar
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animatable.View>
          <View className=" mt-20  mx-4 space-y-4 ">
            <TouchableOpacity
              onPress={() => {
                bsRef.current?.expand();
              }}
              style={{
                backgroundColor: darkMode.buttonNext,
                alignItems: "center",
                borderRadius: 9999,
                padding: 10,
              }}
            >
              <Text
                style={[
                  {
                    color: "#fff",
                    fontFamily: "PlusJakartaSans-SemiBold",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  },
                ]}
              >
                Verificar Correo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: darkMode.buttonNext,
                alignItems: "center",
                borderRadius: 9999,
                padding: 10,
              }}
              onPress={handleSubmitDataToCreateAnewAccount}
            >
              <Text
                style={[
                  {
                    color: "#fff",
                    fontFamily: "PlusJakartaSans-SemiBold",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  },
                ]}
              >
                Crear cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bsRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <VerifyEmailComponent darkMode={darkMode} />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  coverContainer: {
    height: 300,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  coverOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  profileContainer: {
    position: "absolute",
    bottom: 8,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  rolePickerContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  picker: {
    width: 160,
    color: "#FFF",
    borderRadius: 9999,
  },
  bioContainer: {
    padding: 16,
  },
  bioText: {
    fontSize: 16,
    color: "#666",
  },
  placeholderImage: {
    backgroundColor: "#d3d3d3",
  },
  bioInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
    borderRadius: 8,
  },
  placeholderImage: {
    backgroundColor: "#d3d3d3",
  },
});

export default ProfileScreenPreview;
