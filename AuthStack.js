import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInForm from './screens/SignInForm';
import Register from './screens/Register';
import AdviseMessage from './screens/AdviseMessage';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignInForm" component={SignInForm} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="AdviseMessage" component={AdviseMessage} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
