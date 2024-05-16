import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../components/GlobalStyles';
import AppHeader from '../components/AppHeader';
import SelectRegister from '../components/SelectRegister';

const RegisterScreen = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,

        })
    }, [])

    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <AppHeader />

            <ScrollView
                flashScrollIndicators={false}
                className=""
            >
                <View className="  h-full flex-col  items-center justify-center py-10">
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
