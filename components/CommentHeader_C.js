import { View, Text, StyleSheet, TouchableOpacity,} from 'react-native';
import React from 'react'
import MyIcon from '../icons/MyIcon';


const CommentHeader_C = ({onClose}) => {
    return (
        <View style={modalStyles.modalHeader} className=" py-6 px-4 bg-[#fff]   rounded-t-lg border-b-[1px] border-black/10 ">
            <Text style={modalStyles.modalTitle}>Comentarios</Text>
            <TouchableOpacity onPress={onClose} >
                <View style={modalStyles.closeButton} className=" bg-gray-50/30 border-2 border-black/10 border-dotted p-1">
                    <MyIcon width={30} height={30} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    )
}
const modalStyles = StyleSheet.create({
   
    modalHeader: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'PlusJakartaSans-Bold',
        paddingBottom: 6,
        color:'#000'
    },
    closeButton: {
        fontFamily: 'PlusJakartaSans-Bold',
    },
   
});

export default CommentHeader_C