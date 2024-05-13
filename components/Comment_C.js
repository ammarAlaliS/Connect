import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Comment_C = ({ img, description, title }) => {
    return (
        <View className=" flex-col justify-center items-center space-y-4 mb-10 mt-10">
            <Image
                source={{
                    uri: img,
                }}
                className=" w-20 h-20"
                resizeMode="cover"
            />
            <Text className=" text-2xl text-center font-semibold text-[#6C7B92]">{description}</Text>
            <Text className="text-xl font-bold text-[#67768E]">{title}</Text>

        </View>
    )
}

export default Comment_C

