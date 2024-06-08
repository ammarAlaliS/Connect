import React from 'react';
import { View, ScrollView, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenuVisibility } from '../globalState/menuSlice';
import MenuItem from '../components/MenuItem';
import { toggleHeaderVisibility } from '../globalState/headerSlice';

const MenuButton = ({ activeScreen, handlePress }) => {
    const dispatch = useDispatch();
    const menuVisible = useSelector(state => state.menu.menuVisible);
    const headerVisible = useSelector(state => state.header.headerVisible);
    const [animation] = React.useState(new Animated.Value(1));

    const toggleMenu = () => {
        dispatch(toggleMenuVisibility());
        const newValue = menuVisible ? 0 : 1;

        Animated.timing(animation, {
            toValue: newValue,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        if (!headerVisible) {
            dispatch(toggleHeaderVisibility(true)); // Solo cambia la visibilidad del encabezado si no está visible
        }
    };

    const menuStyle = {
        height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 85],
        }),
        overflow: 'hidden',
    };

    return (
        <View  className=" bg-[#F9F6FE]">
            <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className=" bg-[#ffffff]">
                <TouchableOpacity onPress={toggleMenu} className=" bg- z-50  m-auto ">
                    <View className="w-36 item-center justify-center bg-white rounded-full my-2 border-b-[1px] border-gray-400/40 shadow-lg shadow-black">
                        <View className="w-20 h-[4px] bg-black rounded-full m-auto my-2"></View>
                    </View>
                </TouchableOpacity>
            </View>

            <Animated.View style={[menuStyle]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                <View className="flex-row items-center w-full bg-[#080099] px-4 py-2 border-t-[1px] shadow-2xl shadow-black/40 justify-between">
                <View style={activeScreen === 'Card' ? styles.activeMenuItem : styles.menuItem}>
                    <MenuItem
                        iconName="HomeIcon"
                        iconWidth={32}
                        iconHeight={28}
                        iconColor={activeScreen === 'Card' ? '#FFCD57' : '#fff'}
                        titleColor={activeScreen === 'Card' ? '#FFCD57' : '#fff'}
                        iconTitle="Inicio"
                        onPress={() => { handlePress('Card'); setTimeout(toggleMenu, 1000);  }}
                    />
                </View>
                <View style={activeScreen === 'Profile' ? styles.activeMenuItem : styles.menuItem}>
                    <MenuItem
                        iconName="UserIcon"
                        iconWidth={32}
                        iconHeight={28}
                        iconColor={activeScreen === 'Profile' ? '#FFCD57' : '#fff'}
                        titleColor={activeScreen === 'Profile' ? '#FFCD57' : '#fff'}
                        iconTitle="Perfil"
                        onPress={() => { handlePress('Profile'); setTimeout(toggleMenu, 1000); }}
                    />
                </View>
                <View style={activeScreen === 'Store' ? styles.activeMenuItem : styles.menuItem}>
                    <MenuItem
                        iconName="StoreIcon"
                        iconWidth={32}
                        iconHeight={28}
                        iconColor={activeScreen === 'Store' ? '#FFCD57' : '#fff'}
                        titleColor={activeScreen === 'Store' ? '#FFCD57' : '#fff'}
                        iconTitle="Tienda"
                        onPress={() => { handlePress('Store'); setTimeout(toggleMenu, 1000); }}
                    />
                </View>
                <View style={activeScreen === 'Blog' ? styles.activeMenuItem : styles.menuItem}>
                    <MenuItem
                        iconName="BlogIcon"
                        iconWidth={32}
                        iconHeight={28}
                        iconColor={activeScreen === 'Blog' ? '#FFCD57' : '#fff'}
                        titleColor={activeScreen === 'Blog' ? '#FFCD57' : '#fff'}
                        iconTitle="Blog"
                        onPress={() => { handlePress('Blog'); setTimeout(toggleMenu, 1000);  }}
                    />
                </View>
                <View style={activeScreen === 'Contact' ? styles.activeMenuItem : styles.menuItem}>
                    <MenuItem
                        iconName="ContactIcon"
                        iconWidth={32}
                        iconHeight={28}
                        iconColor={activeScreen === 'Contact' ? '#FFCD57' : '#fff'}
                        titleColor={activeScreen === 'Contact' ? '#FFCD57' : '#fff'}
                        iconTitle="Chat"
                        onPress={() => { handlePress('Contact'); setTimeout(toggleMenu, 1000); }}
                    />
                </View>
            </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    menuItem: {
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    activeMenuItem: {
        backgroundColor: 'rgba(100, 200, 230, 0.5)',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'rgba(244, 244, 244, 1)',
    },
});

export default MenuButton;
