import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import MyIcon from '../icons/MyIcon';

const CommentHeader_C = ({ navigation, darkMode }) => {
    return (
        <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: darkMode.background,
            borderWidth: 1,
            borderColor: darkMode.borderBox
        }} className="py-6 px-4 mx-2 mt-2 border-b-[1px]">
            <Text style={{
                fontSize: 24,
                fontFamily: 'PlusJakartaSans-Bold',
                paddingBottom: 6,
                color: darkMode.text
            }}>Comentarios</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{
                    fontFamily: 'PlusJakartaSans-Bold',
                    backgroundColor: darkMode.backgroundDark,
                    borderColor: darkMode.borderBox,
                    borderWidth: 1
                }} className="border-dotted p-1">
                    <MyIcon width={30} height={30} color={darkMode.text} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CommentHeader_C;
