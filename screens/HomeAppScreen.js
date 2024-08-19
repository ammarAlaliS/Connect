import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import MarketScreen from "./MarketScreen";
import BlogScreen from "./BlogScreen";
import ProfileScreen from "./ProfileScreen";
import ContactScreen from "./ContactScreen";
import TravelScreen from "./TravelScreen";
import HeaderC from "../components/Header_C";
import { useSelector } from "react-redux";
import { selectTheme } from "../globalState/themeSlice";
import useLocation from "../hooks/useLocation";
import useCustomFonts from "../fonts/useCustomFonts";

const statusBarHeight = StatusBar.currentHeight || 0;

const HomeAppScreen = () => {
  const [activeScreen, setActiveScreen] = useState("Card");
  const [animation, setAnimation] = useState("fadeIn");
  const darkMode = useSelector(selectTheme);
  const { fontsLoaded } = useCustomFonts();
  const { RequestLocationPermissions } = useLocation();

  useEffect(() => {
    RequestLocationPermissions();
  }, [RequestLocationPermissions]);

  if (!fontsLoaded) {
    return null; // Asegúrate de que el componente no hace nada más si las fuentes no están cargadas
  }

  function handlePress(screen) {
    setAnimation("fadeOut");
    setActiveScreen(screen);
    setAnimation("fadeIn");
  }

  const renderContent = () => {
    switch (activeScreen) {
      case "Store":
        return <MarketScreen darkMode={darkMode} />;
      case "Travel":
        return <TravelScreen />;
      case "Blog":
        return <BlogScreen darkMode={darkMode} />;
      case "Profile":
        return <ProfileScreen />;
      case "Contact":
        return <ContactScreen darkMode={darkMode} />;
      case "Card":
      default:
        return (
          <Card
            darkMode={darkMode}
            activeScreen={activeScreen}
            handlePress={handlePress}
          />
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <HeaderC activeScreen={activeScreen} handlePress={handlePress} darkMode={darkMode} />
        <View
          style={{
            backgroundColor: darkMode.backgroundDark || "#000",
            flex: 1,
          }}
        >
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAppScreen;
