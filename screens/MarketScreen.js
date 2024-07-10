import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
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
import XMarkIcon from "../icons/XMarkIcon.js";
import DeleteAlertMessage from "../components/MarketComponents/DeleteAlertMessage.jsx";
import {
  fetchProducts,
  setProducts,
  setResetProductList,
} from "../globalState/marketSlice.js";
import { setSelectedclassification } from "../globalState/marketSlice.js";
import { setSearch } from "../globalState/marketSlice.js";
import { setLoadingProducts } from "../globalState/marketSlice.js";
import { setCurrentPage } from "../globalState/marketSlice.js";
import AlertMessage from "../components/MarketComponents/AlertMessage.jsx";

const MarketScreen = () => {
  const dispatch = useDispatch();

  const lastPage = useSelector((state) => state.market.lastPage);
  const scrollViewRef = useRef(null);
  const [deleteAlertModal, setDeleteAlertModal] = useState(false);
  const [productDeleting, setProductDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const status = useSelector((state) => state.market.status);
  const products = useSelector((state) => state.market.products);
  const loadingProducts = useSelector((state) => state.market.loadingProducts);
  const currentPage = useSelector((state) => state.market.currentPage);
  const selectedclassification = useSelector(
    (state) => state.market.selectedclassification
  );

  const search = useSelector((state) => state.market.search);
  const filterUrl = useSelector((state) => state.market.filterUrl);
  const selectedProduct = useSelector((state) => state.market.selectedProduct);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;

  const listClasifications = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Coche" },
    { id: 3, name: "Moto" },
    { id: 4, name: "Motocarro" },
    { id: 5, name: "Articulos" },
  ];

  const ifScrollIsInTheEnd = (event) => {
    if (
      event.layoutMeasurement.height + event.contentOffset.y >=
      event.contentSize.height - 5
    ) {
      if (currentPage < lastPage && !loadingProducts) {
        dispatch(setLoadingProducts(true));
        dispatch(setCurrentPage(currentPage + 1));
        dispatch(fetchProducts());
        scrollViewRef.current.scrollTo({
          x: 0,
          y: event.contentSize.height + 20,
          animated: true,
        });
      }
    }
  };

  const deleteProducto = async () => {
    const body = {
      ...selectedProduct,
      id: selectedProduct?._id,
      productRegistrationStatus: "Eliminado",
    };

    const formData = new FormData();

    formData.append("body", JSON.stringify(body));

    const response = await fetch(
      "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/update/product",
      {
        method: "put",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      let productsUpdated = products;

      productsUpdated = productsUpdated.filter(
        (el) => el._id != selectedProduct._id
      );

      dispatch(setProducts([]));
      dispatch(setProducts(productsUpdated));
      setAlertMessage("Se elimino el producto");
      setShowAlert(true);
    } else {
      console.log("Se obtuvo el error al intentar actualizar el producto: ");
      console.log(response);
    }
  };

  useEffect(() => {
    if (productDeleting) {
      deleteProducto();
      setProductDeleting(false);
    }
  }, [productDeleting]);

  useEffect(() => {
    if (global_user && global_user?.token && status === "idle") {
      dispatch(fetchProducts());
    }
  }, [global_user, status]);
  return (
    <View style={styles.principalContainer}>
      <AlertMessage
        message={alertMessage}
        seeModal={showAlert}
        setShowAlert={setShowAlert}
      ></AlertMessage>

      <DeleteAlertMessage
        seeModal={deleteAlertModal}
        setShowAlert={setDeleteAlertModal}
        setDeleteProduct={setProductDeleting}
      ></DeleteAlertMessage>
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
                  dispatch(setResetProductList(true));
                  dispatch(fetchProducts());
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Busca por nombre o codigo"
                onChangeText={(text) => {
                  dispatch(setSearch(text));
                }}
                value={search}
                underlineColorAndroid="transparent"
              />
              {search.length > 0 && (
                <TouchableOpacity
                  style={{ paddingRight: 10 }}
                  onPress={() => {
                    dispatch(setSearch(""));
                  }}
                >
                  <XMarkIcon color={"#000"} height={25} width={25}></XMarkIcon>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.container}>
            <View
              style={[
                styles.searchSection,
                {
                  borderWidth: filterUrl.length > 0 ? 1 : 0,
                  borderColor: "#2b00b6",
                  borderStyle: "solid",
                },
              ]}
              className="d-flex flex-row"
            >
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
                    item.name == selectedclassification
                      ? styles.selectedItem
                      : styles.item
                  }
                  onPress={() => {
                    dispatch(setResetProductList(true));
                    dispatch(setSelectedclassification(item.name));
                    dispatch(fetchProducts());
                  }}
                >
                  <Text
                    style={{
                      color:
                        item.name == selectedclassification ? "#fff" : "#000",
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
                    item={item}
                    setShowNewProductModal={setShowNewProductModal}
                    showNewProductModal={showNewProductModal}
                    showModal={showModal}
                    setIsNewProduct={setIsNewProduct}
                    setDeleteAlertModal={setDeleteAlertModal}
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
        <ArticleModal setShowModal={setShowModal}></ArticleModal>
      </Modal>
      <BottomSellModal
        setShowNewProductModal={setShowNewProductModal}
        setIsNewProduct={setIsNewProduct}
      ></BottomSellModal>
      <Modal
        visible={showNewProductModal}
        animationType="slide"
        style={styles.secondModalContainer}
        transparent={true}
      >
        <NewProductForm
          setShowModal={setShowNewProductModal}
          isNewProduct={isNewProduct}
        ></NewProductForm>
      </Modal>
      <Modal
        visible={showFilterModal}
        animationType="fade"
        style={styles.thirdModalContainer}
        transparent={true}
      >
        <FilterModal setShowFilterModal={setShowFilterModal}></FilterModal>
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
