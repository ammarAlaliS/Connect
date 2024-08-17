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
import ArticleScreen from './screens/ArticleScreen';
import AdviseMessage from './screens/AdviseMessage';
import MessageScreen from './screens/MessageScreen';
import ContactScreen from './screens/ContactScreen';
import CommentsScreen from './screens/CommentScreen';
import useAuthCheck from './api/checkSession';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));
  const { checkSession } = useAuthCheck();

  useEffect(() => {
    const initialize = async () => {
      await checkSession(); 
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
    };

    initialize();
  }, [checkSession, fadeAnim]);

  if (isLoading) {
    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <LoadScreen />
      </Animated.View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={AdviseMessage} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="Driver" component={DriversScreen} />
      <Stack.Screen name="SignInForm" component={SignInForm} />
      <Stack.Screen name="MainScreen" component={HomeAppScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="commentScreen" component={CommentsScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}
