import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import XMarkIcon from "../../icons/XMarkIcon";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import SquarePlusIcon from "../../icons/SquarePlusIcon";
import { Entypo } from "@expo/vector-icons";
import {
  setPlacesSelected,
  setQuickarData,
  setSeatRequested,
  setStartTime,
  setTripDestination,
  setTripDestinationName,
  setTripOrigin,
  setTripOriginName,
  setIsInputActive,
} from "../../globalState/travelSlice";
import ClockIcon from "../../icons/ClockIcon";
import PlusIcon from "../../icons/PlusIcon";

const SearchInput = ({ setMarker }) => {
  const dispatch = useDispatch();

  const GOOGLE_PLACES_API_KEY = "";

  const [originCleaning, setOriginCleaning] = useState(false);
  const [destininationCleaning, setDestininationCleaning] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTimeSelected, setDateTimeSelected] = useState(null);
  const [dateTimeSelectedString, setDateTimeSelectedString] = useState("");
  const placesSelected = useSelector((state) => state.travel.placesSelected);
  const seatRequested = useSelector((state) => state.travel.seatRequested);
  const tripOriginName = useSelector((state) => state.travel.tripOriginName);
  const tripDestinationName = useSelector(
    (state) => state.travel.tripDestinationName
  );

  const userType = useSelector((state) => state.travel.userType);

  const refInputAutoComplete = useRef();
  const refInputAutoCompleteDestination = useRef();

  const showInitialCard = useSelector((state) => state.travel.showInitialCard);
  const isOriginAutoCompleteFocused = useSelector(
    (state) => state.travel.isOriginAutoCompleteFocused
  );
  const startTime = useSelector((state) => state.travel.startTime);
  const inputIsActive = useSelector((state) => state.travel.inputIsActive);

  const handleLocationSelectDestination = (data, details) => {
    dispatch(setIsInputActive(true));
    const { lat, lng } = details.geometry.location;

    dispatch(setTripDestination({ latitude: lat, longitude: lng }));
    dispatch(setTripDestinationName(data.description));

    // setMapRegion({
    //   latitude: lat,
    //   longitude: lng,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
    // setMarker({
    //   latitude: lat,
    //   longitude: lng,
    // });
  };

  const handleLocationSelect = (data, details) => {
    dispatch(setIsInputActive(true));
    const { lat, lng } = details.geometry.location;

    dispatch(setTripOrigin({ latitude: lat, longitude: lng }));
    dispatch(setTripOriginName(data.description));

    // setMapRegion({
    //   latitude: lat,
    //   longitude: lng,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
    // setMarker({
    //   latitude: lat,
    //   longitude: lng,
    // });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        console.log("Teclado activado");
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        console.log("Teclado desactivado");
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onAutocompleInputFocus = () => {
    dispatch(setIsInputActive(true));
    setOriginCleaning(false);
  };

  const onAutocompleInputFocusDestination = () => {
    setDestininationCleaning(false);
  };

  const onAutoCompleteOriginChange = (text) => {
    if (!originCleaning) {
      dispatch(setTripOriginName(text));
    }
  };

  const onAutoCompleteDestinationChange = (text) => {
    if (!destininationCleaning) {
      dispatch(setTripDestinationName(text));
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDateTimeSelected(currentDate);

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    setDateTimeSelectedString(formattedTime);

    dispatch(setStartTime({ hour: hours, minutes: minutes }));
  };

  const tripOriginLocation = useSelector((state) => state.travel.tripOrigin);
  const tripDestinationLocation = useSelector(
    (state) => state.travel.tripDestination
  );

  const onSeatNumbersChanges = (text) => {
    let numericValue = text.replace(/[^0-9]/g, "");
    dispatch(setSeatRequested(numericValue));
  };

  const searchQuickCars = async () => {
    if (tripOriginLocation.latitude == 0 && tripOriginLocation.longitude == 0) {
      Alert.alert("Seleccione el origen");
      return;
    }

    if (
      tripDestinationLocation.latitude == 0 &&
      tripDestinationLocation.longitude == 0
    ) {
      Alert.alert("Seleccione el destino");
      return;
    }

    if (seatRequested > 4) {
      Alert.alert("No puedes pedir mas de 4 asientos");
      return;
    }

    if (seatRequested == 0) {
      Alert.alert("Debes solicitar mas de 1 asiento");
      return;
    }

    dispatch(setIsInputActive(false));
    dispatch(setPlacesSelected(true));

    try {
      const data = await fetch(
        "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/drivers-nearby-trip-filters?starLocationLatitude=" +
          tripOriginLocation.latitude +
          "&starLocationLongitude=" +
          tripOriginLocation.longitude +
          "&endLocationLatitude=" +
          tripDestinationLocation.latitude +
          "&endLocationLongitude=" +
          tripDestinationLocation.longitude +
          "&starTimeHour=" +
          startTime.hour +
          "&starTimeMinutes=" +
          startTime.minutes +
          "&numberOfSeatRequested=" +
          seatRequested
      ).then((res) => res.json());

      if (data && data.conductores && data.conductores[0]) {
        dispatch(setQuickarData(data.conductores));
      }
    } catch (error) {
      console.log("Ocurrio un error");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!placesSelected && !inputIsActive) {
      if (refInputAutoComplete.current) {
        refInputAutoComplete.current.clear();
        refInputAutoComplete.current.blur();
      }
      if (refInputAutoCompleteDestination.current) {
        refInputAutoCompleteDestination.current.clear();
        refInputAutoCompleteDestination.current.blur();
      }
    }
  }, [inputIsActive, placesSelected]);

  return (
    <>
      {inputIsActive && (
        <View
          style={styles.backgroundContainer}
          onTouchEnd={() => {
            dispatch(setIsInputActive(false));
            refInputAutoComplete.current.clear();
            refInputAutoCompleteDestination.current.clear();
            refInputAutoComplete.current.blur();
            refInputAutoCompleteDestination.current.blur();
            if (!placesSelected) {
              dispatch(setStartTime({ hour: 0, minutes: 0 }));
              dispatch(setSeatRequested(0));
              dispatch(setTripOrigin({ latitude: 0, longitude: 0 }));
              dispatch(setTripOriginName(""));
              dispatch(setTripDestination({ latitude: 0, longitude: 0 }));
              dispatch(setTripDestinationName(""));
            }
          }}
        ></View>
      )}

      <View style={styles.principalContainer}>
        <View
          style={[
            styles.inputsContainer,
            { backgroundColor: !inputIsActive ? "white" : "#f4f5f6" },
          ]}
        >
          {(inputIsActive || placesSelected) && (
            <View style={styles.secondInputContainer}>
              <View style={styles.originCircle}></View>
              <View style={styles.borderIdentifier}></View>
              <View style={styles.destinationCircle}></View>
            </View>
          )}
          <View
            style={[
              inputIsActive || placesSelected ? {} : { height: 46 },
              styles.thirdInputContainer,
              { width: inputIsActive || placesSelected ? "90%" : "100%" },
            ]}
          >
            <View style={styles.fourthInputContainer}>
              <GooglePlacesAutocomplete
                ref={refInputAutoComplete}
                minLength={3}
                placeholder={
                  inputIsActive
                    ? "Origen del viaje"
                    : userType == "driver"
                    ? "Crea un Viaje!!"
                    : "A donde quieres ir?"
                }
                fetchDetails={true}
                onPress={handleLocationSelect}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: "es",
                  components: "country:es",
                }}
                styles={{
                  textInput: [
                    {
                      backgroundColor: !inputIsActive ? "white" : "#f4f5f6",
                      fontFamily: "PlusJakartaSans-Regular",
                    },
                    styles.originAutoCompleteTextInputStyle,
                  ],
                  listView: styles.listView,
                }}
                textInputProps={{
                  onFocus: onAutocompleInputFocus,
                  onChangeText: onAutoCompleteOriginChange,
                }}
              />
              {inputIsActive && tripOriginName?.length > 0 && (
                <TouchableOpacity
                  style={{ marginTop: 9 }}
                  onPressOut={() => {
                    refInputAutoComplete.current.clear();
                    refInputAutoComplete.current.blur();
                    dispatch(setTripOriginName(""));
                    setOriginCleaning(true);
                  }}
                >
                  <XMarkIcon height={26} width={26} color={"#000"}></XMarkIcon>
                </TouchableOpacity>
              )}
              {!inputIsActive && (
                <TouchableOpacity
                  style={{
                    marginTop: 0,
                    justifyContent: "center",
                  }}
                >
                  {!inputIsActive &&
                    !placesSelected &&
                    userType == "passenger" && (
                      <Icon
                        style={{ padding: 0 }}
                        name="search"
                        size={21}
                        color={"#00000050"}
                        onPress={() => {
                          dispatch(setIsInputActive(true));
                        }}
                      />
                    )}
                  {!inputIsActive &&
                    !placesSelected &&
                    userType == "driver" && (
                      <PlusIcon
                        width={22}
                        height={22}
                        color={"#00000050"}
                        strokeWidth={3}
                        onPressOut={() => {
                          dispatch(setIsInputActive(true));
                        }}
                      ></PlusIcon>
                    )}
                  {!inputIsActive && placesSelected && (
                    <Entypo
                      name="block"
                      size={24}
                      color="#00000080"
                      style={{ marginRight: 4 }}
                      onPress={() => {
                        dispatch(setIsInputActive(true));
                        dispatch(setTripOriginName(""));
                        dispatch(setTripDestinationName(""));
                        dispatch(setPlacesSelected(false));
                        dispatch(setTripOrigin({ latitude: 0, longitude: 0 }));
                        dispatch(
                          setTripDestination({ latitude: 0, longitude: 0 })
                        );
                      }}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
            {(inputIsActive || placesSelected) && (
              <View style={styles.destinationAutoCompleteContainer}>
                <GooglePlacesAutocomplete
                  ref={refInputAutoCompleteDestination}
                  placeholder={
                    inputIsActive ? "Destino del viaje" : "Busca un QuickCar"
                  }
                  fetchDetails={true}
                  onPress={handleLocationSelectDestination}
                  query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "es",
                    components: "country:es",
                  }}
                  styles={{
                    textInput: [
                      {
                        backgroundColor: !inputIsActive ? "white" : "#f4f5f6",
                        fontFamily: "PlusJakartaSans-Regular",
                      },
                      styles.originAutoCompleteTextInputStyle,
                    ],
                    listView: styles.listView,
                  }}
                  textInputProps={{
                    onFocus: onAutocompleInputFocusDestination,
                    onChangeText: onAutoCompleteDestinationChange,
                  }}
                />

                {inputIsActive && tripDestinationName?.length > 0 && (
                  <TouchableOpacity
                    style={{ marginTop: 9 }}
                    onPressOut={() => {
                      refInputAutoCompleteDestination.current.clear();
                      refInputAutoCompleteDestination.current.blur();
                      dispatch(setTripDestinationName(""));
                      setDestininationCleaning(true);
                    }}
                  >
                    <XMarkIcon
                      height={26}
                      width={26}
                      color={"#000"}
                    ></XMarkIcon>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>

        {inputIsActive && (
          <View
            style={{
              backgroundColor: "#f4f5f6",
              marginTop: 12,
              height: 46,
              justifyContent: "space-between",
              paddingHorizontal: 10,
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ClockIcon height={25} width={25} color={"#0000ff99"}></ClockIcon>
            <TextInput
              style={{
                width: "100%",
                fontSize: 16,
                marginLeft: 10,
                fontFamily: "PlusJakartaSans-Regular",
              }}
              onFocus={() => {
                setShowDatePicker(true);
              }}
              showSoftInputOnFocus={false}
              value={dateTimeSelectedString}
              placeholder="Selecciona la hora"
            ></TextInput>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                locale="es-ES"
                onChange={onChange}
              />
            )}
          </View>
        )}

        {inputIsActive && (
          <View
            style={{
              backgroundColor: "#f4f5f6",
              marginTop: 12,
              height: 46,
              justifyContent: "space-between",
              paddingHorizontal: 10,
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SquarePlusIcon
              color={"#2b00b6"}
              height={25}
              width={30}
            ></SquarePlusIcon>
            <TextInput
              style={{
                width: "100%",
                fontSize: 16,
                fontFamily: "PlusJakartaSans-Regular",
              }}
              placeholder={
                userType == "driver"
                  ? "Numero de asientos libres"
                  : "Numero de asientos"
              }
              onChangeText={onSeatNumbersChanges}
              inputMode="numeric"
              value={seatRequested == 0 ? "" : seatRequested}
            ></TextInput>
          </View>
        )}

        {inputIsActive && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 12,
            }}
          >
            {/* <TouchableOpacity
              style={{
                height: 42,
                backgroundColor: "#ffbb1c",
                justifyContent: "center",
                alignItems: "center",
                width: "45%",
                borderRadius: 10,
              }}
              onPress={() => {
                setIsInputActive(false);
                dispatch(setPlacesSelected(false));
                refInputAutoComplete.current.blur();
                refInputAutoCompleteDestination.current.blur();
              }}
            >
              <Text style={{ fontSize: 16 }}>Cancelar</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                height: 46,
                backgroundColor: userType == "driver" ? "#ffbb1c" : "#2b00b6",
                justifyContent: "center",
                alignItems: "center",
                width: "65%",
                borderRadius: 10,
              }}
              onPress={() => {
                if (userType == "passenger") {
                  searchQuickCars();
                } else {
                  Alert.alert("Creaste un viaje");
                }
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: userType == "driver" ? "#000" : "#f4f5f6",
                  fontFamily: "PlusJakartaSans-Bold",
                }}
              >
                {userType == "driver" ? "Crear viajee" : "Buscar QuickCars"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  autocompleteContainer: {
    // height: 44,
    // position: "absolute",
    // top: 10,
    // left: 10,
    // right: 10,
  },
  listView: {
    backgroundColor: "white",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
    height: "100%",
    width: "100%",
    backgroundColor: "#00000050",
  },
  principalContainer: {
    width: "85%",
    position: "absolute",
    top: "5%",
    left: 0,
    zIndex: 100,
    marginHorizontal: "7.5%",
    display: "flex",
    flexDirection: "column",
  },
  inputsContainer: {
    width: "100%",
    padding: 1,
    display: "flex",
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 5,
  },
  secondInputContainer: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 13,
    width: "10%",
    alignItems: "center",
  },
  originCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "#2b00b6",
  },
  borderIdentifier: {
    flex: 1,
    borderLeftWidth: 3.5,
    borderColor: "#00000030",
    borderStyle: "dotted",
    width: 1,
  },
  destinationCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "#ffbb1c",
  },
  thirdInputContainer: {
    padding: 0,
    display: "flex",
    flexDirection: "column",
    paddingRight: 10,
  },
  fourthInputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  originAutoCompleteTextInputStyle: {
    fontSize: 16,
    textAlign: "left",
    color: "black",
  },
  destinationAutoCompleteContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#00000030",
    borderStyle: "solid",
  },
});

export default SearchInput;
