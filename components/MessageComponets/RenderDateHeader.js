// src/components/MessageComponents/renderDateHeader.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet,  ActivityIndicator, } from "react-native";
import { useSelector } from "react-redux";


const RenderDateHeader = ({ darkMode, totalMessage }) => {
  const currentPage = useSelector((state) => state.messages.currentPage);
  const currentDate = useSelector((state) => state.messages.currentDate);
  const totalPages = useSelector((state) => state.messages.totalPages);
  const loading = useSelector((state) => state.loading);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.section,
          {
          
            backgroundColor: darkMode.background,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor:darkMode.contentMessageBorderColor,
          },
        ]}
      >
        <Text style={[styles.text, { color: darkMode.text }]}>
          Página #{currentPage} de {totalPages}
        </Text>
      </View>
      <View
        style={[
          styles.dateWrapper,
          {
            backgroundColor: darkMode.backgroundDark,
            paddingHorizontal: 4,
            borderTopWidth: 1,
            borderColor: darkMode.contentMessageBorderColor,
          },
        ]}
      >
       
          <Text
          style={[
            styles.date,
            {
              color: "#fff",
              borderColor: darkMode.contentMessageBorderColor,
              backgroundColor: "#444446",
              borderRadius:9999
            },
          ]}
        >
          QuickCar
        </Text>
      </View>
      <View
        style={[
          styles.section,
          {
           
            backgroundColor: darkMode.background,
            borderLeftWidth: 1,
            borderBottomWidth:1,
            borderColor: darkMode.contentMessageBorderColor,
          },
        ]}
      >
        <Text style={[styles.text, { color: darkMode.text }]}>
          Total de mensajes <Text>{totalMessage}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
  dateWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    borderWidth: 1,
    paddingHorizontal: 8,

    marginVertical: 4,
  },
});

export default RenderDateHeader;
