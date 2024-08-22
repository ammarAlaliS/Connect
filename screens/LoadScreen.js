import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Animated,
  Image,
  SafeAreaView,
  Text,
  Easing,
} from "react-native";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../globalState/userSlice";
import { useNavigation } from "@react-navigation/native";
import useCustomFonts from "../fonts/useCustomFonts";

const statusBarHeight = StatusBar.currentHeight || 0;

const LoadScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const [gradAnim] = useState(new Animated.Value(0)); 
  const navigation = useNavigation();
  const { fontsLoaded, fontError, onLayoutRootView } = useCustomFonts();

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }, 2000);
          return;
        }

        const response = await api.get(
          "https://obbaramarket-backend.onrender.com/api/obbaramarket/check-session",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          dispatch(
            setUser({
              global_user: {
                _id: response.data.id,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                profile_img_url: response.data.profile_img_url,
                token: token,
              },
            })
          );

          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear, 
            useNativeDriver: true,
          }).start(() => {
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
              });
            }, 1000);
          });
        } else {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }, 1000);
        }
      } catch (error) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }, 1000);
      }
    };

    initialize();
  }, [dispatch, fadeAnim, navigation, gradAnim]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" translucent />
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://ff03659fee5b112b07233ec4a495a4ea432fb498673b458a12ed96c-apidata.googleusercontent.com/download/storage/v1/b/quickcar-storage/o/inicialbg.jpg?jk=AXZI6JzGNEQeFOUw1FifJ1tJdHJ9SPLA9YaWHtCftIm8DREiyAWpvnTHQ2ENT1fglcpo5Donzo29BPHukW2Dy-Di5IY0HVV1bie4I6ZgdhufJIFpiLs2-R9L5znJ7LgC7Mhm3zT5q09DhmT6wkJEGKROQW7KII43FEGz5yDkvNJ_Nl2IIkmPqungz6Q_c2jwBJ3u2Hcmudq-v2mp_raHG8zCHWa25rM0v15XdcLC2w3ylMPd5HOeVYvIjc046wyoaNFrBMH3Vhtda-pQXIhs9xCGlk-8EHZsKnTB0JXUic7LlSL0kSDKPAuHDZXrbmNAzVEBUU8pXGmRdXYB_Yo2EDgaMZ2OxDWhuXiBjhVCHJb8ETfEF5aL8XWdZUVbF9ejmmdUQu56kksY2YAQ_RV6k3NT_AfI0KyclUiyFT8zo7PyJcuAO_l3LUqVqZUN4j1dTRP5Uqh3429URpGsJCxzFiWbbYwMjE55mSJ4_ljqiTeQuheHCqkMjHwEanmq5v_kggplPqgjSFgceiLgFK-0I4gq_HE9gaa3uOojHwLJC6-7QwZQCdEHfIbklI6xwPXcobihyVV3Zxo-oi1S4Thtr2rAHx2amHaOISPguY8UCVTQvWuOHXoLXBTQHv5aVmvzKdgL9EQtFKMfhA8zpNtXKiaOC9nQ248DMgsBd4Lvcno06NHx8i5q7gt5xImo-3b4J-fWv14yJT4rMD6Rhpr1M-CZLcpmD9KrakLA88ocDXDZSmu1cYxoSyM5xJaPVLlRA8kvGBZQONwQtiPzeQUP8L3UNoHaryE1RByd5GrQ-fafrRIoQUa-Q9yvX4RIgDsdlbdOYF4a6dW4OMTmc8703DRycCLIesxu-qV2lUgPWfbvXVoaP5qQQLoBzbHo6XfM-a1JQCn4ci01Lp1OYJ6LFxIRx8MEiq_tFEsdp2zTKD8KU3hgWOIMjUPTxU5X5QQcv2L3Snj4vKnMRSOj8I7YomntAuXfvjwucoL4nPQ2QmsbMHFdHe5aomNCL7xx96mo6AdvdAZGvKNzIUMf3bhtq-TlBARyz4gQirVxptXJma4CqFBZWBJnlfZghClBq1GBC28r2-uxx9ZiLt-MoF_7UL3rUi4lLF-QRd_vU4h99YE72YW5UKHY2MX0&isca=1",
          }} 
          style={styles.backgroundImage}
        />
        <BlurView intensity={100} style={styles.blur}>
          <View style={styles.container_content}>
            <Animatable.Image
              animation="zoomIn"
              easing="ease-out"
              duration={2000}
              source={{
                uri: "https://storage.googleapis.com/quickcar-storage/quickcar-removebg-preview%20(1).png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.textContainer}>
              <Text style={styles.text}>Quickcar</Text>
            </View>

            <Animatable.View
              animation="pulse"
              delay={2000}
              style={styles.indicatorContainer}
            >
              <ActivityIndicator size="large" color="#000" />
            </Animatable.View>
            <Image
            source={require('../assets/imgs/rode.png')}
            style={{
                marginTop:30
            }}
          />
          </View>
          <View
            style={[
              {
                position: "absolute",
                bottom: 200,
          
               
              },
            ]}
          >
            <Text style={{
                fontSize: 24,
                color: "#281b24",
                textShadowColor: "#fff",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
                fontFamily: "PlusJakartaSans-Bold",
            }}>Mas que un viaje una experiencia</Text>
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover", 
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 120,
    marginBottom: 20,
    borderRadius: 15,
  },
  container_content: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "PlusJakartaSans-Bold",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicatorContainer: {
    marginTop: 40,
    alignItems: "center",
  },
});

export default LoadScreen;
