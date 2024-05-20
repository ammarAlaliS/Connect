import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MarketScreen from './screens/MarketScreen'
import SignIn from './screens/SignIn';


const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}

      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Market" component={MarketScreen} />
      <Stack.Screen name="signIn" component={SignIn} />
    </Stack.Navigator>
  );
}