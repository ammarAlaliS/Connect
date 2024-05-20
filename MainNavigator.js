import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Easing } from 'react-native'; // Importa Animated y Easing
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MarketScreen from './screens/MarketScreen';
import SignIn from './screens/SignIn';
import LoadScreen from './screens/LoadScreen';
import { useNavigation } from '@react-navigation/native';
import BlogScreen from './screens/BlogScreen';
import DriversScreen from './screens/DriversScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1)); // Inicializa el valor de opacidad a 1 (completamente visible)

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0, 
        duration: 2000, 
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      setIsLoading(false); // Una vez que la animación haya terminado, establece isLoading en falso
    });
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <LoadScreen />
      </Animated.View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="Driver" component={DriversScreen} />

    </Stack.Navigator>
  );
}
