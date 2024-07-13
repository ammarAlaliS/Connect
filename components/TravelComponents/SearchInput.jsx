import {
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native-animatable";
import XMarkIcon from "../../icons/XMarkIcon";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import MapIcon from "../../icons/MapIcon";
import LogginIcon from "../../icons/LogginIcon";
import UserIcon from "../../icons/UserIcon";

const SearchInput = ({ setRegion, setMarker }) => {
  const GOOGLE_PLACES_API_KEY = "AIzaSyAAwUd5bO7daxQUktwliIcG4YA8M5mWhrY";

  const [inputIsActive, setInputIsActive] = useState(false);
  const [originCleaning, setOriginCleaning] = useState(false);
  const [destininationCleaning, setDestininationCleaning] = useState(false);
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [busquedaIniciada, setBusquedaIniciada] = useState(false);

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

  return (
    <>
      {inputIsActive && (
        <View
          style={styles.backgroundContainer}
          onTouchEnd={() => {
            setInputIsActive(false);
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
          {inputIsActive && (
            <View style={styles.secondInputContainer}>
              <View style={styles.originCircle}></View>
              <View style={styles.borderIdentifier}></View>
              <View style={styles.destinationCircle}></View>
            </View>
          )}
          <View
            style={[
              inputIsActive ? {} : { height: 46 },
              styles.thirdInputContainer,
              { width: inputIsActive ? "90%" : "100%" },
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
                  <Icon
                    style={{ padding: 0 }}
                    name="search"
                    size={21}
                    color={"#00000050"}
                    onPress={() => {
                      setInputIsActive(true);
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {inputIsActive && (
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
            <MapIcon color={"#0000ff99"} height={25} width={30}></MapIcon>
            <TextInput
              style={{ width: "100%" }}
              placeholder={"Fecha y Hora" + originName + ", " + destinationName}
            ></TextInput>
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
            <UserIcon color={"#00000090"} height={25} width={30}></UserIcon>
            <TextInput
              style={{ width: "100%" }}
              placeholder="Numero de asientos"
            ></TextInput>
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
    borderWidth: 0.5,
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
