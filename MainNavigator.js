import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import Register from './screens/Register';
import MarketScreen from './screens/MarketScreen';
import LoadScreen from './screens/LoadScreen';
import BlogScreen from './screens/BlogScreen';
import DriversScreen from './screens/DriversScreen';
import SignInForm from './screens/SignInForm';
import HomeAppScreen from './screens/HomeAppScreen';


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const global_user = useSelector(state => state.user?.global_user);

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
      setIsLoading(false);
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

    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Driver" component={DriversScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignInForm" component={SignInForm} options={{ headerShown: false }} />
      <Stack.Screen name="MainScreen" component={HomeAppScreen} />

    </Stack.Navigator>

  );
}
