import React from 'react';
import { View,  StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import MarketScreen from './MarketScreen';
import BlogScreen from './BlogScreen';
import ProfileScreen from './ProfileScreen'
import ContactScreen from './ContactScreen'
import MenuButton from '../components/menuButton';
import HeaderC from '../components/Header_C';
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, selectTheme } from "../globalState/themeSlice";

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
      case "Blog":
        return <BlogScreen />;
      case "Profile":
        return <ProfileScreen />;
      case "Contact":
        return <ContactScreen />;
      case "Card":
      default:
        return <Card  darkMode={darkMode}/>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <HeaderC activeScreen={activeScreen} handlePress={handlePress}/>
        <View  style={{ backgroundColor: darkMode.backgroundDark , flex:1 }}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAppScreen;
