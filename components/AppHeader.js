import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const AppHeader = () => {
    return (
        <View className=" bg-[#09009A] border-b-2 border-white/10 shadow-2xl shadow-black">
            <View className=" mt-11 mb-5 flex-row items-center justify-center mx-6 space-x-2 ">

                <View className="flex-1 ">
                    <Text className="font-bold text-3xl text-[#FFCD57] ">Quickcar</Text>

                </View>
                <TouchableOpacity>
                    <Icon name="menu-outline" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AppHeader;
