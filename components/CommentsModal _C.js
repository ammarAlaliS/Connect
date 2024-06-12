import { View, Text, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import Commet_C from './Commet_C';
import CommentHeader_C from './CommentHeader_C';
import CommentForm from './CommentForm';

const CommentsModal_C = ({ visible, onClose }) => {
    const [fadeAnim] = useState(new Animated.Value(0)); 

    useEffect(() => {
        let animationTimeout;
        if (visible) {
            animationTimeout = setTimeout(() => {
                Animated.timing(                 
                    fadeAnim,
                    {
                        toValue: 1,
                        duration: 100,            
                        useNativeDriver: true     
                    }
                ).start();
            }, 300); 
        } else {
            Animated.timing(                  
                fadeAnim,
                {
                    toValue: 0,
                    duration: 100,            
                    useNativeDriver: true
                }
            ).start();
        }

        return () => clearTimeout(animationTimeout);
    }, [visible]);

    return (
        <Modal
            visible={visible}
            animationType="escala"
            transparent={true}
            statusBarTranslucent={true}
        >
            <KeyboardAvoidingView
                style={modalStyles.modalContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Animated.View
                    style={[
                        modalStyles.fullWidth,
                        { opacity: fadeAnim } 
                    ]}
                >
                    <View style={modalStyles.modalContent} className="bg-gray-200">
                        <CommentHeader_C onClose={onClose} />
                        <ScrollView style={modalStyles.scrollView} showsVerticalScrollIndicator={false}>
                            <Commet_C />
                        </ScrollView>
                        <CommentForm />
                    </View>
                </Animated.View>
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
        overflow: 'hidden', 
    },
    scrollView: {
        flex: 1,
    },
});

export default CommentsModal_C;