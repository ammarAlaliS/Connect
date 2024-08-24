import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { setStartLocation, startLocationReset } from '../../../globalState/tripSlice';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAAwUd5bO7daxQUktwliIcG4YA8M5mWhrY';

const SearchInputGoogle = ({ onClose }) => {
  const startLocationName = useSelector((state) => state.trip.startLocation.name);
  const [inputValue, setInputValue] = useState(startLocationName);
  const [isLoading, setIsLoading] = useState(false);
  const googlePlacesRef = useRef(null); 
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Current inputValue:', inputValue);
  }, [inputValue]);

  const handleCurrentLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación');
      return;
    }

    setIsLoading(true);

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const address = await getAddressFromCoordinates(latitude, longitude);

      setInputValue(address || 'Dirección no disponible');
      if (googlePlacesRef.current) {
        googlePlacesRef.current.setAddressText(address || 'Dirección no disponible');
      }
      dispatch(setStartLocation({
        latitude: latitude,
        longitude: longitude,
        name: address,
      }));

      onClose();
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const getAddressFromCoordinates = useCallback(async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        console.error('Error en la respuesta de Geocoding:', data.status);
        return 'No se encontró dirección';
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      return 'Error al obtener dirección';
    }
  }, []);

  const handlePlaceSelect = useCallback((data, details) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      const placeName = details.formatted_address;

      setInputValue(placeName); 
      dispatch(setStartLocation({
        latitude: lat,
        longitude: lng,
        name: placeName,
      }));
      onClose();
    }
  }, [dispatch, onClose]);

  const clearInput = useCallback(() => {
    setInputValue('');
    if (googlePlacesRef.current) {
      googlePlacesRef.current.setAddressText('');
    }
    dispatch(startLocationReset());
  }, [dispatch]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      borderRadius: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    autocompleteContainer: {
      flex: 1,
      zIndex: 2,
    },
    textInput: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: '#fff',
      fontSize: 16,
      color: '#333',
      marginRight: 25,
      paddingRight: 35,
    },
    iconButtonDelete: {
      position: 'absolute',
      right: 30,
      top: '50%',
      transform: [{ translateY: -18 }],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      zIndex: 10,
      padding: 5,
    },
    iconButton: {
      position: 'absolute',
      right: -10,
      top: '50%',
      transform: [{ translateY: -18 }],
      backgroundColor: '#25252C',
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      zIndex: 10,
    },
    listView: {
      position: 'absolute',
      top: 60,
      zIndex: 2,
      backgroundColor: '#fff',
    },
    description: {
      fontSize: 16,
    },
    row: {
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loader: {
      position: 'absolute',
      right: -10,
      top: '50%',
      transform: [{ translateY: -18 }],
      zIndex: 10,
    },
  }), []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          ref={googlePlacesRef}
          placeholder="Buscar"
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'es',
          }}
          fetchDetails={true}
          onPress={handlePlaceSelect}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.textInput,
            listView: styles.listView,
            description: styles.description,
            row: styles.row,
          }}
          textInputProps={{
            value: inputValue,
            onChangeText: (text) => {
              setInputValue(text);
              if (googlePlacesRef.current) {
                googlePlacesRef.current.setAddressText(text);
              }
            },
            placeholderTextColor: '#aaa',
          }}
        />
        {inputValue.length > 0 && (
          <TouchableOpacity
            style={styles.iconButtonDelete}
            onPress={clearInput}
          >
            <Ionicons name="close" size={20} color="#000" />
          </TouchableOpacity>
        )}
        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="small" color="#000" />
        ) : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleCurrentLocation}
          >
            <FontAwesome5 name="map-marker-alt" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInputGoogle;
