
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

// Función para cargar las fuentes
const fetchFonts = () => {
  return Font.loadAsync({
    'plus-jakarta-sans': {
      uri: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400&display=swap',
    },
  });
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}