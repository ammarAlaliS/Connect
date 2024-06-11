import { View, Text, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import Commet_C from './Commet_C';
import CommentHeader_C from './CommentHeader_C';
import CommentForm from './CommentForm';

const CommentsModal_C = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            statusBarTranslucent={true}
        >
            <KeyboardAvoidingView
                style={modalStyles.modalContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={modalStyles.fullWidth}>
                    <View style={[modalStyles.modalContent, modalStyles.shadow]} className="bg-gray-200">
                        <CommentHeader_C onClose={onClose} />
                        <ScrollView style={modalStyles.scrollView} 
                        showsVerticalScrollIndicator={false}>
                            <Commet_C />
                        </ScrollView>
                        <CommentForm />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    fullWidth: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    modalContent: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        maxHeight: '90%',
    },
    scrollView: {
        flex: 1,
    },
    shadow: {

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'PlusJakartaSans-Bold',
        paddingBottom: 6,
    },
});

export default CommentsModal_C;
