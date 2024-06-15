import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import InputSelectBox from "./InputSelectBox";
import { ScrollView } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import XMarkIcon from "../../icons/XMarkIcon";

const FilterModal = ({ setShowFilterModal }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [show, setShow] = useState(0);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const [minDateString, setMinDateString] = useState("");
  const [maxDateString, setMaxDateString] = useState("");

  const showDatepicker = (value) => {
    setShow(value);
  };

  const onChange = (selectedDate, date, setDate, setDateString) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShow(0);

    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    setDateString(formattedDate);

    setShow(0);
  };

  const listCategories = ["Todos", "Moto", "Carro", "Articulo", "Camioneta"];

  const handleChange = (setValue, text) => {
    let numericValue = text.replace(/[^0-9.]/g, "");
    if (text.indexOf(".") >= 0) {
      let index = text.indexOf(".");
      let secondIndex = text.indexOf(".", index + 1);
      if (secondIndex >= 0) {
        numericValue = numericValue.substring(0, numericValue.length - 1.32);
      }
    }
    setValue(numericValue);
  };

  return (
    <View style={styles.principalContainer}>
      <View style={styles.secondContainer}>
        <View
          style={styles.exitIconContainer}
          onTouchEnd={() => {
            setShowFilterModal(false);
          }}
        >
          <TouchableOpacity>
            <XMarkIcon width={30} height={30} color={"#000"}></XMarkIcon>
          </TouchableOpacity>
        </View>

        <Text style={styles.titleFilterContainer}>Filtros de la tienda</Text>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.priceLabel}>Precio</Text>
          <View style={styles.priceInputContainer} className="d-flex flex-row">
            <View>
              <Text style={styles.subLabel}>Minimo</Text>
              <TextInput
                style={styles.inputPriceStyle}
                value={minPrice <= 0 || minPrice == null ? "" : `€ ${minPrice}`}
                onChangeText={(text) => {
                  handleChange(setMinPrice, text);
                }}
                keyboardType="numeric"
                placeholder="€ 0.00"
              ></TextInput>
            </View>
            <View>
              <Text style={styles.subLabel}>Maximo</Text>
              <TextInput
                style={styles.inputPriceStyle}
                value={maxPrice <= 0 || maxPrice == null ? "" : `€ ${maxPrice}`}
                onChangeText={(text) => {
                  handleChange(setMaxPrice, text);
                }}
                keyboardType="numeric"
                placeholder="€ 0.00"
              ></TextInput>
            </View>
          </View>

          <Text style={styles.dateLabel}>Fecha</Text>
          <View style={styles.dateInputContainer} className="d-flex flex-row">
            <View>
              <Text style={styles.subLabel}>Desde:</Text>
              <TextInput
                style={styles.fromDateInput}
                onFocus={() => {
                  showDatepicker(1);
                }}
                showSoftInputOnFocus={false}
                value={minDateString}
                placeholder="Selecciona la fecha"
              ></TextInput>
              {show == 1 && (
                <DateTimePicker
                  value={minDate}
                  mode="date"
                  display="default"
                  locale="es-ES"
                  onChange={(e, selectedDate) => {
                    onChange(
                      selectedDate,
                      minDate,
                      setMinDate,
                      setMinDateString
                    );
                  }}
                />
              )}
            </View>
            <View>
              <Text style={styles.subLabel}>Hasta:</Text>
              <TextInput
                style={styles.toDateInput}
                onFocus={() => {
                  showDatepicker(2);
                }}
                showSoftInputOnFocus={false}
                value={maxDateString}
                placeholder="Selecciona la fecha"
              ></TextInput>
              {show == 2 && (
                <DateTimePicker
                  value={maxDate}
                  mode="date"
                  display="default"
                  locale="es-ES"
                  onChange={(e, selectedDate) => {
                    onChange(
                      selectedDate,
                      maxDate,
                      setMaxDate,
                      setMaxDateString
                    );
                  }}
                />
              )}
            </View>
          </View>
          <Text style={styles.categoryLabel}>Categoria</Text>
          <View style={styles.categorySelectInputContainer}>
            <InputSelectBox
              placeHolder={"Seleccione una categoria"}
              listItems={listCategories}
            ></InputSelectBox>
          </View>
        </ScrollView>
        <View style={styles.buttonFilterContainer} className="d-flex flex-row">
          <TouchableOpacity
            style={styles.bottonFilter}
            onPress={() => {
              setShowFilterModal(false);
            }}
          >
            <Text style={styles.bottonFilterText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  principalContainer: {
    backgroundColor: "#00000030",
    height: "100%",
    paddingTop: "50%",
    paddingHorizontal: 16,
  },
  secondContainer: { backgroundColor: "#f4f5f6", height: 400 },
  exitIconContainer: {
    position: "absolute",
    top: 10,
    end: 8,
    width: 30,
    height: 30,
    zIndex: 100,
  },
  titleFilterContainer: {
    width: "100%",
    textAlign: "center",
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    marginTop: 15,
  },
  scrollContainer: {
    flex: 1,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: "#000",
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 17,
    paddingLeft: 16,
    marginTop: 10,
  },
  priceInputContainer: {
    justifyContent: "space-around",
  },
  subLabel: { fontFamily: "PlusJakartaSans-Regular" },
  inputPriceStyle: {
    height: 43,
    width: 120,
    backgroundColor: "#e3e3e3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 4,
    fontSize: 16,
  },
  dateLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 17,
    paddingLeft: 16,
    marginTop: 10,
  },
  dateInputContainer: {
    justifyContent: "space-around",
  },
  fromDateInput: {
    height: 43,
    width: 120,
    backgroundColor: "#e3e3e3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 4,
  },
  toDateInput: {
    height: 43,
    width: 120,
    backgroundColor: "#e3e3e3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 4,
  },
  categoryLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 17,
    paddingLeft: 16,
    marginTop: 10,
  },
  categorySelectInputContainer: { marginLeft: "10%" },
  buttonFilterContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  bottonFilter: {
    height: 43,
    backgroundColor: "#2b00b6",
    width: 100,
    borderRadius: 8,
  },
  bottonFilterText: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "PlusJakartaSans-Bold",
    color: "#f1f1f1",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },
});

export default FilterModal;
