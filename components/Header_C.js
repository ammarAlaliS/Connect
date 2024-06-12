import React, { useEffect, useRef } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHeaderVisibility } from '../globalState/headerSlice';

const HeaderC = () => {
    const dispatch = useDispatch();
    const headerVisible = useSelector(state => state.header.headerVisible);
    const animation = useRef(new Animated.Value(0)).current;
    const containerHeight = headerVisible ? 80 : 0; 

    useEffect(() => {
        Animated.timing(animation, {
            toValue: headerVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [headerVisible]);

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-80, 0],
    });

    return (
        <Animated.View style={{ height: containerHeight }}>
            <StatusBar
                backgroundColor="#080099"
                barStyle="light-content"
                translucent
            />

            <Animated.View style={[styles.headerContainer, { transform: [{ translateY }] }]}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Animatable.Image
                            animation="pulse"
                            easing="ease-out"
                            iterationCount="infinite"
                            iterationDelay={500}
                            source={{ uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png" }}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>QuickCar</Text>
                    </View>
                </TouchableOpacity>
                <Animatable.View
                    animation="tada"
                    easing="ease-out"
                    iterationCount="infinite"
                    iterationDelay={500}
                    style={styles.notificationIcon}
                >
                    <Ionicons name="notifications-circle-outline" size={40} color="#FFCD57" />
                </Animatable.View>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        backgroundColor: '#080099',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
    logo: {
        width: 65,
        height: 65,
        transform: [{ rotate: '-10deg' }],
    },
    title: {
        fontFamily: 'Eina01-BoldItalic',
        fontSize: 30,
        color: '#fff',
        marginTop: 4,
    },
    notificationIcon: {
        transform: [{ rotate: '-10deg' }],
        borderRadius: 9999,
    },
});

export default HeaderC;
