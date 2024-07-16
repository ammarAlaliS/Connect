import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MessagerContainer from "../components/MessageComponets/MessagerContainer";
const ContactScreen = ({ darkMode }) => {
  return (
    <View className=" mt-[2px] space-y-[2px]">
      <View>
        <MessagerContainer
          userImageUrl="https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mYZAwqPXVMMQ7kNvgEAdu89&_nc_ht=scontent.fmga3-1.fna&oh=00_AYDU7TQrIBYxTgfGXuwKV6JuX8JaX39m-4Jc1OKYbQCKNg&oe=669B5D11"
          userFirtName="Walid"
          userLastName="Ammar"
          messageContent="que onda como vas!"
          totalMessage="1"
          messageState="Just now"
          darkMode={darkMode}
        />
      </View>
      <View>
        <MessagerContainer
          userImageUrl="https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mYZAwqPXVMMQ7kNvgEAdu89&_nc_ht=scontent.fmga3-1.fna&oh=00_AYDU7TQrIBYxTgfGXuwKV6JuX8JaX39m-4Jc1OKYbQCKNg&oe=669B5D11"
          userFirtName="Walid"
          userLastName="Ammar"
          messageContent="que onda como vas!"
          totalMessage="1"
          messageState="Just now"
          darkMode={darkMode}
        />
      </View>
      <View>
        <MessagerContainer
          userImageUrl="https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mYZAwqPXVMMQ7kNvgEAdu89&_nc_ht=scontent.fmga3-1.fna&oh=00_AYDU7TQrIBYxTgfGXuwKV6JuX8JaX39m-4Jc1OKYbQCKNg&oe=669B5D11"
          userFirtName="Walid"
          userLastName="Ammar"
          messageContent="que onda como vas!"
          totalMessage="1"
          messageState="Just now"
          darkMode={darkMode}
        />
      </View>
      <View>
        <MessagerContainer
          userImageUrl="https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/430662477_3753105765016122_830661294830137238_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=mYZAwqPXVMMQ7kNvgEAdu89&_nc_ht=scontent.fmga3-1.fna&oh=00_AYDU7TQrIBYxTgfGXuwKV6JuX8JaX39m-4Jc1OKYbQCKNg&oe=669B5D11"
          userFirtName="Walid"
          userLastName="Ammar"
          messageContent="que onda como vas!"
          totalMessage="1"
          messageState="Just now"
          darkMode={darkMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactScreen;
