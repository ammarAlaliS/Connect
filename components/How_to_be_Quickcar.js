import { Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const How_to_be_Quickcar = ({ icon_name, title, description }) => {
    return (
        <View className="flex-col justify-center items-center pt-20 space-y-2 ">
            <FontAwesome name={icon_name} size={44} color="#060097" />
            <Text className=" text-2xl font-medium  ">{title}</Text>
            <Text className="text-center text-xl">{description}</Text>
        </View>
    )
}

export default How_to_be_Quickcar