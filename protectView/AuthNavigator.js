import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAppScreen from '../screens/HomeAppScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeApp" component={HomeAppScreen} />
    </Stack.Navigator>
  );
}
