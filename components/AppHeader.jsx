import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MyIcon from '../icons/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { toggleNavbar } from '../globalState/navbarSlice';
import * as Animatable from 'react-native-animatable';
import Navbar from './Navbar';
import useCustomFonts from '../fonts/useCustomFonts';

const statusBarHeight = StatusBar.currentHeight || 0;

const AppHeader = ({ scrollViewRef }) => {
    const navigation = useNavigation()
    const navbarVisible = useSelector(state => state.navbar.visible);
    const dispatch = useDispatch();
    const { fontsLoaded, onLayoutRootView } = useCustomFonts();

    if (!fontsLoaded) {
        return null; 
    }

    const handleToggleNavbar = () => {
        dispatch(toggleNavbar());
    };



    return (
        <>
            <View className="flex-row items-center h-24 border-b-1 border-white/5 shadow-2xl shadow-black">
                <LinearGradient
                    colors={['#060097', '#8204ff', '#c10fff']}
                    start={{ x: 0.2, y: 0.6 }}
                    end={{ x: 1.5, y: 0 }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        height:'100%'
                    }}

                >
                    <StatusBar
                        backgroundColor="transparent"
                        barStyle="light-content"
                        translucent
                    />
                    <View  style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 24,
                        marginTop:statusBarHeight,
                    }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate("Home")}>
                            <View className="flex-row items-center flex-1 space-x-2">
                                <Animatable.Image
                                    animation="tada"
                                    easing="ease-out"
                                    iterationCount="infinite"
                                    iterationDelay={500}
                                    source={{
                                        uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                                    }}
                                    style={[styles.logo]}
                                    resizeMode="contain"
                                />
                                <Text style={{fontFamily:'Eina01-BoldItalic'}} className=" text-3xl text-[#fff] ">QuickCar</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={handleToggleNavbar}>
                                {!navbarVisible ? (
                                    <View className=" border-2 border-white/0 border-dotted  p-1">
                                        <Icon name="menu-outline" size={40} color="white" />
                                    </View>
                                ) : (
                                    <View className=" border-2 border-white/50 border-dotted p-1">
                                        <MyIcon width={30} height={30} color="white" />
                                    </View>

                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            {navbarVisible && <Navbar />}
        </>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        transform: [{ rotate: '-10deg' }],
    },
});

export default AppHeader;