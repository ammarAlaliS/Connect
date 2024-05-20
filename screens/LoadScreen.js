import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const LoadScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#060097', '#8204ff', '#c10fff']}
                    start={{ x: 0.2, y: 0.6 }}
                    end={{ x: 1.5, y: 0 }}
                    style={styles.gradient}
                >
                    <View style={styles.container_content}>



                        <Animatable.Image
                            animation="fadeInDown"
                            easing="ease-out"
                            duration={2000}
                            source={{
                                uri: "https://quickcaronline.obbaramarket.com/wp-content/uploads/2024/05/cropped-quickcar-1-127x79.png",
                            }}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Animatable.Text
                            animation="pulse"
                            delay={2000}
                            style={styles.text}
                        >
                            Quickcar
                        </Animatable.Text>
                        <Animatable.View
                            animation="pulse"
                            delay={2000}
                            style={styles.indicatorContainer}
                        >
                            <ActivityIndicator size="large" color="#FFF" />
                        </Animatable.View>

                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    gradient: {
        flex: 1,
    },
    logo: {
        height: 80,
        width: 130,
        marginBottom: 10,
    },
    container_content: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'

    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
});

export default LoadScreen;
