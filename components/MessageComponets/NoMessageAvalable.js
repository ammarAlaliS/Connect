import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Polyline, Path } from "react-native-svg";
import { useSelector } from "react-redux";
import { selectTheme } from "../../globalState/themeSlice";

const { height } = Dimensions.get("window");

export default function NoMessageAvalable() {
  const darkMode = useSelector(selectTheme);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode.backgroundDark,
        },
      ]}
    >
      <View style={styles.content}>
        <InboxIcon style={styles.icon} />
        <Text style={[
            styles.title,
            {
                color:darkMode.text
            }
        ]}>No hay mensajes disponibles</Text>
        <Text style={styles.subtitle}>
          Parece que no hay mensajes para mostrar en este momento.
        </Text>
      </View>
    </View>
  );
}

function InboxIcon(props) {
  return (
    <Svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <Path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  content: {
    maxWidth: 400,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 120,
  },
  icon: {
    marginBottom: 16,
    color: "#888888", 
  },
  title: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans-ExtraBold",
    textAlign: "center",
    textTransform:'uppercase',
    lineHeight:32
  },
  subtitle: {
    fontSize: 16,
    color: "#888888", 
    textAlign: "center",
    marginTop: 8,
  },
});
