import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useCustomFonts from '../fonts/useCustomFonts';
import { useNavigation } from '@react-navigation/native';


const HomeSection = () => {
    const navigation = useNavigation()
    const { fontsLoaded, onLayoutRootView } = useCustomFonts();

    if (!fontsLoaded) {
        return null;
    }
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
            <View className="  w-full   flex justify-center ">
                <Text style={styles.text_title}>
                    ¡Comparte tu vehículo!
                </Text>
                <Text style={styles.text_description}>
                    Ahora puedes alquilar las plazas de tu vehículo y compartir tu ruta con otras personas. Juntos en cada kilómetro. Comparte tu espacio, comparte el viaje.
                    Hazte Quickcar
                </Text>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("Register")}
                >
                    <Text style={styles.text_button}>Hazte Quickcar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    text_title: {
        fontFamily: 'PlusJakartaSans',
        fontSize: 30,
        lineHeight: 36,
        color: "#fff",
        marginBottom: 20

    },
    text_description: {
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: 18,
        lineHeight: 24,
        color: "#fff",
        marginBottom: 20

    },
    text_button: {
        fontFamily: 'PlusJakartaSans-Bold',
        backgroundColor: '#FFCD57',
        borderRadius: 9999,
        color: '#1E293B',
        textAlign: 'center',
        justifyContent: "center",
        fontSize: 20,
        paddingVertical:10,
        paddingBottom:12,
        width: 200


    },

});

export default HomeSection;