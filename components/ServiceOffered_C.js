import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ArrowRightIcon from '../icons/ArrowRightIcon '


const ServiceOffered_C = ({ img, title, description, button_title, button_color, icon_color}) => {
    return (
        <View className=" h-auto w-full mt-20   ">
            <View className="  w-auto h-[300px] ">
                <Image
                    source={{
                        uri: img,


                    }}
                    className=" h-full w-full "
                    resizeMode="cover"
                />
            </View>
            <View className="mt-4">
                <Text className=" text-xl font-semibold">{title}</Text>
                <Text className="text-base font-medium">{description}</Text>
            </View>
            <View>
                <TouchableOpacity>
               
                      <View style={{ backgroundColor: button_color, paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, 
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
