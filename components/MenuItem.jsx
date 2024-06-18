import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import UserIcon from '../icons/UserIcon';
import StoreIcon from '../icons/StoreIcon';
import BlogIcon from '../icons/BlogIcon';
import ContactIcon from '../icons/ContactIcon';
import HomeIcon from '../icons/HomeIcon';
import LogginIcon from '../icons/LogginIcon'

const iconComponents = {
    UserIcon,
    StoreIcon,
    BlogIcon,
    ContactIcon,
    HomeIcon,
    LogginIcon
};

const MenuItem = ({ iconName, iconWidth, iconHeight, iconColor, iconTitle, onPress, titleColor }) => {
    const IconComponent = iconComponents[iconName];

    if (!IconComponent) {
        console.warn(`El componente del ícono ${iconName} no se encontró`);
        return null;
    }

    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }} className=" h-[65px] w-[70px] border-2 border-transparent ">
                    <IconComponent width={iconWidth} height={iconHeight} color={iconColor} />
                    <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 14, color: titleColor }}>{iconTitle}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MenuItem;
