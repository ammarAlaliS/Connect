import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = () => {
    return (
        <View>
            <View className=" mt-9 flex-row py-3 items-center justify-center mx-6 space-x-2">

                <View className="flex-1 ">
                    <Text className="font-bold text-3xl text-white ">Quickcar</Text>

                </View>
                <TouchableOpacity>
                <Icon name="menu-outline" size={30} color="white" />
                </TouchableOpacity>
               
            </View>
        </View>
    );
}

export default AppHeader;
