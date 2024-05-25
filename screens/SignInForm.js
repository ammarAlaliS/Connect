import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Eyes from '../icons/Eyes';
import UnEye from '../icons/UnEye';
import useCustomFonts from '../fonts/useCustomFonts';
import { useDispatch } from 'react-redux';
import { setUser } from '../globalState/userSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles from '../components/GlobalStyles';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Formato de correo electrónico no válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});


const SignInForm = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { fontsLoaded } = useCustomFonts();
    const [buttonText, setButtonText] = React.useState(false);
    const [inputColor, setInputColor] = React.useState(["input", "inputError", "inputSuccess"])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1}}
        >
            <StatusBar
                backgroundColor={Platform.OS === 'android' ? '#FFFFFF' : '#000000'}
                barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
                translucent={false}
            />
            <LinearGradient
                colors={['#060097', '#8204ff', '#c10fff']}
                start={{ x: 0.2, y: 0.6 }}
                end={{ x: 1.5, y: 0 }}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <View className="  h-[700px] items-center justify-center py-10 px-4 ">
                            <TouchableOpacity className=" mb-12" onPress={() => navigation.navigate("Home")}>
                                <View className="flex-col items-center ">
                                    <Animatable.Image
                                        animation="rotate"
                                        easing="ease-out"
                                        iterationCount="infinite"
                                        iterationDelay={1000}

                                        source={{
                                            uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                                        }}
                                        className="w-24 h-24"
                                        resizeMode="contain"

                                    />
                                    <Animatable.Text
                                        animation="pulse"
                                        iterationDelay={1500}
                                        iterationCount="infinite"
                                        className="font-bold text-4xl text-[#3402BE]"

                                    >
                                        Quickcar
                                    </Animatable.Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '100%' }}>
                                <Animatable.Text
                                    animation="fadeInDown"
                                    iterationCount={1}
                                    iterationDelay={2000}
                                    style={styles.welcome}

                                >
                                    Iniciar Sesion
                                </Animatable.Text>

                            </View>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={SignInSchema}
                                onSubmit={async (values, { setSubmitting, resetForm }) => {
                                    try {
                                        const response = await fetch('https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/login', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(values),
                                        });

                                        if (response.ok) {
                                            const data = await response.json();
                                            console.log(data)
                                            // Persistir los datos del usuario en AsyncStorage
                                            await AsyncStorage.setItem('userData', JSON.stringify(data));
                                            // Actualizar el estado global con la información del usuario
                                            dispatch(setUser({
                                                global_user: {
                                                    _id: data._id,
                                                    email: data.email,
                                                    first_name: data.first_name,
                                                    last_name: data.last_name,
                                                    token: data.token
                                                },
                                                driver_information: data.QuickCar
                                            }));
                                            // Mostrar mensaje de éxito
                                            Toast.show({
                                                type: 'success',
                                                text1: 'Inicio de sesión exitoso',
                                                text2: 'Redirigiendo...',
                                            });
                                            // Redirigir al usuario a la pantalla principal después de un breve retraso
                                            setTimeout(() => {
                                                navigation.dispatch(
                                                    CommonActions.reset({
                                                        index: 0,
                                                        routes: [{ name: 'MainScreen' }],
                                                    })
                                                );
                                            }, 1000);
                                            // Limpiar el formulario
                                            resetForm();
                                            setButtonText(false)
                                        } else {
                                            // Mostrar mensaje de error si las credenciales son incorrectas
                                            Toast.show({
                                                type: 'error',
                                                text1: 'Error contraseña o correo incorrecto',
                                                text2: 'Por favor, intenta de nuevo.',
                                            });
                                            setButtonText(false)
                                        }
                                    } catch (error) {
                                        // Manejar errores generales
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Error',
                                            text2: 'Algo salió mal. Por favor, intenta de nuevo.',
                                        });
                                    } finally {
                                        // Establecer isSubmitting en falso para permitir nuevos envíos
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
                                    <View className="flex w-full space-y-3">
                                        <View style={styles[inputColor.email || (touched.email && errors.email ? 'inputError' : 'input')]}>
                                            <Fontisto name="email" size={24} color="black" />
                                            <TextInput
                                                placeholder="Email"
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                style={styles.username}
                                            />
                                        </View>
                                        {errors.email && touched.email ? (
                                            <Text style={styles.error}>{errors.email}</Text>
                                        ) : null}
                                        <View style={styles[inputColor.password || (touched.password && errors.password ? 'inputError' : 'input')]}>
                                            <Ionicons name="lock-closed-outline" size={24} color="black" />
                                            <TextInput
                                                placeholder="Contraseña"
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                secureTextEntry={!passwordVisible}
                                                style={styles.username}
                                            />
                                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                                {values.password ? (
                                                    passwordVisible ? (
                                                        <UnEye width={24} height={24} color="black" />
                                                    ) : (
                                                        <Eyes width={24} height={24} color="black" />
                                                    )
                                                ) : null}
                                            </TouchableOpacity>
                                        </View>
                                        {errors.password && touched.password ? (
                                            <Text style={styles.error}>{errors.password}</Text>
                                        ) : null}
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5 }}>
                                            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                                <Text style={styles.text}>Regístrate</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.text_password}>¿Olvidaste la Contraseña?</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => { handleSubmit(); setButtonText(true); }} disabled={!values.email || !values.password || isSubmitting || !isValid}>
                                            <LinearGradient
                                                colors={['#060097', '#8204ff', '#c10fff']}
                                                start={{ x: 0.2, y: 0.6 }}
                                                end={{ x: 1.5, y: 0 }}
                                                style={{ paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', borderRadius: 5 }}
                                            >
                                                <View >
                                                    {!buttonText ? (
                                                        <Text style={styles.buttom}>INICIAR SESION</Text>
                                                    ) : (
                                                        <View className="flex-row items-center space-x-4">
                                                            <Text style={styles.buttom}>INICIANDO ...</Text>
                                                            <ActivityIndicator size="small" color="#FFF" />
                                                        </View>
                                                    )}
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
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
        fontFamily: 'PlusJakartaSans-Regular',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: "rgba(173, 216, 230, 0.09)",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        

    },

    inputError: {
        fontFamily: 'PlusJakartaSans-Regular',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: "rgba(255, 0, 0, 0.02)",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    username: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 14,
        flex: 1,
        paddingVertical: 10, 
        
        
    },
    text: {
        fontFamily: 'PlusJakartaSans-Regular',
        color: 'blue',
        fontSize: 16
    },
    text_password: {
        fontFamily: 'PlusJakartaSans-Regular',
        color: 'blue',
        fontSize: 16
    },
    welcome: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    buttom: {
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFF'
    },
    error: {
        fontFamily: 'PlusJakartaSans-Regular',
        color: 'red',
        fontSize: 12,
        marginLeft: 10
    }
});

export default SignInForm;
