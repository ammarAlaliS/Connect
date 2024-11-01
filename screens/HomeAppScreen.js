import React from 'react';
import { View, Text, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import useCustomFonts from '../fonts/useCustomFonts';
import UserIcon from '../icons/UserIcon';
import StoreIcon from '../icons/StoreIcon';
import BlogIcon from '../icons/BlogIcon';
import ContactIcon from '../icons/ContactIcon';
import LogginIcon from '../icons/LogginIcon';
import Card from '../components/Card';

const statusBarHeight = StatusBar.currentHeight || 0;

const HomeAppScreen = () => {
  // Obtener los datos del usuario del estado global de Redux
  const user = useSelector(state => state.user);
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#3205ff"
          barStyle="light-content"
          translucent
        />
        <View
          className=" flex-row items-center w-full px-[24px] bg-[#3205ff] h-[80px] border-b-[1px] shadow-2xl shadow-black/40 "
        >
          <TouchableOpacity style={{ flex: 1 }}>
            <View className="flex-row items-center flex-1 space-x-2">
              <Animatable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                iterationDelay={500}
                source={{
                  uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                }}
                style={{
                  width: 65,
                  height: 65,
                  transform: { rotate: '-10deg' }
                }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily: 'Eina01-BoldItalic' }} className=" text-3xl text-[#fff]  mt-4">QuickCar</Text>
            </View>
          </TouchableOpacity>
          <Animatable.View
            animation="tada"
            easing="ease-out"
            iterationCount="infinite"
            iterationDelay={500}
            style={{
              transform: [{ rotate: '-10deg' }],
              borderRadius: 9999
            }}
          >
            <Ionicons name="notifications-circle-outline" size={40} color="#FFCD57" />
          </Animatable.View>
        </View>


        <View style={{ flex: 1, backgroundColor: '#F9F6FE', paddingVertical: 6 }}>
          <Card />
        </View>

        
        <View

          className=" flex-row items-center w-full px-[24px] bg-[#3205ff] h-[80px] border-t-[1px] shadow-2xl shadow-black/40 justify-between "
        >
          <TouchableOpacity
            className=" "
          >
            <View className=" flex items-center justify-center px-2 space-y-1  ">
              <StoreIcon width={28} height={28} color="#FFF" />
              <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold' }} className="text-xs text-[#fff]">Tienda</Text>
            </View>

          </TouchableOpacity>


          <TouchableOpacity
            className=" "
          >
            <View className=" flex items-center justify-center px-2 space-y-1 ">
              <BlogIcon width={28} height={28} color="#FFF" />
              <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold' }} className="text-xs text-[#fff]">Blog</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity

          >
            <View className=" flex items-center justify-center px-2 space-y-1 ">
              <UserIcon width={28} height={28} color="#fff" />
              <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold' }} className=" text-xs text-[#fff]">Perfil</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity
            className=" "
          >
            <View className=" flex items-center justify-center px-2 space-y-1 ">
              <ContactIcon width={28} height={28} color="#FFF" />
              <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold' }} className="text-xs text-[#fff]">Contacto</Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            className=" "
          >
            <View className=" flex items-center justify-center px-2 space-y-1">
              <LogginIcon width={28} height={28} color="#FFF" />
              <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold' }} className="text-xs text-[#fff]">Salir</Text>
            </View>

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAppScreen;
