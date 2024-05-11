import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

const Navbar = () => {
    return (

        <View style={styles.navbarContainer}>
            <ScrollView className="h-auto w-full">
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Registro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Conductor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Tienda Vehiculos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Mi cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Blog</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.link}>Contacto</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'start',
    },

    navItem: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(207, 173, 248, 0.2)',
        borderBottomStyle: 'solid',
    },
    link: {
        color: '#5B595D',
        fontSize: 20,
        fontWeight: '500',
        padding: 24
    },
});

export default Navbar;
