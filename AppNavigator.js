import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import LoadScreen from "./screens/LoadScreen";
import useAuthCheck from "./api/checkSession";

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { checkSession } = useAuthCheck();

  useEffect(() => {
    const initialize = async () => {
      const result = await checkSession();
      setIsAuthenticated(result.isAuthenticated);
    };

    initialize();
  }, [checkSession]);

  if (isAuthenticated === null) {
    // Mostrar pantalla de carga o inicialización
    return <LoadScreen />;
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
