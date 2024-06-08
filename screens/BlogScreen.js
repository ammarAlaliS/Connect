import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BlogIcon from '../icons/BlogIcon';
import BlogCard from '../components/BlogCard';


const BlogScreen = () => {
    const [selectedClassification, setSelectedClassification] = useState(1);

    const listClassifications = [
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
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTitle}>
                            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', lineHeight: 33 }} className="text-3xl">Blog</Text>
                            <View style={styles.iconContainer}>
                                <BlogIcon width={36} height={36} />
                            </View>
                        </View>
                        <Text style={styles.headerDescription}>Filtra los blogs por categorías</Text>
                    </View>
                </View>

                <View style={styles.stickyHeader}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScroll}
                    >
                        {listClassifications.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={item.id === selectedClassification ? styles.selectedItem : styles.item}
                                onPress={() => setSelectedClassification(item.id)}
                            >
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.content} className=" px-4 py-4 space-y-4">
                    <View>
                        <BlogCard
                            image_url="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/Quickcar.png"
                            blog_title="Ruedas Compactas: El Blog Definitivo de Autos Pequeños"
                            blog_tag={["Blog", "Obb_Mercado"]}
                            blog_description="¡Bienvenidos a Carro Peque! Este es tu destino definitivo para todo lo relacionado con autos compactos. Aquí, celebramos la eficiencia, la practicidad y el encanto de los vehículos pequeños. Desde reseñas detalladas de los últimos modelos hasta consejos de mantenimiento y trucos para maximizar el espacio, Carro Peque te ofrece una guía completa para aprovechar al máximo tu experiencia de conducción. Ya sea que estés buscando tu primer auto, quieras reducir tu huella de carbono o simplemente disfrutes de la agilidad y el estilo de los autos pequeños, este blog es para ti. ¡Únete a nuestra comunidad y descubre por qué los mejores regalos vienen en paquetes pequeños!"
                        />
                    </View>
                    <View>
                        <BlogCard
                            image_url="https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/quickcar.jpg"
                            blog_title="Ruedas Compactas: El Blog Definitivo de Autos Pequeños"
                            blog_tag={["Blog", "Obb_Mercado"]}
                            blog_description="Este es un artículo de prueba"
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
    headerContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerContent: {
        paddingVertical: 12,
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    blogTitle: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 24,
        lineHeight: 33,
    },
    iconContainer: {
        alignItems: 'center',
    },
    headerDescription: {
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontSize: 18,
        lineHeight: 22,
        color: '#1F9386',
        textAlign: 'center',
        marginTop: 8,
    },
    stickyHeader: {
        backgroundColor: 'white',
        zIndex: 100,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    horizontalScroll: {
        width: '100%',
    },
    item: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    selectedItem: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#FFCD57',
    },
    content: {
        backgroundColor: '#F9F6FE',

    },
});

export default BlogScreen;
