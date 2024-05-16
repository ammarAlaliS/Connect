import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ButtonToTop = ({scrollViewRef}) => { 
    const handlePress = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Ionicons name="arrow-up" size={36} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 999,
    },
    button: {
        backgroundColor: '#FFCD57',
        width: 70,
        height: 70,
        borderRadius: 99999,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
