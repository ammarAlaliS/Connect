import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeIcon from '../icons/HomeIcon';
import KeyIcon from '../icons/KeyIcon';
import MapIcon from '../icons/MapIcon';
import StoreIcon from '../icons/StoreIcon';
import UserIcon from '../icons/UserIcon';
import BlogIcon from '../icons/BlogIcon';
import ContactIcon from '../icons/ContactIcon';
import LogginIcon from '../icons/LogginIcon';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNavbar } from '../globalState/navbarSlice';
import ArrowDown from '../icons/ArrowDown';

const Navbar = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleToggleNavbar = () => {
        dispatch(toggleNavbar());
    };
    const handleNavigation = (screen) => {
        handleToggleNavbar();
        navigation.navigate(screen);
    };

    return (
        <SafeAreaView className="">
            <LinearGradient
                colors={['#060097', '#8204ff', '#c10fff']}
                start={{ x: 0.2, y: 0.6 }}
                end={{ x: 1.5, y: 0 }}

            >
                <View className=" bg-[#FCFCFC]  w-[70%] border-r-2 border-black/20 shadow-2xl shadow-black  ">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View className=" items-center px-6 py-4 border-b-4 border-black/5  ">
                            <Image
                                source={{
                                    uri: "https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?stp=dst-jpg_s206x206&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qy1LVBMLjyYQ7kNvgGQr8OT&_nc_ht=scontent.fmga3-1.fna&oh=00_AYBVG5ogmpccMAElhobvkL-siWGxHpb8wbtI9q6kXlKWCQ&oe=664C7B51",
                                }}
                                className=" h-20 w-20 rounded-full  border-2 border-gray-200/20 "
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>Walid Ammar</Text>
                            <Text style={styles.type}>Conductor</Text>
                        </View>

                        <View className="mx-4">
                            <View className=" flex-row  items-center  my-4">
                                <Text style={styles.title_menu}>Menu</Text>
                                <ArrowDown size={24} color="black" style={styles.icon} />
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => handleNavigation('Home')}
                                    className=" mt-2 px-6 bg-white border-2 border-gray-200/20 shadow-lg shadow-black "
                                >

                                    <View className=" flex-row items-center space-x-2 ">
                                        <View className=" flex-row items-center space-x-3">
                                            <HomeIcon width={35} height={35} color="#1E293B" />
                                            <Text style={styles.link}>Inicio</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>


                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => handleNavigation('Register')}
                                    className="  px-6 bg-white mt-2  border-2 border-gray-200/20 shadow-lg shadow-black "
                                >

                                    <View className=" flex-row items-center space-x-2 ">
                                        <View className=" flex-row items-center space-x-3 flex-1">
                                            <KeyIcon width={35} height={35} color="#1E293B" />
                                            <Text style={styles.link}>Registro</Text>
                                        </View>

                                    </View>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="  px-6 bg-white mt-2  border-2 border-gray-200/20 shadow-lg shadow-black "
                                    onPress={() => handleNavigation('signIn')}
                                >
                                    <View className=" flex-row items-center space-x-2 ">

                                        <View className=" flex-row items-center space-x-2 ">
                                            <View className=" flex-row items-center space-x-3 flex-1">
                                                <LogginIcon width={35} height={35} color="#1E293B" />
                                                <Text style={styles.link}>Iniciar sesion</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    className="  px-6 bg-white mt-2  border-2 border-gray-200/20 shadow-lg shadow-black "
                                >

                                    <View className=" flex-row items-center space-x-2 ">
                                        <View className=" flex-row items-center space-x-3 flex-1">
                                            <MapIcon width={35} height={35} color="#1E293B" />
                                            <Text style={styles.link}>Conductor</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.navItem}
                                    onPress={() => navigation.navigate('Market')}
                                    className="  px-6 bg-white mt-2  border-2 border-gray-200/20 shadow-lg shadow-black "
                                >

                                    <View className=" flex-row items-center space-x-2 ">
                                        <View className=" flex-row items-center space-x-3 flex-1">
                                            <StoreIcon width={35} height={35} color="#1E293B" />
                                            <Text style={styles.link}>Tienda</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>



                                <TouchableOpacity
                                    className="  px-6 bg-white mt-2  border-2 border-gray-200/20 shadow-lg shadow-black "
                                >
                                    <View className=" flex-row items-center space-x-2 ">
                                        <View className=" flex-row items-center space-x-3 flex-1">
                                            <UserIcon width={35} height={35} color="#1E293B" />
                                            <Text style={styles.link}>Perfil</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="  px-6 bg-white mt-2  border-2 border-gray-200/20 shadow-lg shadow-black "
                                >
                                    <View className=" flex-row items-center space-x-2 ">
                                        <View className=" flex-row items-center space-x-3 flex-1">
                                            <BlogIcon width={35} height={35} color="#1E293B" />
                                            <Text style={styles.link}>Blog</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>





                                <TouchableOpacity
                                    style={styles.LastLink}
                                    className="  px-4 bg-white  mt-2 mb-[120] border-2 border-gray-200/20 shadow-lg shadow-black "
                                >
                                    <View className=" flex-row items-center space-x-3 flex-1">
                                        <ContactIcon width={35} height={35} color="#1E293B" />
                                        <Text style={styles.link}>Contacto</Text>
                                    </View>


                                </TouchableOpacity>

                            </View>
                        </View>


                    </ScrollView>
                </View>
            </LinearGradient>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({

    title: {
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#5B595D',
        fontSize: 20,

    },
    title_menu: {
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#5B595D',
        fontSize: 24,
    },

    type: {
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#5B595D',
        fontSize: 16,
    },

    link: {
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#5B595D',
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 12,
        paddingBottom: 16,



    },
    icon: {
        marginTop: 10,
        marginLeft: 10
    },

});

export default Navbar;
