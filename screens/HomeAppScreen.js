import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import AppHeader from '../components/AppHeader'

const HomeAppScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <AppHeader/>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl">Bienvenido a quickcar</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeAppScreen