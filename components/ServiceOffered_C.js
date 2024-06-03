import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ArrowRightIcon from '../icons/ArrowRightIcon '
import { useNavigation } from '@react-navigation/native';


const ServiceOffered_C = ({ img, title, description, button_title, button_color, icon_color, screen }) => {
    const navigation = useNavigation();
    return (
        <View className=" h-auto bg-white w-full mt-20 border-2 border-gray-200/40 p-4 rounded-lg  shadow-lg shadow-black ">
            <View className="  w-full h-[300px] ">
                <Image
                    source={{
                        uri: img,


                    }}
                    className=" h-full w-full "
                    resizeMode="cover"
                />
            </View>
            <View className="mt-4 w-full space-y-2">
                <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: 20 }}>{title}</Text>
                <Text style={{ fontFamily: 'PlusJakartaSans-Medium', fontSize: 18, lineHeight: 20 }} >{description}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(screen)}
                >

                    <View className=" border-2 border-black/5 bg-blue-800 shadow-sm shadow-black/5" style={{
                        borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,
                    }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 10 }}>{button_title}</Text>
                        <ArrowRightIcon width={40} height={40} color={icon_color} />
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ServiceOffered_C;
