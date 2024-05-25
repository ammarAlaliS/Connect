import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

const HomeAppScreen = () => {
  // Obtener los datos del usuario del estado global de Redux
  const user = useSelector(state => state.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#060097', '#8204ff', '#c10fff']}
        start={{ x: 0.2, y: 0.6 }}
        end={{ x: 1.5, y: 0 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight
        }}
      />
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      <View className="flex-1 items-center justify-center">
        {user && user.global_user && (
          <View>
            <Text>Nombre: {user.global_user.first_name} {user.global_user.last_name}</Text>
            <Text>Apellido: {user.global_user.last_name}</Text>
            <Text>Email: {user.global_user.email}</Text>
            {/* Agrega más campos según la estructura de datos de tu usuario */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeAppScreen;