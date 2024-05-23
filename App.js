import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './protectView/AuthNavigator';
import { store } from './globalState/Store';
import Toast, { BaseToast } from 'react-native-toast-message';

const ToastComponent = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

export default function App() {
  const userIsLoggedIn = true; 
  return (
    <Provider store={store}>
      <NavigationContainer>
        {userIsLoggedIn ? <MainNavigator /> : <AuthNavigator />}
        <ToastComponent />
      </NavigationContainer>
    </Provider>
  );
}
