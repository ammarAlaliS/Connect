import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React from 'react';

const comments = [
  {
    username: 'John Doe',
  text: 'Este es un artículo increíblemente bien escrito. Realmente disfruté cómo abordaste todos los puntos clave y proporcionaste ejemplos claros. ¡Gracias por compartir tu conocimiento y experiencia!',
    avatarUrl: 'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h8WnIp0t09oQ7kNvgEoLAc5&_nc_ht=scontent.fmga3-1.fna&oh=00_AYA0rNhX7kli6UFFqyyCOSLokYY2JCOWZLg2LY1r8hKneg&oe=666BE711',
  },
  {
    username: 'Jane Smith',
    text: 'Thanks for sharing!',
    avatarUrl: 'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h8WnIp0t09oQ7kNvgEoLAc5&_nc_ht=scontent.fmga3-1.fna&oh=00_AYA0rNhX7kli6UFFqyyCOSLokYY2JCOWZLg2LY1r8hKneg&oe=666BE711',
  },
  {
    username: 'John Doe',
  text: 'Este es un artículo increíblemente bien escrito. Realmente disfruté cómo abordaste todos los puntos clave y proporcionaste ejemplos claros. ¡Gracias por compartir tu conocimiento y experiencia!',
    avatarUrl: 'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h8WnIp0t09oQ7kNvgEoLAc5&_nc_ht=scontent.fmga3-1.fna&oh=00_AYA0rNhX7kli6UFFqyyCOSLokYY2JCOWZLg2LY1r8hKneg&oe=666BE711',
  },
  {
    username: 'Jane Smith',
    text: 'Thanks for sharing!',
    avatarUrl: 'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h8WnIp0t09oQ7kNvgEoLAc5&_nc_ht=scontent.fmga3-1.fna&oh=00_AYA0rNhX7kli6UFFqyyCOSLokYY2JCOWZLg2LY1r8hKneg&oe=666BE711',
  },
  {
    username: 'John Doe',
  text: 'Este es un artículo increíblemente bien escrito. Realmente disfruté cómo abordaste todos los puntos clave y proporcionaste ejemplos claros. ¡Gracias por compartir tu conocimiento y experiencia!',
    avatarUrl: 'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h8WnIp0t09oQ7kNvgEoLAc5&_nc_ht=scontent.fmga3-1.fna&oh=00_AYA0rNhX7kli6UFFqyyCOSLokYY2JCOWZLg2LY1r8hKneg&oe=666BE711',
  },
  {
    username: 'Jane Smith',
    text: 'Thanks for sharing!',
    avatarUrl: 'https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h8WnIp0t09oQ7kNvgEoLAc5&_nc_ht=scontent.fmga3-1.fna&oh=00_AYA0rNhX7kli6UFFqyyCOSLokYY2JCOWZLg2LY1r8hKneg&oe=666BE711',
  },
];

const Commet_C = () => {
  return (
    <View className=" flex-1  px-4  bg-gray-200 py-2">
      <ScrollView className=" space-y-2">
        {comments.map((comment, index) => (
          <View key={index} className="flex-row bg-[#f9f9f9] rounded-lg items-center space-x-2  py-5 px-4 border-[1px] border-gray-200/10  shadow-sm shadow-black ">
            <View className="h-full">
              <Image source={{ uri: comment.avatarUrl }} className=" w-16 h-16 rounded-full" />
            </View>
            <View className="flex-1 space-y-4">
              <View className="flex-row justify-between">
                <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-sm ">
                  {comment.username}
                </Text>
                <Text style={{ fontFamily: 'PlusJakartaSans-Bold', }} className=" text-[12px]">
                  6/8/2024
                </Text>
              </View>
              <View className="bg-gray-200 p-2 rounded-xl">
                <Text>{comment.text}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}


export default Commet_C