import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import HomeSection from '../components/HomeSection';




const HomeScreen = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <LinearGradient
                colors={['rgb(6, 0, 151)', 'rgb(130, 4, 255)', 'rgb(193, 15, 255)']}
                start={{ x: 0, y: 2 }}
                end={{ x: 4, y: 0 }}
                className=" max-h-[720px] h-full"
            >
            <AppHeader/>
            <HomeSection/>
            </LinearGradient>   
            
        </SafeAreaView>
    );
}

export default HomeScreen
