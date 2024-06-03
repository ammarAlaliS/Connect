import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'  /* con este hook podemos acceder al estado global de la store */

const Header = () => {
  const user = useSelector((state) => state.user)
  return (
    <View>
      <Text>redux Toolkit Example</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Username: {user.username}</Text>
    </View>
  )
}

export default Header