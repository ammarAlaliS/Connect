import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import MarketScreen from './MarketScreen';
import BlogScreen from './BlogScreen';
import ProfileScreen from './ProfileScreen';
import ContactScreen from './ContactScreen';
import TravelScreen from './TravelScreen';
import MenuButton from '../components/menuButton';
import HeaderC from '../components/Header_C';
import { useSelector } from "react-redux";
import { selectTheme } from "../globalState/themeSlice";

const statusBarHeight = StatusBar.currentHeight || 0;

const HomeAppScreen = () => {
  const [activeScreen, setActiveScreen] = React.useState('Card');
  const [animation, setAnimation] = React.useState('fadeIn');
  const darkMode = useSelector(selectTheme);

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
      case "Travel":
        return <TravelScreen />;
      case "Blog":
        return <BlogScreen />;
      case "Profile":
        return <ProfileScreen />;
      case "Contact":
        return <ContactScreen darkMode={darkMode}/>;
      case "Card":
      default:
        return <Card darkMode={darkMode} activeScreen={activeScreen} handlePress={handlePress} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <HeaderC activeScreen={activeScreen} handlePress={handlePress} />
        <View style={{ backgroundColor: darkMode.backgroundDark || '#000', flex: 1 }}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAppScreen;
