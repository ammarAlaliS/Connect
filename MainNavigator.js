import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Easing } from 'react-native'; 
import HomeScreen from './screens/HomeScreen';
import Register from './screens/Register';
import MarketScreen from './screens/MarketScreen';
import SignIn from './screens/SignIn';
import LoadScreen from './screens/LoadScreen';
import { useNavigation } from '@react-navigation/native';
import BlogScreen from './screens/BlogScreen';
import DriversScreen from './screens/DriversScreen';
import HomeAppScreen from './screens/HomeAppScreen';
import SignInForm from './screens/SignInForm';
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
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="HomeApp" component={HomeAppScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Driver" component={DriversScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignInForm" component={SignInForm} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
