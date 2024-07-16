import {
  Keyboard,
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
import CalendarIcon from "../../icons/CalendarIcon";
import SquarePlusIcon from "../../icons/SquarePlusIcon";
import { Entypo } from "@expo/vector-icons";
import { setPlacesSelected } from "../../globalState/travelSlice";

const SearchInput = ({ setRegion, setMarker }) => {
  const dispatch = useDispatch();

  const GOOGLE_PLACES_API_KEY = "AIzaSyAAwUd5bO7daxQUktwliIcG4YA8M5mWhrY";

  const [inputIsActive, setInputIsActive] = useState(false);
  const [originCleaning, setOriginCleaning] = useState(false);
  const [destininationCleaning, setDestininationCleaning] = useState(false);
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(null);
  const [dateSelectedString, setDateSelectedString] = useState("");
  const placesSelected = useSelector((state) => state.travel.placesSelected);
  // const [placesSelected, setPlacesSelected] = useState(false);

  const refInputAutoComplete = useRef();
  const refInputAutoCompleteDestination = useRef();

  const showInitialCard = useSelector((state) => state.travel.showInitialCard);
  const isOriginAutoCompleteFocused = useSelector(
    (state) => state.travel.isOriginAutoCompleteFocused
  );

  const handleLocationSelectDestination = (data, details) => {
    setInputIsActive(true);
    const { lat, lng } = details.geometry.location;

    setDestinationName(data.description);

    // setRegion({
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
    setInputIsActive(true);
    const { lat, lng } = details.geometry.location;

    setDestinationName(data.description);

    // console.log(data);
    // console.log(details);
    // setRegion({
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
    setInputIsActive(true);
    setOriginCleaning(false);
  };

  const onAutocompleInputFocusDestination = () => {
    setDestininationCleaning(false);
  };

  const onAutoCompleteOriginChange = (text) => {
    console.log("Se ejecuta mas de una ves " + originName);
    if (!originCleaning) {
      setOriginName(text);
    }
  };

  const onAutoCompleteDestinationChange = (text) => {
    if (!destininationCleaning) {
      setDestinationName(text);
    }
  };

  const onChange = (selectedDate, date) => {
    const currentDate = selectedDate || date;

    setDateSelected(currentDate);

    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    setDateSelectedString(formattedDate);

    setShowDatePicker(false);
  };

  useEffect(() => {
    if (!placesSelected) {
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
            setInputIsActive(false);
            refInputAutoComplete.current.clear();
            refInputAutoCompleteDestination.current.clear();
            refInputAutoComplete.current.blur();
            refInputAutoCompleteDestination.current.blur();
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
                  inputIsActive ? "Origen del viaje" : "Busca un QuickCar"
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
              {inputIsActive && originName?.length > 0 && (
                <TouchableOpacity
                  style={{ marginTop: 9 }}
                  onPressOut={() => {
                    refInputAutoComplete.current.clear();
                    refInputAutoComplete.current.blur();
                    setOriginName("");
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
                  {!inputIsActive && !placesSelected && (
                    <Icon
                      style={{ padding: 0 }}
                      name="search"
                      size={21}
                      color={"#00000050"}
                      onPress={() => {
                        setInputIsActive(true);
                      }}
                    />
                  )}
                  {!inputIsActive && placesSelected && (
                    <Entypo
                      name="block"
                      size={24}
                      color="#00000080"
                      style={{ marginRight: 4 }}
                      onPress={() => {
                        setInputIsActive(false);
                        setOriginName("");
                        setDestinationName("");
                        dispatch(setPlacesSelected(false));
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

                {inputIsActive && destinationName?.length > 0 && (
                  <TouchableOpacity
                    style={{ marginTop: 9 }}
                    onPressOut={() => {
                      refInputAutoCompleteDestination.current.clear();
                      refInputAutoCompleteDestination.current.blur();
                      setDestinationName("");
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
            <CalendarIcon
              color={"#0000ff99"}
              height={25}
              width={30}
            ></CalendarIcon>
            <TextInput
              style={{ width: "100%" }}
              onFocus={() => {
                setShowDatePicker(true);
              }}
              showSoftInputOnFocus={false}
              value={dateSelectedString}
              placeholder="Selecciona la hora"
            ></TextInput>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                locale="es-ES"
                onChange={(e, selectDate) => {
                  onChange(selectDate, dateSelected);
                }}
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
              style={{ width: "100%" }}
              placeholder="Numero de asientos"
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
                setInputIsActive(false);
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
                backgroundColor: "#2b00b6",
                justifyContent: "center",
                alignItems: "center",
                width: "65%",
                borderRadius: 10,
              }}
              onPress={() => {
                setInputIsActive(false);
                dispatch(setPlacesSelected(true));
              }}
            >
              <Text style={{ fontSize: 16, color: "#f4f5f6" }}>
                Buscar QuickCars
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
