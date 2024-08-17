import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Easing, View } from 'react-native';
import LoadScreen from './screens/LoadScreen';
import HomeScreen from './screens/HomeScreen';
import Register from './screens/Register';
import MarketScreen from './screens/MarketScreen';
import BlogScreen from './screens/BlogScreen';
import DriversScreen from './screens/DriversScreen';
import SignInForm from './screens/SignInForm';
import HomeAppScreen from './screens/HomeAppScreen';
import ArticleScreen from './screens/ArticleScreen';
import AdviseMessage from './screens/AdviseMessage';
import MessageScreen from './screens/MessageScreen';
import ContactScreen from './screens/ContactScreen';
import CommentsScreen from './screens/CommentScreen';


const Stack = createNativeStackNavigator();

export default function MainNavigator({ navReady }) {


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Loading" component={LoadScreen} />
      <Stack.Screen name="Home" component={AdviseMessage} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="Driver" component={DriversScreen} />
      <Stack.Screen name="SignInForm" component={SignInForm} />
      <Stack.Screen name="MainScreen" component={HomeAppScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}
