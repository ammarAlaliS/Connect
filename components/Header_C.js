import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, selectTheme, selectDarkMode } from "../globalState/themeSlice";
import { CommonActions } from "@react-navigation/native";
import { clearUser } from "../globalState/userSlice";
import { clearBlogs } from "../globalState/blogsSlice";
import { FontAwesome } from "@expo/vector-icons";
import MenuButton from "./menuButton";

const HeaderC = ({ activeScreen, handlePress }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectTheme);
  const darkModeBoleanState = useSelector(selectDarkMode);
  const headerVisible = useSelector((state) => state.header.headerVisible);
  const [tokenAsyc, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (typeof storedToken === 'string') {
          setToken(storedToken);
        } else {
          console.error("Token no es una cadena válida");
        }
      } catch (error) {
        console.error("Error al recuperar el token:", error);
      }
    };

    fetchToken();
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Iniciando cierre de sesión");
      if (typeof tokenAsyc === 'string') {
        await AsyncStorage.removeItem("token");
        dispatch(clearUser());
        dispatch(clearBlogs());

        navigation.navigate('SignInForm')
      } else {
        console.error("Token inválido al intentar cerrar sesión:", tokenAsyc);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      navigation.navigate('SignInForm')
    }
  };
  
  
  
  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View
      style={[{ borderBottomWidth:1, borderColor: darkMode.borderBox }]}
    >
      <StatusBar
        backgroundColor={darkMode.background}
        barStyle={darkModeBoleanState ? 'light-content': 'dark-content'}
        translucent
      />
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: darkMode.background },
        ]}
      >
        <TouchableOpacity style={{ flex: 1 }}>
          <View className=" flex-row items-center">
            <View>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/quickcar-storage/quickcar-removebg-preview%20(1).png",
                }}
                style={{
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.title, { color: darkMode.text }]}>
                QuickCar
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <Ionicons
            name="notifications-circle-outline"
            size={40}
            color={
              darkMode.darkMode ? darkMode.colors.dark.icon : darkMode.icon
            }
          />
          <TouchableOpacity onPress={toggleDarkModeHandler}>
            <FontAwesome
              name={darkModeBoleanState ? "sun-o" : "moon-o"}
              size={32}
              color={
                darkModeBoleanState ? '#FFD900' : '#000'
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <AntDesign name="logout" size={30} color="#FF2121" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <MenuButton
          activeScreen={activeScreen}
          handlePress={handlePress}
          toggleDarkModeHandler={toggleDarkModeHandler}
          darkMode={darkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    height: 45,
  },
  logo: {
    width: 65,
    height: 65,
    transform: [{ rotate: "-10deg" }],
  },
  title: {
    fontFamily: "Eina01-BoldItalic",
    fontSize: 28,
    color: "#fff",
    marginTop: 10,
  },
});

export default HeaderC;
