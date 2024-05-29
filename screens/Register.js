import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Eyes from '../icons/Eyes';
import UnEye from '../icons/UnEye';
import useCustomFonts from '../fonts/useCustomFonts';
import { useDispatch } from 'react-redux';
import { setUser } from '../globalState/userSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';
import Image_C from '../components/Image_C';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Formato de correo electrónico no válido')
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});

const statusBarHeight = StatusBar.currentHeight || 0;

const Register = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const { fontsLoaded } = useCustomFonts();
    const [buttonText, setButtonText] = React.useState(false);
    const [inputColor, setInputColor] = React.useState(["input", "inputError", "inputSuccess"]);

   
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                style={{ flex: 1, marginTop:statusBarHeight   }}
            >
            <StatusBar
            backgroundColor="#fff"
            barStyle="dark-content"            
        />
                <View style={styles.container}>
                    <ScrollView>
                        <View className="min-h-[700px] items-center justify-center py-10 px-4">
                            <TouchableOpacity className="mb-12" onPress={() => navigation.navigate("Home")}>
                                <View className="flex-col items-center">
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
                                        className=" text-4xl text-[#3402BE]"
                                        style={{fontFamily:'Eina01-BoldItalic'}} 

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
                                    Registro de Usuario                                
                                </Animatable.Text>
                            </View>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={SignInSchema}
                                onSubmit={async (values, { setSubmitting, resetForm }) => {
                                    try {
                                        const response = await fetch('https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/register', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ global_user: values })
                                        });

                                        if (response.ok) {
                                            const data = await response.json();

                                            Toast.show({
                                                type: 'success',
                                                text1: 'Registro exitoso',
                                                text2: 'Redirigiendo...',
                                            });
                                            setTimeout(() => {
                                                navigation.dispatch(
                                                    CommonActions.reset({
                                                        index: 0,
                                                        routes: [{ name: 'SignInForm' }],
                                                    })
                                                );
                                            }, 1000);
                                            setButtonText(false);
                                            resetForm();
                                        } else {
                                            Toast.show({
                                                type: 'error',
                                                text1: 'Error al registrarse.',
                                                text2: 'Por favor, intenta de nuevo.',
                                            });
                                            setButtonText(false);
                                        }
                                    } catch (error) {
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Error',
                                            text2: 'Algo salió mal. Por favor, intenta de nuevo.',
                                        });
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
                                    <View className="flex w-full space-y-3">
                                        <View className="flex-row w-full space-x-3">
                                            <View style={styles.inputName}>
                                                <AntDesign name="user" size={24} color="black" />
                                                <TextInput
                                                    placeholder="Nombre"
                                                    onChangeText={handleChange('first_name')}
                                                    onBlur={handleBlur('first_name')}
                                                    value={values.first_name}
                                                    style={styles.username}
                                                />
                                            </View>
                                            <View style={styles.inputName}>
                                                <AntDesign name="user" size={24} color="black" />
                                                <TextInput
                                                    placeholder="Apellido"
                                                    onChangeText={handleChange('last_name')}
                                                    onBlur={handleBlur('last_name')}
                                                    value={values.last_name}
                                                    style={styles.username}
                                                />
                                            </View>
                                        </View>
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
                                                        <UnEye width={30} height={30} color="black" />
                                                    ) : (
                                                        <Eyes width={30} height={30} color="black" />
                                                    )
                                                ) : null}
                                            </TouchableOpacity>
                                        </View>
                                        {errors.password && touched.password ? (
                                            <Text style={styles.error}>{errors.password}</Text>
                                        ) : null}

                                        <Image_C/>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5 }}>
                                            <TouchableOpacity onPress={() => navigation.navigate("SignInForm")}>
                                                <Text style={styles.text}>Ya tienes cuentas? Inicia sesion</Text>
                                            </TouchableOpacity>

                                        </View>
                                        <TouchableOpacity onPress={() => { handleSubmit(); setButtonText(true); }} disabled={!values.email || !values.password || isSubmitting || !isValid}>
                                            <LinearGradient
                                                colors={['#060097', '#8204ff', '#c10fff']}
                                                start={{ x: 0.2, y: 0.6 }}
                                                end={{ x: 1.5, y: 0 }}
                                                style={{ paddingVertical: 12, paddingHorizontal: 24, alignItems: 'center', borderRadius: 5 }}
                                            >
                                                <View>
                                                    {!buttonText ? (
                                                        <Text style={styles.buttom}>REGISTRARSE</Text>
                                                    ) : (
                                                        <View className="flex-row items-center space-x-4">
                                                            <Text style={styles.buttom}>REGISTRANDO ...</Text>
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
    inputName: {
        flex: 1,
        fontFamily: 'PlusJakartaSans-Regular',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        backgroundColor: "rgba(173, 216, 230, 0.09)",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
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

export default Register;
