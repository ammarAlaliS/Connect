// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import MainNavigator from "./MainNavigator";
import { store } from "./globalState/Store";
import Toast, { BaseToast } from "react-native-toast-message";
import { navigationRef } from "./utils/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ToastComponent = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

export default function App() {
  const [navReady, setNavReady] = useState(false);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => setNavReady(true)}
        >
          <MainNavigator navReady={navReady} />
          <ToastComponent />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
