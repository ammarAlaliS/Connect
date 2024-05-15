import React, { useLayoutEffect } from 'react';
import { StyleSheet, View , Text, SafeAreaView, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../components/GlobalStyles';
import AppHeader from '../components/AppHeader';

const RegisterScreen = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,

        })
    }, [])
    
    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
        <AppHeader />

        <ScrollView
            flashScrollIndicators={false}
        >
        
        </ScrollView>

    </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default RegisterScreen;
