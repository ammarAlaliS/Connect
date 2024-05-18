import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Eyes from '../icons/Eyes';
import UnEye from '../icons/UnEye';


const SignIn = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showEye, setShowEye] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (text) => {
        setPassword(text);
        setShowEye(text !== '');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={['#060097', '#8204ff', '#c10fff']}
                start={{ x: 0.2, y: 0.6 }}
                end={{ x: 1.5, y: 0 }}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <ScrollView  className="  ">
                        <View className="  h-[700px] items-center justify-center py-10 px-4 ">
                            <TouchableOpacity className=" mb-12" onPress={() => navigation.navigate("Home")}>
                                <View className="flex-col items-center ">
                                    <Image
                                        source={{
                                            uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                                        }}
                                        className="w-24 h-24"
                                        resizeMode="contain"
                                    />
                                    <Text className="font-bold text-4xl text-[#3402BE] ">Quickcar</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'start', color: '#000',  marginBottom: 10 }}>Bienvenido</Text>
                            </View>
                            <View className="flex w-full space-y-3">
                                <View style={styles.input}>
                                    <Fontisto name="email" size={24} color="black" />
                                    <TextInput
                                        placeholder="Nombre de usuario"
                                        onChangeText={setUsername}
                                        value={username}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <Ionicons name="lock-closed-outline" size={24} color="black" />
                                    <TextInput
                                        placeholder="Contraseña"
                                        onChangeText={handleInputChange}
                                        secureTextEntry={!passwordVisible}
                                        className="flex-1"
                                    />
                                    <TouchableOpacity onPress={togglePasswordVisibility}>
                                        {showEye ? (
                                            passwordVisible ? (
                                                <UnEye width={24} height={24} color="black" />
                                            ) : (
                                                <Eyes />
                                            )
                                        ) : null}
                                    </TouchableOpacity>
                                </View>
                                <View className="flex items-end">
                                    <Text style={styles.text_password}>¿Olvidastes la Contraseña?</Text>
                                </View>
                                <TouchableOpacity onPress={handleLogin}>
                                    <LinearGradient
                                        colors={['#060097', '#8204ff', '#c10fff']}
                                        start={{ x: 0.2, y: 0.6 }}
                                        end={{ x: 1.5, y: 0 }}
                                        className=" py-3 px-6 items-center rounded-md"
                                    >
                                        <Text className="text-white text-base font-semi">INICIAR SESION</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                    <Text style={styles.text}>¿No tienes una cuenta? Regístrate</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
    },

    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: "#fff",
        flexDirection: "row",
        gap: 10
    },
    text: {
        color: 'blue',
    },
    text_password: {
        color: 'blue',
    },
});

export default SignIn;
