import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const AppHeader = () => {
    return (
        <View className=" flex-row items-center h-28 bg-[#09009A] px-6 border-b-2 border-white/10 shadow-2xl shadow-black pt-6">
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
                <TouchableOpacity>
                    <Icon name="menu-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
  
}
const styles = StyleSheet.create({
    logo: {
        width: 80,
        height: 80,
        transform: [{ rotate: '-10deg' }], 
    },
});

export default AppHeader;
