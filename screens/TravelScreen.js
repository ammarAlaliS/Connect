// En TravelScreen.js
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import TravelHome from "../components/TravelComponents/TravelHome";
import { selectTheme } from "../globalState/themeSlice";

const TravelScreen = () => {
  const darkMode = useSelector(selectTheme);

  return (
    <View>
      <TravelHome />
    </View>
  );
};

export default TravelScreen;
