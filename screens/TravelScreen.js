import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../globalState/themeSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import TravelHeader from '../components/TravelComponents/TravelHeader';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SearchInputGoogle from '../components/TravelComponents/BottomSheet/SearchInputGoogle';

const statusBarHeight = StatusBar.currentHeight || 0;
const { height: screenHeight } = Dimensions.get('window');

const TravelScreen = () => {
  const darkMode = useSelector(selectTheme);
  const colors = darkMode;

  const startLocationName = useSelector((state) => state.trip.startLocation.name);
  const startLocationLatitude = useSelector((state) => state.trip.startLocation.latitude);
  const startLocationLongitude = useSelector((state) => state.trip.startLocation.longitude);

  const [formValues, setFormValues] = useState({
    fromLocation: startLocationName || '',
    toLocation: '',
    time: '',
    sit: '',
  });
  const [activeField, setActiveField] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    require('../assets/imgs/bg.jpg'),
    require('../assets/imgs/bg2.jpg'),
    require('../assets/imgs/bg3.jpg'),
    require('../assets/imgs/bg4.jpg'),
  ];

  const bsRef = useRef(null);
  const snapPoints = useMemo(() => ['53%'], []);

  const imageOpacity = useRef(new Animated.Value(1)).current;
  const newImageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 700,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(newImageOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        newImageOpacity.setValue(0);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, imageOpacity, newImageOpacity]);

  useEffect(() => {
    Animated.timing(newImageOpacity, {
      toValue: 1,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [imageIndex, newImageOpacity]);

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      fromLocation: startLocationName || '',
    }));
  }, [startLocationName]);

  const handleSheetChanges = (index) => {
    console.log('BottomSheet index:', index);
  };

  const closeBottomSheet = () => {
    bsRef.current?.close();
  };

  const renderBottomSheetContent = () => {
    switch (activeField) {
      case 'fromLocation':
        return <SearchInputGoogle onClose={closeBottomSheet} />;
      case 'toLocation':
      case 'time':
      case 'sit':
        return <Text>Seleccione {activeField}</Text>;
      default:
        return <Text>Seleccione una opción</Text>;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundDark,
          paddingTop: statusBarHeight,
        },
      ]}
    >
      <TravelHeader darkMode={darkMode} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.backgroundContainer}>
          <Animated.Image
            source={images[imageIndex]}
            style={[styles.backgroundImage, { opacity: imageOpacity }]}
            resizeMode="cover"
          />
          <Animated.Image
            source={images[(imageIndex + 1) % images.length]}
            style={[
              styles.backgroundImage,
              { opacity: newImageOpacity, position: 'absolute' },
            ]}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: [{ translateY: -screenHeight * 0.1 }],
            marginHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.borderBox,
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {['fromLocation', 'toLocation', 'time', 'sit'].map((field, index) => (
              <TouchableOpacity
                key={field}
                onPress={() => {
                  setActiveField(field);
                  bsRef.current?.expand();
                }}
                style={[
                  styles.inputField,
                  index > 0 && styles.borderTop,
                  {
                    backgroundColor: colors.background,
                    borderTopWidth: index > 0 ? 1 : 0,
                    borderColor: colors.borderBox,
                  },
                ]}
                activeOpacity={1}
                accessibilityLabel={`Select ${field}`}
                accessibilityHint={`Tap to choose your ${field}`}
              >
                <Icon field={field} color={colors.text} />
                <Text style={[styles.inputText, { color: colors.text }]}>
                  {formValues[field] || placeholderText[field]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ width: '100%' }}>
            <TouchableOpacity
              style={[buttonStyles.primaryButton, { borderColor: colors.borderBox }]}
              onPress={() => {
                console.log('Search button pressed');
              }}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="search" size={20} color="#fff" style={styles.icon} />
              <Text style={buttonStyles.primaryButtonText}>Buscar viaje</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bsRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </SafeAreaView>
  );
};

const placeholderText = {
  fromLocation: 'De',
  toLocation: 'A',
  time: 'Hora y Fecha',
  sit: 'Asientos',
};

const Icon = ({ field, color }) => {
  switch (field) {
    case 'fromLocation':
      return <FontAwesome5 name="location-arrow" size={20} color={color} style={styles.icon} />;
    case 'toLocation':
      return <MaterialIcons name="place" size={20} color={color} style={styles.icon} />;
    case 'time':
      return <FontAwesome5 name="calendar-alt" size={20} color={color} style={styles.icon} />;
    case 'sit':
      return <FontAwesome5 name="chair" size={20} color={color} style={styles.icon} />;
    default:
      return null;
  }
};

const buttonStyles = StyleSheet.create({
  primaryButton: {
    flexDirection: 'row',
    borderRadius: 9999,
    backgroundColor: '#6200EE',
    marginVertical: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundContainer: {
    width: '100%',
    height: screenHeight * 0.4,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  card: {
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  borderTop: {
    borderTopWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  bottomSheetContent: {
    backgroundColor: 'red',
  },
});

export default TravelScreen;
