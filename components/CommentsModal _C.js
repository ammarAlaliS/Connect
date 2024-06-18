import { View, Text, StyleSheet, Modal, ScrollView, KeyboardAvoidingView, Platform, Animated, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Commet_C from './Commet_C';
import CommentHeader_C from './CommentHeader_C';
import CommentForm from './CommentForm';

const statusBarHeight = StatusBar.currentHeight || 0;

const CommentsModal_C = ({ visible, onClose, blogId, time, token}) => {
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
                    <View style={modalStyles.modalContent} className="bg-gray-200 ">
                        <CommentHeader_C onClose={onClose} />
                        <ScrollView style={modalStyles.scrollView} showsVerticalScrollIndicator={false}>
                            <Commet_C
                                blogId={blogId}
                                time={time}
                            />
                        </ScrollView>
                        <CommentForm
                            blogId={blogId}
                            token={token}
                        />
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: statusBarHeight
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
        maxHeight: '100%',
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
});

export default CommentsModal_C;
