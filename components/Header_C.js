import React from 'react';
import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const HeaderC = () => {
    return (
        <View>
            <StatusBar
                backgroundColor="#080099"
                barStyle="light-content"
                translucent
            />

            <View className=" flex-row items-center w-full px-4 bg-[#080099] h-[80px] border-b-[1px] shadow-2xl shadow-black/40 ">
                <TouchableOpacity style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Animatable.Image
                            animation="pulse"
                            easing="ease-out"
                            iterationCount="infinite"
                            iterationDelay={500}
                            source={{ uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png" }}
                            style={{ width: 65, height: 65, transform: [{ rotate: '-10deg' }] }}
                            resizeMode="contain"
                        />
                        <Text style={{ fontFamily: 'Eina01-BoldItalic', fontSize: 30, color: '#fff', marginTop: 4 }}>QuickCar</Text>
                    </View>
                </TouchableOpacity>
                <Animatable.View
                    animation="tada"
                    easing="ease-out"
                    iterationCount="infinite"
                    iterationDelay={500}
                    style={{ transform: [{ rotate: '-10deg' }], borderRadius: 9999 }}
                >
                    <Ionicons name="notifications-circle-outline" size={40} color="#FFCD57" />
                </Animatable.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default HeaderC;
