import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Navbar = () => {
    return (
        <View style={styles.navbarContainer}>
            <TouchableOpacity style={styles.navItem}>
                <Text style={styles.link} >Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Text style={styles.link}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Text style={styles.link}>Acerca de</Text>
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
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        display: 'flex',
        backgroundColor: 'white',
        position: 'absolute',
        top:100,
        bottom:200, 
        left:0, 
        right:0
    
    },
    navItem: {
        flex:1,
        display:'flex',
        justifyContent:'center',
        paddingLeft:24,
        paddingRight:24,
        borderBottomWidth: 2, 
        borderBottomColor: ' rgba(207, 173, 248, 0.2)',
        borderBottomStyle: 'solid',

    },
    link: {
        color: 'black',
        fontSize: 20,
        justifyContent: 'center',
        fontWeight:'500' 
    },
});

export default Navbar;
