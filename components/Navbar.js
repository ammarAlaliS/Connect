import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

const Navbar = () => {
    return (
        <BlurView style={styles.blurContainer} blurType="dark" blurAmount={10}>
            <View style={styles.navbarContainer}>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Registro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Con</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Valoraciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Por qué nosotros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Contacto</Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
      
    },
    navbarContainer: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
        justifyContent: 'center', 
        alignItems: 'start', 
       
    },
    navItem: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(207, 173, 248, 0.2)',
        borderBottomStyle: 'solid',
    },
    link: {
        color: '#000',
        fontSize: 20,
        fontWeight: '500',
        padding: 24
    },
});

export default Navbar;
