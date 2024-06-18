import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StatusBar, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native'; 
import { clearUser } from '../globalState/userSlice'; 
import { clearBlogs } from '../globalState/blogsSlice';

const HeaderC = () => {
    const navigation = useNavigation()
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

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            dispatch(clearUser());
            dispatch(clearBlogs());
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            );
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };
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
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Animatable.View
                        animation=""
                        easing="ease-out"
                        iterationCount="infinite"
                        iterationDelay={500}
                    >
                        <Ionicons name="notifications-circle-outline" size={40} color="#FFF" />
                    </Animatable.View>
                    <TouchableOpacity onPress={handleLogout}>
                        <Animatable.View
                            animation=""
                            easing="ease-out"
                            iterationCount="infinite"
                            iterationDelay={500}
                        >
                            <AntDesign name="logout" size={30} color="#FF2121" />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
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
});

export default HeaderC;
