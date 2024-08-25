import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import MarketScreen from "./screens/MarketScreen";
import BlogScreen from "./screens/BlogScreen";
import DriversScreen from "./screens/DriversScreen";
import SignInForm from "./screens/SignInForm";
import HomeAppScreen from "./screens/HomeAppScreen";
import ArticleScreen from "./screens/ArticleScreen";
import AdviseMessage from "./screens/AdviseMessage";
import MessageScreen from "./screens/MessageScreen";
import ContactScreen from "./screens/ContactScreen";
import CommentsScreen from "./screens/CommentScreen";
import QuickCarsSearchesDetails from "./screens/QuickCarsSearchesDetails";
import TravelScreen from "./screens/TravelScreen";


const Stack = createNativeStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInForm" component={SignInForm} />
      <Stack.Screen name="MainScreen" component={HomeAppScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="Driver" component={DriversScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Travel" component={TravelScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="CommentScreen" component={CommentsScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
}
