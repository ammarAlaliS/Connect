import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BlogIcon from '../icons/BlogIcon';
import BlogCard from '../components/BlogCard';

const BlogScreen = () => {
    const [selectedclassification, setSelectedclassification] = React.useState(1);

    const listClasifications = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Articulos de carros" },
        { id: 3, name: "Articulos de Motocicletas" },
        { id: 4, name: "Articulos variados" },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                stickyHeaderIndices={[1]} // Índice para la barra de clasificaciones
            >
                <View className="bg-white px-4">
                    <View className="py-3 space-y-3">
                        <View className="flex-row items-center justify-between">
                            <Text
                                style={{ fontFamily: 'PlusJakartaSans-Bold', lineHeight: 33 }}
                                className="text-3xl"
                            >Blog
                            </Text>
                            <View className="items-center">
                                <BlogIcon width={36} height={36} />
                            </View>
                        </View>
                        <Text
                            style={{ fontFamily: 'PlusJakartaSans-SemiBold', lineHeight: 22 }}
                            className="text-lg text-center text-[#1F9386]"
                        >Filtra los blogs por categorias
                        </Text>
                    </View>
                </View>

                <View style={styles.stickyHeader} className="border-b-2 border-gray-400/40 shadow-lg shadow-black px-4 py-4 bg-white items-center">
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        className="w-full space-x-2"
                    >
                        {listClasifications.map((item, index) => {
                            if (item.id === selectedclassification) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.selectedItem}
                                        className="px-2 py-[5px]"
                                        onPress={() => {
                                            setSelectedclassification(item.id);
                                        }}
                                    >
                                        <Text style={{ color: "#000" }}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.item}
                                        className="px-2 py-1"
                                        onPress={() => {
                                            setSelectedclassification(item.id);
                                        }}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            }
                        })}
                    </ScrollView>
                </View>
                <View className="bg-[#F9F6FE] py-3 px-4 border-t-2 border-gray-400/40 shadow-lg shadow-black mt-1 flex-1">
                    <View>
                        <BlogCard
                            image_url="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/Quickcar.png"
                            blog_title="Ruedas Compactas: El Blog Definitivo de Autos Pequeños"
                            blog_tag={["Blog", "Obb_Mercado"]}
                            blog_description=" ¡Bienvenidos a Carro Peque!Este es tu destino definitivo para todo lo relacionado con autos compactos. Aquí, celebramos la eficiencia, la practicidad y el encanto de los vehículos pequeños. Desde reseñas detalladas de los últimos modelos hasta consejos de mantenimiento y trucos para maximizar el espacio, Carro Peque te ofrece una guía completa para aprovechar al máximo tu experiencia de conducción. Ya sea que estés buscando tu primer auto, quieras reducir tu huella de carbono o simplemente disfrutes de la agilidad y el estilo de los autos pequeños, este blog es para ti. ¡Únete a nuestra comunidad y descubre por qué los mejores regalos vienen en paquetes pequeños! pero quiero que cuando finalice aqui maximizar el espacio aparezcan"
                        />
                    </View>
                    <View>
                        <BlogCard
                            image_url="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/quickcar.jpg"
                            blog_title="Ruedas Compactas: El Blog Definitivo de Autos Pequeños"
                            blog_tag={["Blog", "Obb_Mercado"]}
                            blog_description="Este un articulo de prueba"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    selectedItem: {
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#FFCD57',
    },
    stickyHeader: {
        backgroundColor: 'white',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
});

export default BlogScreen;
