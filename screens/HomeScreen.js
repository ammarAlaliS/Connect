import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import HomeSection from '../components/HomeSection';
import Navbar from '../components/Navbar';
import ServiceSection from '../sections/ServiceSection';
import ServiceOffered_C from '../components/ServiceOffered_C';
import Comment_C from '../components/Comment_C.js';






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
                    <Text className=" text-2xl font-bold w-full text-center ">¿Qué puedes encontrar aquí?</Text>

                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/comprar-coches-usados-1.jpg"
                        title="Tienda Vehiculos"
                        description="Tu tienda para comprar o vender vehiculos de segunda mano"
                        button_title="Explorar Servicio"
                        button_color="#09009A"
                        icon_color="#FFCD57"

                    />


                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/comparte_coche.jpg"
                        title="Vehículos cerca de ti"
                        description="Busca conductores cerca de ti, alquila una plaza y comparte ruta."
                        button_title="Conocer más"
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
            </ScrollView>

        </SafeAreaView>
    );
}

export default HomeScreen
