import React from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import MarketScreen from "./MarketScreen";
import BlogScreen from "./BlogScreen";
import ProfileScreen from "./ProfileScreen";
import ContactScreen from "./ContactScreen";
import MenuButton from "../components/menuButton";
import HeaderC from "../components/Header_C";
import TravelScreen from "./TravelScreen";

const statusBarHeight = StatusBar.currentHeight || 0;

const HomeAppScreen = () => {
  const [activeScreen, setActiveScreen] = React.useState("Card");
  const [animation, setAnimation] = React.useState("fadeIn");

  const handlePress = (screen) => {
    setAnimation("fadeOut");
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimation("fadeIn");
    }, 100);
  };

  const renderContent = () => {
    switch (activeScreen) {
      case "Store":
        return <MarketScreen />;
      case "Blog":
        return <BlogScreen />;
      case "Profile":
        return <ProfileScreen />;
      case "Contact":
        return <ContactScreen />;
      case "Card":
      default:
        return <TravelScreen />;
      // return <Card />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <HeaderC />
        <View style={{ flex: 1, backgroundColor: "#F9F6FE" }}>
          {renderContent()}
        </View>
      </View>
      <MenuButton activeScreen={activeScreen} handlePress={handlePress} />
    </SafeAreaView>
  );
};

export default HomeAppScreen;
