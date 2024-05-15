import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    Animated,
    Image,
    Text,

} from "react-native";

import { LinearGradient } from "expo-linear-gradient";


const data = [
    {
        bg_img: "https://images.pexels.com/photos/4491944/pexels-photo-4491944.jpeg?auto=compress&cs=tinysrgb&w=600",
        img: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/IMG-20240117-WA0041.jpg",
        title: "— David Sánchez Ibáñez,",
        description: "«Cada vez que compartimos un vehículo, estamos tomando la ruta hacia un planeta más sostenible. Juntos, hacemos más con menos.»",
        position: "Fundador de Obbarahouse."
    },
    {
        bg_img: "https://images.pexels.com/photos/4571253/pexels-photo-4571253.jpeg?auto=compress&cs=tinysrgb&w=600",
        img: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/IMG_20240404_193958-768x1002.jpg",
        title: "— José Luis Fuentes Sánchez, ",
        description: "“«Cultivar un mundo más sostenible es sembrar esperanza para las generaciones venideras. Nuestro compromiso es la semilla del cambio.»”",
        position: "Responsable Obbaramarket."
    },

];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.9;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 2;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

function Backdrop({ scrollX }) {
    return (
        <View
            style={[
                {
                    position: "absolute",
                    height: ALTURA_BACKDROP,
                    top: 0,
                    width: width,
                },
                StyleSheet.absoluteFillObject,
            ]}
        >
            {data.map((item, index) => {
                const inputRange = [
                    (index - 1) * ANCHO_CONTENEDOR,
                    index * ANCHO_CONTENEDOR,
                    (index + 1) * ANCHO_CONTENEDOR,
                ];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1 ,0],
                });
                return (
                    <Animated.Image
                        key={index}
                        source={{ uri: item.bg_img }}
                        style={[
                            { width: width, height: ALTURA_BACKDROP, opacity },
                            StyleSheet.absoluteFillObject,
                        ]}
                        resizeMode="cover"
                    />
                );
            })}
            <LinearGradient
            colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0)"]}
                style={{
                    width,
                    height: ALTURA_BACKDROP,
                    position: "absolute",
                    bottom: 0,
                }}
            />
        </View>
    );
}

export default function Carousel() {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <Backdrop scrollX={scrollX} />
            <Animated.FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                snapToAlignment="start"
                contentContainerStyle={{
                    paddingTop: 200,
                    paddingHorizontal: ESPACIO_CONTENEDOR,
                }}
                snapToInterval={ANCHO_CONTENEDOR}
                decelerationRate={0}
                scrollEventThrottle={16}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * ANCHO_CONTENEDOR,
                        index * ANCHO_CONTENEDOR,
                        (index + 1) * ANCHO_CONTENEDOR,
                    ];

                    const scrollY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -50, 0],
                    });
                    return (
                        <View style={{ width: ANCHO_CONTENEDOR }}>
                            <Animated.View
                                style={{
                                    marginHorizontal: ESPACIO,
                                    padding: ESPACIO,
                                    paddingTop: 10,
                                    borderRadius: 10,
                                    backgroundColor: "#fff",
                                    alignItems: "center",
                                    transform: [{ translateY: scrollY }],
                                    borderWidth: 1,
                                    borderColor: "rgba(127, 4, 253, 0.1)", 
                                    shadowColor: "#000", 
                                    shadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    shadowOpacity: 1 ,
                                    shadowRadius: 0,
                                    elevation: 10,
                                }}

                            >
                                <View className=" items-center py-10">
                                    <Image
                                        source={{
                                            uri: item.img,
                                        }}
                                        style={styles.posterImage} />
                                    <Text className=" text-2xl text-center font-semibold text-[#6C7B92]">
                                        {item.description}
                                    </Text>
                                    <View className=" mt-4">
                                        <Text className="text-xl font-bold text-[#4a4c4e] text-center">{item.title}</Text>
                                        <Text className=" text-base font-bold text-[#76787d] text-center">{item.position}</Text>
                                    </View>
                                </View>

                            </Animated.View>
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F6FE",
        justifyContent: "center",
    },
    posterImage: {
        width: 128,
        height: 128,
        resizeMode: "cover",
        borderRadius: 10000,
        margin: 0,
        marginBottom: 10,
    },
});