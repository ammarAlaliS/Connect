import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import HomeSection from '../components/HomeSection';
import ServiceOffered_C from '../components/ServiceOffered_C';
import Comment_C from '../components/Comment_C';
import How_to_be_Quickcar from '../components/How_to_be_Quickcar';






const HomeScreen = () => {
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
            >
                <View className=" relative max-h-[720px]">
                    <LinearGradient
                        colors={['rgb(6, 0, 151)', 'rgb(130, 4, 255)', 'rgb(193, 15, 255)']}
                        start={{ x: 1, y: 4 }}
                        end={{ x: 8, y: 5 }}
                        className=" max-h-[720px] h-full "
                    >

                        <HomeSection />
                    </LinearGradient>
                </View>
                <View className="flex bg-white items-center h-auto py-20 w-full px-6 flex-1">
                    <Text className=" text-3xl font-bold w-full text-center ">¿Qué puedes encontrar aquí?</Text>

                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/comprar-coches-usados-1.jpg"
                        title="Tienda Vehiculos"
                        description="Tu tienda para comprar o vender vehiculos de segunda mano"
                        button_title="Explorar Tienda"
                        button_color="#09009A"
                        icon_color="#FFCD57"

                    />


                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/comparte_coche.jpg"
                        title="Vehículos cerca de ti"
                        description="Busca conductores cerca de ti, alquila una plaza y comparte ruta."
                        button_title="Conocer Servicio"
                        button_color="#FFCD57"
                        icon_color="#FFFFFF"


                    />


                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/blog.jpg"
                        title="Artículos sobre motor"
                        description="Para estar al día en el mundo del motor, podrás leer nuestros consejos y trucos."
                        button_title="Ver Más"
                        button_color="#09009A"
                        icon_color="#FFCD57"

                    />



                </View>

                <View className="flex-col bg-[#F9F6FE] items-center h-auto  w-full px-6 py-10 ">

                    <Comment_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/themes/astra/inc/assets/images/starter-content/avatar.png"
                        description="“The best part is that Astra comes with hundreds of professionally designed templates for just about every industry, makes it super easy for non-techy users to build a website.”"
                        title="Wade Warren"
                    />

                </View>

                <View className="flex-col bg-white items-center justify-center h-auto  w-full px-6 pb-20   ">

                    <Text className="text-3xl text-center font-bold pt-20 ">Cómo ser Conductor Quickcar</Text>
                    <How_to_be_Quickcar
                        icon_name="user-circle"
                        title="Regístrate"
                        description="Crea tu cuenta de conductor. Introduce los datos y sube una imagen personal y tu carnet de conducir. Ya estarás listo para compartir viaje."
                    />

                    <How_to_be_Quickcar
                        icon_name="car"
                        title="Comparte Ruta"
                        description="Espera a que alguien contacte contigo para compartir tu ruta en tu vehículo y en tu horario. Alquila tus asientos libres y gana dinero por ello."
                    />
                    <How_to_be_Quickcar
                        icon_name="money"
                        title="Gana dinero"
                        description="Consigue puntos por cada asiento alquilado en tu viaje. A final de mes podrás canjear tus puntos por dinero real en nuestro monedero."
                    />

                </View>

                <View className="flex-col  items-center justify-center h-auto  w-full px-6 py-20 space-y-2">
                    <Text className="text-3xl text-center font-bold text-white ">Busca a tu Conductor Quickcar</Text>
                    <TouchableOpacity >
                        <Text className=" font-bold w-28 text-[#1E293B] bg-[#FFCD57] mt-3 text-center text-xl p-3 rounded-[9999px] ">Buscar</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-col bg-white  items-center justify-center h-auto  w-full px-6 py-10 space-y-2">
                    <Text className="text-2xl text-center font-bold text-[#67768E] ">Copyright © 2024 Quickcar</Text>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

export default HomeScreen
