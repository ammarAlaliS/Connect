import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet  } from 'react-native';


const HomeSection = () => {
    return (
        <View className=" flex-1 items-center justify-center mb-10 mx-6">
            <View className=" w-full flex items-center mb-10 ">
                <Image

                    source={{
                        uri: 'https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/Quickcar.png'
                    }}
                    className=" w-[350px]  h-[200px] object-contain"
                />
            </View>
            <View className="  w-full  flex justify-center ">
                <Text className="  text-3xl text-white mb-5 font-bold">
                    ¡Comparte tu vehículo!
                </Text>
                <Text className=" text-base text-white mb-5 font-medium">
                Ahora puedes alquilar las plazas de tu vehículo y compartir tu ruta con otras personas. Juntos en cada kilómetro. Comparte tu espacio, comparte el viaje.
                Hazte Quickcar
                </Text>
                <TouchableOpacity >
                    <Text className=" font-medium w-48 text-[#1E293B] bg-[#FFCD57] mt-3 text-center text-xl p-3 rounded-[9999px] ">Hazte Quickcar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeSection;
