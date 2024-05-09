import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AppHeader = () => {
    return (
        <View>
            <View className=" flex-row py-3 items-center justify-center mx-4 space-x-2">

                <View className="flex-1 ">
                    <Text className="font-bold text-3xl text-white">Quickcar</Text>

                </View>
                <Icon name="menu-outline" size={30} color="white" />
            </View>
        </View>
    );
}

export default AppHeader;
