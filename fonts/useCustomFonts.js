import { useCallback } from 'react';
import { useFonts } from 'expo-font';


// Función para cargar las fuentes personalizadas y ocultar la pantalla de inicio
const useCustomFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    'PlusJakartaSans-ExtraLight': require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    'PlusJakartaSans-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    
    'PlusJakartaSans-SemiBold': require('../assets/fonts/Lato-Regular.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'PlusJakartaSans-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),

    // Elina font 

    'Eina01-BoldItalic': require('../assets/fonts/Eina01-BoldItalic.ttf')
 
   

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onLayoutRootView };
};

export default useCustomFonts;