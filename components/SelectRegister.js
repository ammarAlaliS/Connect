import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const SelectRegister = ({ icon_name, button_title, icon_color, title, description }) => {
    return (
        <View className= "  items-center justify-center px-6 flex-1 space-y-4 py-5">
            <FontAwesome name={icon_name} size={44} color={icon_color} />
            <TouchableOpacity >
                <Text className=" bg-[#FFCD57] px-6 py-4 rounded-full text-lg font-semibold ">{button_title}</Text>
            </TouchableOpacity>
            <Text className=" text-2xl font-semibold text-[#5B595D]  ">{title}</Text>
            <Text className="text-center text-xl font-medium text-[#6C7B92]">{description}</Text>
        </View>
    )
}

export default SelectRegister