import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { selectTheme } from "../globalState/themeSlice";
import Fontisto from "@expo/vector-icons/Fontisto";
import * as Animatable from "react-native-animatable";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileScreenPreview = () => {
  const userName = useSelector((state) => state.register.firstName);
  const userLastName = useSelector((state) => state.register.lastName);
  const email = useSelector((state) => state.register.email);
  const password = useSelector((state) => state.register.password);
  const [selectedRole, setSelectedRole] = useState("user");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePresentation, setProfileImagePresentation] = useState("");
  const darkMode = useSelector(selectTheme);
  const [bioText, setBioText] = useState("");
  const numberOfCharacters = password.length;
  const [showPassword, setShowPassword ]  = useState(true)
  const handleImageSelect = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Lo sentimos, necesitamos permisos para acceder a tu galería."
      );
      return;
    }

    // Seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      // Imagen seleccionada
      setProfileImage(result.assets[0].uri);
    } else {
      // Manejo de cancelación o error
      Alert.alert("Se ha cancelado la seleccion de foto");
    }
  };

  const handleImageSelected = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Lo sentimos, necesitamos permisos para acceder a tu galería."
      );
      return;
    }

    // Seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      // Imagen seleccionada
      setProfileImagePresentation(result.assets[0].uri);
    } else {
      // Manejo de cancelación o error
      Alert.alert("Se ha cancelado la seleccion de foto");
    }
  };

  return (
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
                profileImagePresentation
                  ? { uri: profileImagePresentation }
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
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/imgs/carretera.webp")
                }
                style={
                  profileImage
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
                  <Picker.Item label="Usuario" value="Usuario" />
                  <Picker.Item label="Conductor" value="Conductor" />
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
              style={styles.bioInput}
              multiline
              placeholder="Describete aquí.."
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
                  },
                ]}
              >
                {email}
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
                    flex:1,
                    textAlignVertical: 'center'

                  },
                ]}
              >

              {
                showPassword 
                ?  "*".repeat(numberOfCharacters)
                : password
                
              }
             
              </Text>
             {
              showPassword
              ?(
                <TouchableOpacity onPress={()=>{
                  setShowPassword(false)
                }}>
                  <Text  style ={{
                      color: darkMode.textOpacity,
                      fontSize: 14,
                      fontFamily: "PlusJakartaSans-Bold",
                      borderWidth:1,
                      borderColor:darkMode.borderBox,
                      padding:2,
                      paddingHorizontal:6
                    }}>
                    Mostrar
                    </Text>
                </TouchableOpacity>
              ):(
                <TouchableOpacity onPress={()=>{
                  setShowPassword(true)
                }}>
                  <Text  style ={{
                      color: darkMode.textOpacity,
                      fontSize: 14,
                      fontFamily: "PlusJakartaSans-Bold",
                      borderWidth:1,
                      borderColor:darkMode.borderBox,
                      padding:2,
                      paddingHorizontal:6
                    }}>
                    Ocultar
                    </Text>
                </TouchableOpacity>
              )
             }
            </View>
          </View>
        </Animatable.View>
        <View className=" mt-20  mx-4 ">
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
              navigation.navigate("ProfileScreenPreview");
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
              Crear cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    textAlignVertical: "top", // Alinea el texto en la parte superior del TextInput
    fontSize: 16,
    color: "#333",
    borderRadius: 8,
  },
  placeholderImage: {
    backgroundColor: "#d3d3d3", // Color gris claro para la imagen de perfil cuando no hay imagen
  },
});

export default ProfileScreenPreview;
