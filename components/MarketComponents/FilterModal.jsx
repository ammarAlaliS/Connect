import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import XMarkIcon from "../../icons/XMarkIcon";
import {
  fetchProducts,
  setFilterUrl,
  setResetProductList,
} from "../../globalState/marketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData } from "../../globalState/marketSlice.js";

const FilterModal = ({ setShowFilterModal }) => {
  const dispatch = useDispatch();

  const filterData = useSelector((state) => state.market.filterData);

  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(-1);

  const [show, setShow] = useState(0);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const [minDateString, setMinDateString] = useState("");
  const [maxDateString, setMaxDateString] = useState("");

  const showDatepicker = (value) => {
    setShow(value);
  };

  const onChange = (selectedDate, date, setDate, setDateString, isMaxDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    setShow(0);

    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    setDateString(formattedDate);

    if (isMaxDate) {
      dispatch(
        setFilterData({ ...filterData, maxDate: currentDate.getTime() })
      );
    } else {
      dispatch(
        setFilterData({ ...filterData, minDate: currentDate.getTime() })
      );
    }

    setShow(0);
  };

  const handleChange = (setValue, text) => {
    let numericValue = text.replace(/[^0-9.]/g, "");
    if (text.indexOf(".") >= 0) {
      let index = text.indexOf(".");
      let secondIndex = text.indexOf(".", index + 1);
      if (secondIndex >= 0) {
        numericValue = numericValue.substring(0, numericValue.length - 1);
      }
    }
    setValue(numericValue);
  };

  const getFilterProducts = () => {
    let url = "";
    if (minPrice > 0) {
      url = url + "&minPrice=" + minPrice;
    }

    if (maxPrice > 0) {
      url = url + "&maxPrice=" + maxPrice;
    }

    if (new Date(filterData.minDate)?.getFullYear() > 1950) {
      url = url + "&minDate=" + minDate.toISOString();
    }

    if (new Date(filterData.maxDate)?.getFullYear() > 1950) {
      url = url + "&maxDate=" + maxDate.toISOString();
    }

    dispatch(setFilterUrl(url));
    dispatch(setResetProductList(true));
    dispatch(fetchProducts());
    dispatch(
      setFilterData({
        ...filterData,
        minPrice: minPrice <= 0 ? -1 : minPrice,
        maxPrice: maxPrice <= 0 ? -1 : maxPrice,
      })
    );
    setShowFilterModal(false);
  };

  const clearFilter = () => {
    dispatch(
      setFilterData({
        minPrice: -1,
        maxPrice: -1,
        minDate: new Date(1, 1, 1).getTime(),
        maxDate: new Date(1, 1, 1).getTime(),
      })
    );
  };

  useEffect(() => {
    setMinPrice(filterData.minPrice);
    setMaxPrice(filterData.maxPrice);

    if (
      filterData.minDate &&
      new Date(filterData.minDate)?.getFullYear() > 1950
    ) {
      setMinDate(new Date(filterData.minDate));
      setMinDateString(new Date(filterData.minDate).toLocaleDateString());
    } else {
      setMinDate(new Date());
      setMinDateString("");
    }

    if (
      filterData.maxDate &&
      new Date(filterData.maxDate)?.getFullYear() > 1950
    ) {
      setMaxDate(new Date(filterData.maxDate));
      setMaxDateString(new Date(filterData.maxDate).toLocaleDateString());
    } else {
      setMaxDate(new Date());
      setMaxDateString("");
    }
  }, [filterData]);

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
                      setMinDateString,
                      false
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
                      setMaxDateString,
                      true
                    );
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonFilterContainer} className="d-flex flex-row">
          <TouchableOpacity style={styles.bottomClear} onPress={clearFilter}>
            <Text style={styles.bottonClearText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottonFilter}
            onPress={() => {
              getFilterProducts();
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
  secondContainer: { backgroundColor: "#f4f5f6", height: 350 },
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
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  bottonFilter: {
    height: 43,
    backgroundColor: "#2b00b6",
    width: 100,
    borderRadius: 8,
  },
  bottomClear: {
    height: 43,
    backgroundColor: "#c3c3c3",
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
  bottonClearText: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "PlusJakartaSans-Bold",
    color: "#121326",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },
});

export default FilterModal;
