import React from 'react';
import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import useCustomFonts from '../fonts/useCustomFonts';
import Card from '../components/Card';
import MarketScreen from './MarketScreen';
import BlogScreen from './BlogScreen';
import ProfileScreen from './ProfileScreen'
import ContactScreen from './ContactScreen'
import MenuItem from '../components/MenuItem';

const statusBarHeight = StatusBar.currentHeight || 0;



const HomeAppScreen = () => {
  const [activeScreen, setActiveScreen] = React.useState('Card');
  const [animation, setAnimation] = React.useState('fadeIn');

  const handlePress = (screen) => {
    setAnimation('fadeOut');
    setTimeout(() => {
      setActiveScreen(screen);
      setAnimation('fadeIn');
   
    }, 100);
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'Store':
        return <MarketScreen />;
      case 'Blog':
        return <BlogScreen />;
      case 'Profile':
        return <ProfileScreen />;
      case 'Contact':
        return <ContactScreen />;
      case 'Card':
      default:
        return <Card />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#080099"
          barStyle="light-content"
          translucent
        />
        <View className=" flex-row items-center w-full px-4 bg-[#080099] h-[80px] border-b-[1px] shadow-2xl shadow-black/40 ">
          <TouchableOpacity style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Animatable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={500}
                source={{ uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png" }}
                style={{ width: 65, height: 65, transform: [{ rotate: '-10deg' }] }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily: 'Eina01-BoldItalic', fontSize: 30, color: '#fff', marginTop: 4 }}>QuickCar</Text>
            </View>
          </TouchableOpacity>
          <Animatable.View
            animation="tada"
            easing="ease-out"
            iterationCount="infinite"
            iterationDelay={500}
            style={{ transform: [{ rotate: '-10deg' }], borderRadius: 9999 }}
          >
            <Ionicons name="notifications-circle-outline" size={40} color="#FFCD57" />
          </Animatable.View>
        </View>

        <View style={{ flex: 1, backgroundColor: '#F9F6FE', paddingVertical: 6 }}>
          {renderContent()}
        </View>
        <View style={{ width: '100%', backgroundColor: '#080099' }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className=" flex-row items-center w-full  bg-[#080099] px-4 py-2 border-t-[1px] shadow-2xl shadow-black/40 justify-between ">
              <View style={activeScreen === 'Card' ? styles.activeMenuItem : styles.menuItem}>
                <MenuItem
                  iconName="HomeIcon"
                  iconWidth={32}
                  iconHeight={28}
                  iconColor={activeScreen === 'Card' ? '#FFCD57': '#fff'}
                  titleColor={activeScreen === 'Card'? '#FFCD57': '#fff' }
                  iconTitle="Inicio"
                  onPress={() => handlePress('Card')}
                />
              </View>
              <View style={activeScreen === 'Profile' ? styles.activeMenuItem : styles.menuItem}>
                <MenuItem
                  iconName="UserIcon"
                  iconWidth={32}
                  iconHeight={28}
                  iconColor={activeScreen === 'Profile' ? '#FFCD57': '#fff'}
                  titleColor={activeScreen === 'Profile'? '#FFCD57': '#fff' }
                  iconTitle="Perfil"

                  onPress={() => handlePress('Profile')}
                />
              </View>
              <View style={activeScreen === 'Store' ? styles.activeMenuItem : styles.menuItem}>
                <MenuItem
                  iconName="StoreIcon"
                  iconWidth={32}
                  iconHeight={28}
                  iconColor={activeScreen === 'Store' ? '#FFCD57': '#fff'}
                  titleColor={activeScreen === 'Store'? '#FFCD57': '#fff' }
                  iconTitle="Tienda"
                  onPress={() => handlePress('Store')}
                />
              </View>
              <View style={activeScreen === 'Blog' ? styles.activeMenuItem : styles.menuItem}>
                <MenuItem
                  iconName="BlogIcon"
                  iconWidth={32}
                  iconHeight={28}
                  iconColor={activeScreen === 'Blog' ? '#FFCD57': '#fff'}
                  titleColor={activeScreen === 'Blog'? '#FFCD57': '#fff' }
                  iconTitle="Blog"
                  onPress={() => handlePress('Blog')}
                />
              </View>
              <View style={activeScreen === 'Contact' ? styles.activeMenuItem : styles.menuItem}>
                <MenuItem
                  iconName="ContactIcon"
                  iconWidth={32}
                  iconHeight={28}
                  iconColor={activeScreen === 'Contact' ? '#FFCD57': '#fff'}
                  titleColor={activeScreen === 'Contact'? '#FFCD57': '#fff' }
                  iconTitle="Chat"
                  onPress={() => handlePress('Contact')}
                />
              </View>
              
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: 'transparent',
    borderRadius: 5,

  },
  activeMenuItem: {
    backgroundColor:'rgba(100, 200, 230, 0.5)',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(244, 244, 244, 1)',
  },
});

export default HomeAppScreen;