import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './protectView/AuthNavigator';
import { store } from './globalState/Store';

export default function App() {
  const userIsLoggedIn = true;
  return (

    <Provider store={store}>
      <NavigationContainer>
        {userIsLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>

  );
}
