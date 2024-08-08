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

const MarketScreen = ({ darkMode }) => {
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
    { id: 5, name: "Articulos variados " },
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
    <View
      style={{
        backgroundColor: darkMode.backgroundDark,
        flex: 1,
      }}
      className="h-full"
    >
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
      <View
        style={{
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderColor: darkMode.borderBox,
          backgroundColor: darkMode.background,
        }}
      >
        <View
          style={{
            backgroundColor: darkMode.background,
            borderColor: darkMode.borderBox,
            color: darkMode.text,
            zIndex: 100,
            paddingVertical: 10,
            paddingHorizontal: 4,
            // borderBottomWidth: 1,
          }}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="flex-row "
            style={{
              width: "100%",
            }}
          >
            {listClasifications.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setResetProductList(true));
                    dispatch(setSelectedclassification(item.name));
                    dispatch(fetchProducts());
                  }}
                  key={index}
                >
                  <Text
                    style={
                      item.name == selectedclassification
                        ? {
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            marginRight: 10,
                            borderRadius: 2,
                            borderWidth: 1,
                            backgroundColor: darkMode.backgroundCardList,
                            borderColor: darkMode.borderBoxCardList,
                            color: darkMode.colorTextCardList,
                          }
                        : {
                            backgroundColor: darkMode.backgroundDark,
                            borderColor: darkMode.borderBox,
                            color: darkMode.text,
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            marginRight: 10,
                            borderRadius: 2,
                            borderWidth: 1,
                            color: darkMode.text,
                          }
                    }
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          stickyHeaderIndices={[1]}
          onScroll={(e) => {
            ifScrollIsInTheEnd(e.nativeEvent);
          }}
          ref={scrollViewRef}
        >
          <View className="flex-row">
            <View
              style={{
                marginBottom: 0,
                marginLeft: 4,
                marginRight: 0,
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: darkMode.background,
                  alignItems: "center",
                  borderRadius: 9999,
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: darkMode.borderBox,
                }}
                className="d-flex flex-row"
              >
                <Icon
                  style={{
                    padding: 10,
                  }}
                  name="search"
                  size={20}
                  color={darkMode.text}
                  onPress={() => {
                    dispatch(setResetProductList(true));
                    dispatch(fetchProducts());
                  }}
                />
                <TextInput
                  style={{
                    backgroundColor: darkMode.background,
                    flex: 1,
                    paddingTop: 8,
                    paddingRight: 8,
                    paddingBottom: 8,
                    paddingLeft: 0,
                    borderRadius: 9999,
                    fontFamily: "PlusJakartaSans-SemiBold",
                    color: darkMode.text,
                  }}
                  placeholder="Busca por nombre o codigo"
                  placeholderTextColor={darkMode.text}
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
                    <XMarkIcon
                      color={darkMode.text}
                      height={25}
                      width={25}
                    ></XMarkIcon>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                marginBottom: 2,
                marginRight: 4,
                marginLeft: 4,
                borderRadius: 2,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: darkMode.borderBox,
                  backgroundColor: darkMode.background,
                  alignItems: "center",
                  borderRadius: 9999,
                  paddingRight: 14,
                  paddingLeft: 14,
                }}
                className="d-flex flex-row"
              >
                <TouchableOpacity
                  onPress={() => {
                    setShowFilterModal(true);
                  }}
                >
                  <Icon
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 2,
                    }}
                    name="filter"
                    size={20}
                    color={darkMode.text}
                  />
                </TouchableOpacity>
                <TextInput
                  style={{
                    width: 0,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 2,
                  }}
                  onChangeText={(text) => setSearch(text)}
                />
              </View>
            </View>
            <View
              style={{
                marginBottom: 2,
                marginRight: 4,
                marginLeft: 4,
                borderRadius: 2,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsNewProduct(true);
                  setShowNewProductModal(true);
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: darkMode.borderBox,
                    backgroundColor: darkMode.background,
                    alignItems: "center",
                    borderRadius: 9999,
                    paddingRight: 14,
                    paddingLeft: 14,
                  }}
                  className="d-flex flex-row"
                >
                  <Icon
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 2,
                    }}
                    name="plus"
                    size={20}
                    color={darkMode.text}
                  />

                  <TextInput
                    style={{
                      width: 0,
                      paddingTop: 8,
                      paddingBottom: 8,
                      borderRadius: 2,
                    }}
                    onChangeText={(text) => setSearch(text)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cards de articulos */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 0 }}
        >
          <View
            className="flex-row flex-1  "
            style={[
              styles.articlesContainer,
              {
                backgroundColor: darkMode.backgroundDark,
              },
            ]}
          >
            <View
              className="d-flex flex-row flex-1"
              style={[
                styles.articlesContainer,
                {
                  marginTop: 4,
                  marginBottom: 4,
                  backgroundColor: darkMode.backgroundDark,
                },
              ]}
            >
              <View className=" w-full flex-row flex-wrap ">
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
                        darkMode={darkMode}
                      ></ArticleCard>
                    );
                  })}
              </View>
              {loadingProducts && (
                <ActivityIndicator
                  size={"large"}
                  color={darkMode.text}
                  style={{ height: 30, width: "100%", marginVertical: 10 }}
                ></ActivityIndicator>
              )}
            </View>
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
      {/*<BottomSellModal
        setShowNewProductModal={setShowNewProductModal}
        setIsNewProduct={setIsNewProduct}
     / > */}
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
    overflow: "hidden",
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
    backgroundColor: "red",
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
