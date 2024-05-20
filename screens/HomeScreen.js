import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, React, useRef } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import HomeSection from '../components/HomeSection';
import ServiceOffered_C from '../components/ServiceOffered_C';
import How_to_be_Quickcar from '../components/How_to_be_Quickcar';
import Carousel from '../components/Carousel';
import { ButtonToTop } from '../components/ButtonToTop';
import useCustomFonts from '../fonts/useCustomFonts';

const HomeScreen = () => {

    const navigation = useNavigation()
    const scrollViewRef = useRef(null);
    const { fontsLoaded, onLayoutRootView } = useCustomFonts();

    if (!fontsLoaded) {
        return null; // Return null when fonts are not loaded
    }

   
    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <AppHeader />

            <ScrollView
                flashScrollIndicators={false}
                ref={scrollViewRef}
                
            >
                <View className=" relative max-h-[720px]">
                    <LinearGradient
                        colors={['#060097', '#8204ff', '#c10fff']}
                        start={{ x: 0.2, y: 0.6 }}
                        end={{ x: 1.5, y: 0 }}
                        className=" max-h-[720px] h-full "
                    >

                        <HomeSection />
                    </LinearGradient>
                </View>
                <View className="flex bg-[#F3F3F3] items-center h-auto py-20 w-full px-6 flex-1">
                    <Text style={{fontFamily:'PlusJakartaSans-Bold', fontSize:30, textAlign:'center', width:'100%'}} >¿Qué puedes encontrar aquí?</Text>

                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/comprar-coches-usados-1.jpg"
                        title="Tienda Vehiculos"
                        description="Tu tienda para comprar o vender vehiculos de segunda mano"
                        button_title="Explorar Tienda"
                        button_color=" "
                        icon_color="#fff"
                        screen="Market"

                    />


                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/comparte_coche.jpg"
                        title="Vehículos cerca de ti"
                        description="Busca conductores cerca de ti, alquila una plaza y comparte ruta."
                        button_title="Conocer Servicio"
                        button_color="#FFCD57"
                        icon_color="#FFFFFF"
                        screen="Driver"


                    />


                    <ServiceOffered_C
                        img="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/blog.jpg"
                        title="Artículos sobre motor"
                        description="Para estar al día en el mundo del motor, podrás leer nuestros consejos y trucos."
                        button_title="Ver Más"
                        button_color="#09009A"
                        icon_color="#FFF"
                        screen="Blog"

                    />



                </View>

                <Carousel

                />

                <View className="flex-col bg-white items-center justify-center h-auto  w-full px-6 pb-20   ">

                    <Text  style={{fontFamily:'PlusJakartaSans-Bold'}} className="text-3xl text-center pt-20 ">Cómo ser Conductor Quickcar</Text>
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

                <View className="">
                    <LinearGradient
                        colors={['#060097', '#8204ff', '#c10fff']}
                        start={{ x: 0.2, y: 0.6 }}
                        end={{ x: 1.5, y: 0 }}
                        className="flex-col  items-center justify-center h-auto  w-full px-6 py-20 space-y-2"
                    >
                        <Text style={{fontFamily:'PlusJakartaSans-Bold'}} className="text-3xl text-center text-white ">Busca a tu Conductor Quickcar</Text>
                        <TouchableOpacity 
                            onPress={()=> navigation.navigate("Driver")}
                        >
                            <Text  style={{fontFamily:'PlusJakartaSans-Bold'}} className="w-28 text-[#1E293B] bg-[#FFCD57] mt-3 text-center text-xl p-3 rounded-[9999px] ">Buscar</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View className="flex-col bg-white  items-center justify-center h-auto  w-full px-6 py-10 space-y-2">
                    <Text style={{fontFamily:'PlusJakartaSans-Bold'}} className="text-2xl text-center text-[#67768E] ">Copyright © 2024 Quickcar</Text>
                </View>



            </ScrollView>
            <ButtonToTop scrollViewRef={scrollViewRef}/>
        </SafeAreaView>
    );
}

export default HomeScreen
