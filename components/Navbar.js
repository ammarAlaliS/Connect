import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HomeIcon from '../icons/HomeIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon '
import KeyIcon from '../icons/KeyIcon';
import MapIcon from '../icons/MapIcon';
import StoreIcon from '../icons/StoreIcon';
import UserIcon from '../icons/UserIcon';
import BlogIcon from '../icons/BlogIcon';
import ContactIcon from '../icons/ContactIcon';
import LogginIcon from '../icons/LogginIcon';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    return (

        <View style={styles.navbarContainer}>
            <ScrollView className=" flex-row h-screen w-[100%] px-[24px]">

                <View className="  flex-1 w-full">
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('Home')}
                    >

                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <HomeIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Inicio</Text>
                            </View>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('Register')}
                    >

                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <KeyIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Registro</Text>
                            </View>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.navItem}>

                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <MapIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Conductor</Text>
                            </View>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>

                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-center space-x-3 flex-1">
                                <StoreIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Tienda</Text>
                            </View>
                        </View>

                    </TouchableOpacity>



                    <TouchableOpacity style={styles.navItem}>
                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <UserIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Perfil</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <BlogIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Blog</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <ContactIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Contacto</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
                <View className=" ">
                    <TouchableOpacity style={styles.LastLink}>

                        <View className=" flex-row items-center space-x-2 ">
                            <View className=" flex-row items-baseline space-x-3 flex-1">
                                <LogginIcon width={35} height={35} color="#1E293B" />
                                <Text style={styles.link}>Iniciar sesion</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: "white",
        justifyContent: 'center',
        width: '55%',
        height: '88%',
        elevation: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        paddingTop: 14,
        paddingBottom: 14

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
        paddingTop: 24,
        paddingBottom: 24,

    },
    LastLink: {
        borderTopWidth: 2,
        borderTopColor: 'rgba(207, 173, 248, 0.2)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(207, 173, 248, 0.2)',
        borderBottomStyle: 'solid',

    },
});

export default Navbar;
