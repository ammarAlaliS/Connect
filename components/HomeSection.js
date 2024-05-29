import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCustomFonts from '../fonts/useCustomFonts';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const HomeSection = () => {
    const navigation = useNavigation();
    const { fontsLoaded, onLayoutRootView } = useCustomFonts();

    if (!fontsLoaded) {
        return null; // Return null when fonts are not loaded
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Animatable.Image
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    iterationDelay={500}
                    source={{
                        uri: 'https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/Quickcar.png'
                    }}
                    style={styles.image}
                />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.textTitle}>
                    ¡Comparte tu vehículo!
                </Text>
                <Text style={styles.textDescription}>
                Si tienes un vehículo puedes sacarle provecho compartiendo ruta con otras personas. Juntos en cada kilómetro. Comparte tu espacio, comparte el viaje.
                </Text>
                <TouchableOpacity 
                    className='w-full  ' 
                    onPress={()=> navigation.navigate('Register')}
                
                >
                    <Text style={styles.button_one} className=" font-medium w-48 text-[#1E293B] bg-[#FFCD57] text-center text-xl p-3 rounded-[9999px] ">Hazte Quickcar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },
    image: {
        width: 350,
        height: 200,
        resizeMode: 'contain'
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal:24

    },
    textTitle: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 30,
        lineHeight: 36,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 20,
        width:'100%'
    },
    textDescription: {
        fontFamily: 'PlusJakartaSans-Medium',
        fontSize: 18,
        lineHeight: 24,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 20,
        width:'100%'
    },
    button_one: {
        fontFamily: 'PlusJakartaSans-Bold',
        
    }

});

export default HomeSection