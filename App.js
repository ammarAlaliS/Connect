// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import AuthNavigator from './protectView/AuthNavigator';


export default function App() {
  const userIsLoggedIn = true;
  return (
    <NavigationContainer>
      {userIsLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
