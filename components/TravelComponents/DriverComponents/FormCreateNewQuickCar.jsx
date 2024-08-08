import { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import InputSelectBox from "../../MarketComponents/InputSelectBox";
import { TextInput } from "react-native";
import XMarkIcon from "../../../icons/XMarkIcon";
import { Text } from "react-native";
import { Image } from "react-native";
import AddFileIcon from "../../../icons/AddFileIcon";

const FormCreateNewQuickCar = ({ setShowModal, isNewProduct = true }) => {
  const dispatch = useDispatch();
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;
  const completeName = global_user?.first_name + " " + global_user?.last_name;
  const profileImageUrl = global_user?.profile_img_url;
  const selectedProduct = useSelector((state) => state.market.selectedProduct);
  const [productStatus, setproductStatus] = useState(false);

  const listCategories = ["Coche", "Moto", "Motocarro", "Articulos"];
  const listState = ["Madrid", "Barselona", "Andalucía", "Castilla", "León"];
  const vehiculeType = ["Coche", "Moto"];
  const articleState = ["Activo", "Inactivo"];

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [imageListSelectedProduct, setImageListSelectedProduct] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categorySelectedIndex, setCategorySelectedIndex] = useState(-1);
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(-1);
  const [locationSelectedIndex, setLocationSelectedIndex] = useState(-1);
  const [description, setDescription] = useState("");
  const [confirmAlertMessage, setConfirmAlertMessage] = useState(false);
  const [markingAsSold, setMarkingAsSold] = useState(false);
  const products = useSelector((state) => state.market.products);

  const pickImage = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Lo sentimos, necesitamos permisos para acceder a tu galería.");
      return;
    }

    // Seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (imageList.length == 5) {
      setAlertMessage("Solo puedes enviar 5 imagenes como maximo");
      setShowAlert(true);
      return;
    }

    if (!result.canceled) {
      setImageList([...imageList, result.assets[0]]);
    }
  };

  const crearProducto = async () => {};

  const updateProducto = async (IsASoldProduct) => {};

  const onTextInputChange = (setValue, text) => {
    setValue(text);
  };

  const onPriceChange = (setValue, text) => {};

  const onStockChange = (setValue, text) => {};

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer]}>
        <View style={styles.detailsContainer}>
          <View
            style={styles.secondDetailsContainer}
            className="d-flex flex-column"
          >
            <View
              style={styles.xMarkIconContainer}
              onTouchEnd={() => {
                setShowModal(false);
              }}
            >
              <TouchableOpacity>
                <XMarkIcon width={30} height={30} color={"#000"}></XMarkIcon>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.principalDetailContainer} className="d-flex">
            <Text style={styles.detailsTitle}>Actualizar QuickCar</Text>
            <View style={styles.dividingLine}></View>
          </View>

          <View style={styles.principalScrollContainer}>
            <ScrollView
              style={styles.scrollContainer}
              scrollEventThrottle={1}
              stickyHeaderIndices={[0]}
            >
              <View style={styles.scrollheaderContainer}>
                <View
                  style={styles.secondSellerInfoContainer}
                  className="d-flex flex-row"
                >
                  <Image
                    source={{
                      uri: profileImageUrl,
                    }}
                    style={styles.sellerImage}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={styles.sellerName}>{completeName}</Text>
                  </View>
                </View>
                <Text style={styles.sellerContactInfo}>
                  Verifica tu cuenta con una foto de tu identificacion
                </Text>
              </View>

              <Text style={styles.titleText}>Tipo de Vehiculo</Text>

              <InputSelectBox
                listItems={vehiculeType}
                placeHolder={"Selecciona el tipo de vehiculo"}
                setSelectedItemIdex={setStatusSelectedIndex}
                selectedItemIdex={
                  isNewProduct
                    ? -1
                    : vehiculeType.findIndex(
                        (el) => el == selectedProduct?.productStatus
                      )
                }
              ></InputSelectBox>

              <Text style={styles.titleText}>Modelo</Text>

              <View style={styles.titleInputContainer}>
                <TextInput
                  style={styles.titleInput}
                  value={title}
                  onChangeText={(text) => {
                    //   onTextInputChange(setTitle, text);
                  }}
                  placeholder="Ingresa el modelo del vehiculo"
                ></TextInput>
              </View>

              <Text style={styles.priceLabel}>Precio por asiento</Text>

              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Ingresa el Precio"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    //   onPriceChange(setPrice, text);
                  }}
                  value={price <= 0 ? "" : "€ " + price}
                ></TextInput>
              </View>

              <Text style={styles.categoryLabel}>Asientos disponibles</Text>

              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Ingresa el # de asientos disponibles"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    //   onPriceChange(setPrice, text);
                  }}
                  value={price <= 0 ? "" : "€ " + price}
                ></TextInput>
              </View>

              {/* <InputSelectBox
                listItems={listCategories}
                placeHolder={"Selecciona una categoria"}
                setSelectedItemIdex={setCategorySelectedIndex}
                selectedItemIdex={
                  isNewProduct
                    ? -1
                    : listCategories.findIndex(
                        (el) => el == selectedProduct?.productCategory
                      )
                }
              ></InputSelectBox> */}

              <Text style={styles.stateLabel}>Estado</Text>
              <InputSelectBox
                listItems={articleState}
                placeHolder={"Selecciona un estado"}
                setSelectedItemIdex={setStatusSelectedIndex}
                selectedItemIdex={
                  isNewProduct
                    ? -1
                    : articleState.findIndex(
                        (el) => el == selectedProduct?.productStatus
                      )
                }
              ></InputSelectBox>

              <Text style={styles.priceLabel}>Numero de Licencia</Text>

              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Ingresa el numero de licencia"
                  keyboardType="default"
                  onChangeText={(text) => {
                    //   onPriceChange(setPrice, text);
                  }}
                  value={price <= 0 ? "" : "€ " + price}
                ></TextInput>
              </View>

              <View style={styles.principalFotoContainer}>
                <Text style={styles.addFotoLabel}>
                  Agrega una foto de tu dentificacion
                </Text>
                <Text style={styles.addFotoSubLable}>Puedes subir 5 fotos</Text>
                {imageList.length == 0 &&
                  imageListSelectedProduct.length == 0 && (
                    <View style={styles.fotoContainer}>
                      <View style={styles.addImageBottomContainer}>
                        <TouchableOpacity
                          style={styles.addImageBottom}
                          onPress={pickImage}
                        >
                          <AddFileIcon
                            color={"#2b00b6"}
                            width={40}
                            height={40}
                          ></AddFileIcon>
                          <Text style={styles.plusText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.fotoLabel}>Sube una foto</Text>
                      </View>
                    </View>
                  )}
                {(imageList.length > 0 ||
                  imageListSelectedProduct.length > 0) && (
                  <ScrollView style={styles.fotoContainer} horizontal={true}>
                    {imageListSelectedProduct.length > 0 &&
                      imageListSelectedProduct.map((item, index) => {
                        return (
                          <View key={index}>
                            <View>
                              <TouchableOpacity
                                style={styles.deleteImageBottomContainer}
                                onPress={() => {
                                  // setImageListSelectedProduct(
                                  //   imageListSelectedProduct.filter(
                                  //     (item, subIndex) => subIndex != index
                                  //   )
                                  // );
                                }}
                              >
                                <XMarkIcon
                                  width={30}
                                  height={30}
                                  color={"#000"}
                                ></XMarkIcon>
                              </TouchableOpacity>
                              <Image
                                source={{ uri: item }}
                                style={styles.fistImageStyle}
                              ></Image>
                            </View>
                          </View>
                        );
                      })}

                    {imageList.length > 0 &&
                      imageList.map((item, index) => {
                        return (
                          <View key={index}>
                            <View>
                              <TouchableOpacity
                                style={styles.deleteImageBottomContainer}
                                onPress={() => {
                                  // setImageList(
                                  //   imageList.filter(
                                  //     (el, subindex) => subindex != index
                                  //   )
                                  // );
                                }}
                              >
                                <XMarkIcon
                                  width={30}
                                  height={30}
                                  color={"#000"}
                                ></XMarkIcon>
                              </TouchableOpacity>
                              <Image
                                source={{ uri: item.uri }}
                                style={styles.fistImageStyle}
                              ></Image>
                            </View>
                          </View>
                        );
                      })}

                    <View style={styles.secondImageContainer}>
                      <TouchableOpacity
                        style={styles.secondAddImageBottom}
                        onPress={pickImage}
                      >
                        <AddFileIcon
                          color={"#2b00b6"}
                          width={40}
                          height={40}
                        ></AddFileIcon>
                        <Text style={styles.plusText}>+</Text>
                      </TouchableOpacity>
                      <Text style={styles.fotoLabel}>Sube una foto</Text>
                    </View>
                  </ScrollView>
                )}
              </View>
            </ScrollView>

            <View style={styles.bottonsContainer} className="d-flex flex-row">
              <TouchableOpacity
                style={styles.cancelBotton}
                onPress={() => {
                  // setShowModal(false);
                }}
              >
                <Text style={styles.cancelLabel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.publicBotton}
                onPress={() => {
                  // if (isNewProduct) {
                  //   crearProducto();
                  // } else {
                  //   updateProducto(false);
                  // }
                }}
              >
                <Text style={styles.publicLabel}>
                  {isNewProduct ? "Actualizar" : "Crear QuickCar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000030",
    height: "100%",
    padding: 12,
    paddingTop: 60,
  },
  animatedContainer: {
    width: "100%",
    backgroundColor: "#f4f5f6",
    borderRadius: 5,
    height: "95%",
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  detailsContainer: {
    paddingHorizontal: 0,
    borderRadius: 10,
    height: "100%",
  },
  secondDetailsContainer: {
    padding: 10,
  },
  xMarkIconContainer: {
    position: "absolute",
    top: 7,
    end: 7,
    width: 30,
    height: 30,
    zIndex: 100,
  },
  dividingLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#c3c3c3",
  },
  principalDetailContainer: {
    width: "100%",
    backgroundColor: "#f4f5f6",
    justifyContent: "center",
    paddingTop: 5,
  },
  detailsTitle: {
    fontSize: 25,
    fontWeight: "900",
    marginLeft: 5,
    fontFamily: "PlusJakartaSans-Bold",
  },
  chatContainer: { width: "100%" },
  secondSellerInfoContainer: {
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 10,
  },
  sellerImage: { width: 45, height: 45, borderRadius: 23 },
  sellerName: {
    marginLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 15,
  },
  sellerContactInfo: {
    fontSize: 14,
    marginLeft: 10,
    fontStyle: "italic",
    fontFamily: "PlusJakartaSans-Regular",
    width: "100%",
    textAlign: "center",
    marginTop: -5,
  },
  principalScrollContainer: {
    flex: 1,
  },
  scrollContainer: {
    width: "100%",
    borderWidth: 0,
    borderColor: "#000",
    borderStyle: "solid",
    borderBottomWidth: 0.5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  scrollheaderContainer: {
    backgroundColor: "#f1f1f1",
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "100%",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 10,
    paddingLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
  },
  titleInputContainer: {
    height: 43,
    width: "80%",
    marginLeft: 15,
    borderRadius: 3,
    padding: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "100%",
    width: "100%",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 3,
    textAlignVertical: "center",
    backgroundColor: "#f1f1f1",
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
  },
  priceInputContainer: {
    height: 43,
    width: "80%",
    marginLeft: 15,
    borderRadius: 3,
    padding: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: "100%",
    width: "100%",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 3,
    textAlignVertical: "center",
    backgroundColor: "#f1f1f1",
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
  },
  stateLabel: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "PlusJakartaSans-Bold",
  },
  principalFotoContainer: { marginTop: 5 },
  addFotoLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    fontWeight: "900",
    paddingLeft: 10,
  },
  addFotoSubLable: {
    fontFamily: "PlusJakartaSans-Regular",
    paddingLeft: "5%",
  },
  fotoContainer: {
    marginHorizontal: "5%",
    width: "90%",
    height: 200,
    backgroundColor: "#f1f1f1",
    borderColor: "#c3c3c3",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  fotoLabel: { fontSize: 16, fontFamily: "PlusJakartaSans-Bold" },
  articleLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    fontWeight: "900",
    paddingLeft: 5,
    marginTop: 15,
  },
  locationLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    fontWeight: "900",
    paddingLeft: 10,
    marginTop: 10,
  },
  stockLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    fontWeight: "900",
    paddingLeft: 10,
    marginTop: 5,
  },
  stockInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: 43,
    width: "80%",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 3,
    textAlignVertical: "center",
    backgroundColor: "#f1f1f1",
    fontFamily: "PlusJakartaSans-SemiBold",
    marginLeft: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  descriptionLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18,
    fontWeight: "900",
    paddingLeft: 10,
    marginTop: 5,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    height: 86,
    width: "80%",
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 3,
    textAlignVertical: "center",
    backgroundColor: "#f1f1f1",
    fontFamily: "PlusJakartaSans-SemiBold",
    marginLeft: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 15,
  },
  bottonsContainer: {
    justifyContent: "space-between",
    marginHorizontal: "10%",
    marginTop: 15,
    marginBottom: 10,
  },
  cancelBotton: {
    height: 43,
    backgroundColor: "#c3c3c3",
    width: 150,
    borderRadius: 8,
  },
  cancelLabel: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "PlusJakartaSans-Bold",
    color: "#000",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },
  publicBotton: {
    height: 43,
    backgroundColor: "#2b00b6",
    width: 150,
    borderRadius: 8,
  },
  publicLabel: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "PlusJakartaSans-Bold",
    color: "#f1f1f1",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },
  addImageBottomContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  addImageBottom: {
    borderWidth: 1.5,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 0.8,
    width: 45,
  },
  plusText: {
    fontSize: 20,
    fontWeight: "600",
    position: "absolute",
    top: 15,
    left: 10,
    color: "#2b00b6",
  },
  fistImageStyle: {
    height: 150,
    width: 150,
    marginTop: 25,
    marginLeft: 10,
  },
  secondImageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  secondAddImageBottom: {
    borderWidth: 1.5,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 0.8,
    width: 45,
  },
  deleteImageBottomContainer: {
    position: "absolute",
    right: 0,
    top: 30,
    zIndex: 100,
    backgroundColor: "#f1f1f1",
    borderRadius: 15,
  },
  sellerBottomText: {
    fontSize: 20,
    fontWeight: "900",
    fontFamily: "PlusJakartaSans-Bold",
    color: "#000",
    textAlign: "center",
    textAlignVertical: "center",
    height: "100%",
  },
  sellerBottom: {
    height: 43,
    backgroundColor: "#FFCD57",
    width: 220,
    borderRadius: 8,
  },
  sellerBottomContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
});
export default FormCreateNewQuickCar;
