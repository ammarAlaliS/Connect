import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import BlogCard from '../components/BlogCard';
import MenuItem from '../components/MenuItem';
import BlogIcon from '../icons/BlogIcon';

const BlogScreen = () => {
    const [selectedclassification, setSelectedclassification] = React.useState(1);

    const listClasifications = [
        { id: 1, name: "Todos" },
        { id: 2, name: "Articulos de carros" },
        { id: 3, name: "Articulos de Motocicletas" },
        { id: 4, name: "Articulos variados" },
    ];
    return (
        <View className=" flex-1">

            <View className="bg-white  border-2 px-4 border-gray-400/40 shadow-lg shadow-black">
                <View className=" py-3 space-y-3">
                    <View className="flex-row items-center justify-between">
                        <Text
                            style={{ fontFamily: 'PlusJakartaSans-Bold', lineHeight: 33 }}
                            className=" text-3xl "
                        >Blog
                        </Text>
                        <View className=" items-center">
                            <BlogIcon width={36} height={36} />
                        </View>
                    </View>
                    <Text
                        style={{ fontFamily: 'PlusJakartaSans-SemiBold', lineHeight: 22 }}
                        className=" text-lg text-center text-[#1F9386] "
                    >Filtra los blogs por categorias
                    </Text>
                </View>
                <View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        className=" w-full space-x-2  mb-3"
                    >
                        {listClasifications.map((item, index) => {
                            if (item.id == selectedclassification) {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.selectedItem}
                                        className=" px-2 py-[5px] "
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
                                        className=" px-2 py-1"
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

            </View>
            <View className="bg-[#F9F6FE] py-3 border-t-2 px-4 border-gray-400/40 shadow-lg shadow-black mt-1 flex-1">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="space-y-2 px-4"

                >
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
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    principalContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: "#f4f5f6",
    },
    searchContainer: {
        marginRight: 0,
        flex: 1,
    },
    container: {

    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F6FE",
        borderRadius: 5,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderColor: "#c3c3c3",
        borderStyle: "solid",
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: "#F9F6FE",
        color: "#424242",
        borderRadius: 5,
    },
    secondFilterIcon: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F6FE",
        borderRadius: 5,
        paddingRight: 15,
        paddingLeft: 5,
    },
    secondImput: {
        width: 0,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "yellow",
        color: "#424242",
        borderRadius: 5,
    },
    item: {
        backgroundColor: "#F9F6FE",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#c3c3c3",
        borderStyle: "solid",
        fontFamily: "Eina01-BoldItalic",
    },
    selectedItem: {
        backgroundColor: "#FFCD57",
        fontFamily: "Eina01-BoldItalic",
        borderWidth: 1,
        borderColor: "rgba(36,63,35,0.4)",
        borderStyle: "solid",
        borderRadius: 5,
    },
    articlesContainer: {
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
});


export default BlogScreen;
