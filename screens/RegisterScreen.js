import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../components/GlobalStyles';
import AppHeader from '../components/AppHeader';
import SelectRegister from '../components/SelectRegister';
import useCustomFonts from '../fonts/useCustomFonts';

const RegisterScreen = () => {
    const navigation = useNavigation()
    const scrollViewRef = useRef(null);
    const { fontsLoaded, onLayoutRootView } = useCustomFonts();

    if (!fontsLoaded) {
        return null; 
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,

        })
    }, [])

    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
        <AppHeader scrollViewRef={scrollViewRef} />

            <ScrollView
                flashScrollIndicators={false}
                className=""
                ref={scrollViewRef}
                className=" bg-white"
            >
                <View className=" bg-white  h-full flex-col  items-center justify-center py-10">
                    <SelectRegister
                        icon_name="car"
                        icon_color="333333"
                        button_title="Registro Conductor"
                        title="¿Quieres ser conductor?"
                        description="Rellena los campos de Registro para poder alquilar las plazas de tu vehículo, compartir ruta y ganar dinero por ello."

                    />
                    <SelectRegister
                        icon_name="user-circle-o"
                        icon_color="333333"
                        button_title="Registro Usuario"
                        title="¿Quieres ser conductor?"
                        description="Porque no tienes intención de vender, ni tienes vehículo, pero sí que te interesa buscar un conductor para compartir ruta, o quizás te interese comprar un vehículo."
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default RegisterScreen;
