import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import Commet_C from '../components/Commet_C';
import CommentHeader_C from '../components/CommentHeader_C';
import CommentForm from '../components/CommentForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const statusBarHeight = StatusBar.currentHeight || 0;

const CommentsScreen = ({ route, navigation }) => {
    const {
        blogId,
        token,
        darkMode,
        time
    } = route.params;

    useEffect(() => {
        console.log('Parameters received:', { blogId, token, darkMode, time });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkMode.backgroundDark }}>
            <KeyboardAvoidingView
                style={modalStyles.modalContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? statusBarHeight : 0}
            >
                <View style={modalStyles.fullWidth}>
                    <View style={[modalStyles.modalContent, { backgroundColor: darkMode.backgroundDark }]}>
                        <CommentHeader_C navigation={navigation} darkMode={darkMode} />
                        <ScrollView style={modalStyles.scrollView} showsVerticalScrollIndicator={false}>
                            <Commet_C blogId={blogId} time={time} darkMode={darkMode} />
                        </ScrollView>
                        <CommentForm blogId={blogId} token={token} darkMode={darkMode} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

export default CommentsScreen;
