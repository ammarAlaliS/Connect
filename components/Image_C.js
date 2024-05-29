import React, { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

const Image_C = () => {
    const { control, handleSubmit, setValue } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        // Solicitar permisos para acceder a la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Lo sentimos, necesitamos permisos para acceder a tu galería.');
            return;
        }

        // Seleccionar una imagen
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0]);
            setValue('photo', result.assets[0]);
        }
    };


    return (
        <View style={styles.container}>
            <Button title="Seleccionar Imagen" onPress={pickImage} />
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.image}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        alignItems:'center'
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10
    },
});

export default Image_C;
