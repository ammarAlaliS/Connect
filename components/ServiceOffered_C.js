import { View, Text, Image } from 'react-native'
import React from 'react'

const ServiceOffered_C = ({img, title, description }) => {
    return (
        <View className=" h-auto w-full mt-20   ">
            <View className="  w-auto h-[300px] ">
                <Image
                    source={{
                        uri: img,

                    }}
                    className=" h-full w-full "
                />
            </View>
            <View className="mt-4">
                <Text className=" text-xl font-semibold">{title}</Text>
                <Text className="text-base font-medium">{description}</Text>
            </View>
        </View>
    );
};

export default ServiceOffered_C;
