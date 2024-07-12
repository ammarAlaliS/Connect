// En TravelScreen.js
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import TravelHome from '../components/TravelComponents/TravelHome';
import { toggleDarkMode, selectTheme } from "../globalState/themeSlice";

const TravelScreen = () => {
  const showInitialCard = useSelector((state) => state.travel.showInitialCard);
  const darkMode = useSelector(selectTheme);

  return (
    <View>
      <TravelHome />
    </View>
  );
};

export default TravelScreen;
