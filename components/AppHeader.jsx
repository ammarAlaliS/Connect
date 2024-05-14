import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from './Navbar';
import MyIcon from '../icons/MyIcon';
import { LinearGradient } from 'expo-linear-gradient';

const AppHeader = () => {
    const [navbarVisible, setNavbarVisible] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!navbarVisible);
    };

    return (
        <>

            <View className=" flex-row items-center h-28 border-b-1 border-white/5 shadow-2xl shadow-black pt-6">
                <LinearGradient
                    colors={['#060097', '#8204ff', '#c10fff']}
                    start={{ x: 0.2, y: 0.6 }}
                    end={{ x: 1.5, y: 0 }}
                    className="flex-row items-center w-full  px-6 h-full "
                >
                    <View className="flex-row items-center flex-1 space-x-2">
                        <Image
                            source={{
                                uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",

                            }}
                            style={[styles.logo]}
                            resizeMode="contain"
                        />
                        <Text className="font-bold text-3xl text-[#FFCD57] ">Quickcar</Text>
                    </View>
                    <View>

                        <TouchableOpacity onPress={toggleNavbar}>
                            {!navbarVisible ? (
                                <View className=" border-2 border-white/0 border-dotted  p-1">
                                    <Icon name="menu-outline" size={30} color="white" />
                                </View>
                            ) : (
                                <View className=" border-2 border-white/50 border-dotted p-1">
                                    <MyIcon width={30} height={30} color="white" />
                                </View>

                            )}

                        </TouchableOpacity>

                    </View>
                </LinearGradient >
            </View>

            {navbarVisible && <Navbar onClose={() => setNavbarVisible(false)} />
            }
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

