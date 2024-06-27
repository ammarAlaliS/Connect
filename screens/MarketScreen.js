import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import ArticleCard from "../components/MarketComponents/ArticleCard.jsx";
import ArticleModal from "../components/MarketComponents/ArticleModal.jsx";
import BottomSellModal from "../components/MarketComponents/BottomSellModal.jsx";
import NewProductForm from "../components/MarketComponents/NewProductForm.jsx";
import FilterModal from "../components/MarketComponents/FilterModal.jsx";
import axios from "axios";
import AlertMessage from "../components/MarketComponents/AlertMessage.jsx";
import XMarkIcon from "../icons/XMarkIcon.js";

const MarketScreen = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const scrollViewRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [search, setSearch] = useState("");
  const [selectedclassification, setSelectedclassification] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [firstStoreLoading, setFirstStoreLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    minPrice: -1,
    maxPrice: -1,
    minDate: new Date(1, 1, 1),
    maxDate: new Date(1, 1, 1),
  });

  const [filterUrl, setFilterUrl] = useState("");

  const API_BASE_URL =
    "https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket";
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;

  const listClasifications = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Coche" },
    { id: 3, name: "Moto" },
    { id: 4, name: "Motocarro" },
    { id: 5, name: "Articulos" },
  ];

  const getProducts = async (isNewRequest) => {
    setLoadingProducts(true);
    setFirstStoreLoading(false);

    if (isNewRequest) {
      setProducts([]);
      if (currentPage != 1) {
        setCurrentPage(1);
        return;
      }
    }

    try {
      const url =
        `${API_BASE_URL}/get/products?${
          (selectedclassification > 1
            ? "productCategory=" +
              listClasifications[selectedclassification - 1].name +
              "&"
            : "") + (search.length > 0 ? "search=" + search + "&" : "")
        }limit=10&page=${currentPage}` + filterUrl;

      const response = await fetch(url, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.text();
        const data = JSON.parse(res);

        if (!isNewRequest) {
          products.push(...data.docs);
        } else {
          setProducts(data.docs);
        }

        setLastPage(data.totalPages);
        setLoadingProducts(false);
      } else {
        console.log("ocurrio un error en la peticion");
        console.log(response);
      }
    } catch (error) {
      setAlertMessage("No se encontraron productos");
      setShowAlert(true);
      setLoadingProducts(false);
    }
  };

  const ifScrollIsInTheEnd = (event) => {
    if (
      event.layoutMeasurement.height + event.contentOffset.y >=
      event.contentSize.height - 5
    ) {
      if (currentPage < lastPage && !loadingProducts) {
        setLoadingProducts(true);
        setCurrentPage(currentPage + 1);
        scrollViewRef.current.scrollTo({
          x: 0,
          y: event.contentSize.height + 20,
          animated: true,
        });
      }
    }
  };

  useEffect(() => {
    if (!firstStoreLoading) {
      getProducts(true);
    }
  }, [filterUrl]);

  useEffect(() => {
    getProducts(currentPage == 1 ? true : false);
  }, [currentPage]);

  useEffect(() => {
    if (!firstStoreLoading) {
      getProducts(true);
    }
  }, [selectedclassification]);

  return (
    <View style={styles.principalContainer}>
      <AlertMessage
        message={alertMessage}
        seeModal={showAlert}
        setShowAlert={setShowAlert}
      ></AlertMessage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        onScroll={(e) => {
          ifScrollIsInTheEnd(e.nativeEvent);
        }}
        ref={scrollViewRef}
      >
        <View className="d-flex flex-row">
          <View style={styles.searchContainer}>
            <View style={styles.searchSection} className="d-flex flex-row">
              <Icon
                style={styles.searchIcon}
                name="search"
                size={20}
                color={search ? "#000000" : "#00000099"}
                onPress={() => {
                  getProducts(true);
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Busca por nombre o codigo"
                onChangeText={(text) => setSearch(text)}
                value={search}
                underlineColorAndroid="transparent"
              />
              {search.length > 0 && (
                <TouchableOpacity
                  style={{ paddingRight: 10 }}
                  onPress={() => {
                    setSearch("");
                  }}
                >
                  <XMarkIcon color={"#000"} height={25} width={25}></XMarkIcon>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.searchSection} className="d-flex flex-row">
              <TouchableOpacity
                onPress={() => {
                  setShowFilterModal(true);
                }}
              >
                <Icon
                  style={styles.secondFilterIcon}
                  name="filter"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.secondImput}
                onChangeText={(text) => setSearch(text)}
              />
            </View>
          </View>
        </View>

        <View style={styles.clasificationContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="d-flex flex-row"
          >
            {listClasifications.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={
                    item.id == selectedclassification
                      ? styles.selectedItem
                      : styles.item
                  }
                  onPress={() => {
                    setSelectedclassification(item.id);
                  }}
                >
                  <Text
                    style={{
                      color:
                        item.id == selectedclassification ? "#fff" : "#000",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Cards de articulos */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          scrollEventThrottle={16}
        >
          <View
            className="d-flex flex-row mx-4 my-2"
            style={[styles.articlesContainer]}
          >
            {products &&
              products.map((item, index) => {
                return (
                  <ArticleCard
                    key={index}
                    setShowModal={setShowModal}
                    productLocation={item.productLocation.state}
                    setSelectedProduct={setSelectedProduct}
                    item={item}
                  ></ArticleCard>
                );
              })}
            {loadingProducts && (
              <ActivityIndicator
                size={"large"}
                color={"#00000090"}
                style={{ height: 30, width: "100%", marginVertical: 10 }}
              ></ActivityIndicator>
            )}
          </View>
        </ScrollView>
      </ScrollView>
      {/* FooterMarket */}
      <Modal
        visible={showModal}
        animationType="slide"
        style={styles.modalContainer}
        transparent={true}
      >
        <ArticleModal
          setShowModal={setShowModal}
          selectedProduct={selectedProduct}
        ></ArticleModal>
      </Modal>
      <BottomSellModal
        setShowNewProductModal={setShowNewProductModal}
      ></BottomSellModal>
      <Modal
        visible={showNewProductModal}
        animationType="slide"
        style={styles.secondModalContainer}
        transparent={true}
      >
        <NewProductForm setShowModal={setShowNewProductModal}></NewProductForm>
      </Modal>
      <Modal
        visible={showFilterModal}
        animationType="fade"
        style={styles.thirdModalContainer}
        transparent={true}
      >
        <FilterModal
          setShowFilterModal={setShowFilterModal}
          setFilterUrl={setFilterUrl}
          filterData={filterData}
          setFilterData={setFilterData}
        ></FilterModal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  principalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f4f5f6",
  },
  searchContainer: {
    margin: 10,
    marginRight: 0,
    flex: 1,
  },
  container: {
    margin: 10,
  },
  searchSection: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#ffffff",
    color: "#424242",
    borderRadius: 10,
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  secondFilterIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 5,
  },
  secondImput: {
    width: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "yellow",
    color: "#424242",
    borderRadius: 10,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    fontFamily: "Eina01-BoldItalic",
  },
  selectedItem: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#2b00b6",
    fontFamily: "Eina01-BoldItalic",
  },
  articlesContainer: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // paddingRight: 12,
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  clasificationContainer: {
    backgroundColor: "white",
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContainer: {
    height: 100,
    width: "100%",
    marginTop: "25%",
    backgroundColor: "red",
    padding: 40,
  },
  secondModalContainer: {
    height: 100,
    width: "100%",
    marginTop: "25%",
    backgroundColor: "red",
    padding: 40,
  },
  thirdModalContainer: {
    height: 100,
    width: "100%",
    marginTop: "25%",
    backgroundColor: "red",
    padding: 40,
  },
});

export default MarketScreen;
