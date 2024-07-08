import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import XMarkIcon from "../../icons/XMarkIcon.js";
import AddFileIcon from "../../icons/AddFileIcon.js";
import InputSelectBox from "./InputSelectBox.jsx";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AlertMessage from "./AlertMessage.jsx";
import ConfirmAlertMessage from "./ConfirmAlertMessage.jsx";
import { setProducts } from "../../globalState/marketSlice";

const NewProductForm = ({ setShowModal, isNewProduct }) => {
  const dispatch = useDispatch();
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;
  const completeName = global_user?.first_name + " " + global_user?.last_name;
  const profileImageUrl = global_user?.profile_img_url;
  const selectedProduct = useSelector((state) => state.market.selectedProduct);
  const [productStatus, setproductStatus] = useState(false);

  const listCategories = ["Coche", "Moto", "Motocarro", "Articulos"];
  const listState = ["Madrid", "Barselona", "Andalucía", "Castilla", "León"];
  const articleState = [
    "Nuevo",
    "Usado-Como nuevo",
    "Usado-Buen estado",
    "Usado-Aceptable",
  ];

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

  const crearProducto = async () => {
    if (title.length <= 5) {
      setAlertMessage("Ingrese un titulo valido");
      setShowAlert(true);
      return;
    }

    if (price <= 0) {
      setAlertMessage("Ingrese un precio valido");
      setShowAlert(true);
      return;
    }

    if (categorySelectedIndex < 0) {
      setAlertMessage("Seleccione una categoria");
      setShowAlert(true);
      return;
    }

    if (statusSelectedIndex < 0) {
      setAlertMessage("Seleccione un estado");
      setShowAlert(true);
      return;
    }

    if (imageList.length == 0) {
      setAlertMessage("Agregue por lo menos una imagen");
      setShowAlert(true);
      return;
    }

    if (locationSelectedIndex < 0) {
      setAlertMessage("Seleccione una ubicacion");
      setShowAlert(true);
      return;
    }

    if (stock <= 0) {
      setAlertMessage("Ingrese un stock valido");
      setShowAlert(true);
      return;
    }

    const body = {
      productName: title,
      productCategory: listCategories[categorySelectedIndex],
      productStatus: articleState[statusSelectedIndex],
      productLocation: {
        state: listState[locationSelectedIndex],
        latitude: 40.109319,
        longitude: -3.229615,
      },
      description: description,
      price: price,
      stock: parseInt(stock),
      salesStatus: "Disponible",
      productRegistrationStatus: "Publico",
    };

    const formData = new FormData();

    for (let i = 0; i < imageList.length; i++) {
      let localUri = imageList[i].uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("product_image_url", {
        uri: localUri,
        name: filename,
        type,
      });
    }

    formData.append("body", JSON.stringify(body));

    try {
      const response = await fetch(
        "https://obbaramarket-backend.onrender.com/api/ObbaraMarket/create/product",
        {
          method: "post",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const data = await response.json();

        setproductStatus(true);

        let productsUpdate = [
          {
            ...data,
            user: { _id: data.user, global_user: global_user },
          },
          ...products,
        ];
        dispatch(setProducts([]));
        dispatch(setProducts(productsUpdate));
      } else {
        console.error(`Error en la solicitud: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateProducto = async (IsASoldProduct) => {
    if (title.length < 5) {
      setAlertMessage("Ingrese un titulo valido");
      setShowAlert(true);
      return;
    }

    if (price <= 0) {
      setAlertMessage("Ingrese un precio valido");
      setShowAlert(true);
      return;
    }

    if (categorySelectedIndex < 0) {
      setAlertMessage("Seleccione una categoria");
      setShowAlert(true);
      return;
    }

    if (statusSelectedIndex < 0) {
      setAlertMessage("Seleccione un estado");
      setShowAlert(true);
      return;
    }

    if (imageList.length == 0 && imageListSelectedProduct.length == 0) {
      setAlertMessage("Agregue por lo menos una imagen");
      setShowAlert(true);
      return;
    }

    if (locationSelectedIndex < 0) {
      setAlertMessage("Seleccione una ubicacion");
      setShowAlert(true);
      return;
    }

    if (stock <= 0) {
      setAlertMessage("Ingrese un stock valido");
      setShowAlert(true);
      return;
    }

    const body = {
      id: selectedProduct?._id,
      productName: title,
      productCategory: listCategories[categorySelectedIndex],
      productStatus: articleState[statusSelectedIndex],
      productLocation: {
        state: listState[locationSelectedIndex],
        latitude: 40.109319,
        longitude: -3.229615,
      },
      description: description,
      price: price,
      image:
        imageListSelectedProduct.length > 0 ? imageListSelectedProduct : null,
      stock: parseInt(stock),
      salesStatus: IsASoldProduct ? "Vendido" : "Disponible",
    };

    const formData = new FormData();

    for (let i = 0; i < imageList.length; i++) {
      let localUri = imageList[i].uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("product_image_url", {
        uri: localUri,
        name: filename,
        type,
      });
    }

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
      setproductStatus(IsASoldProduct ? false : true);

      let finalImages = imageListSelectedProduct || [];

      if (imageList.length > 0) {
        let secondaryImages = imageList.map((el) => {
          return el.uri;
        });

        finalImages.push(...secondaryImages);
      }

      let productsUpdated = products.map((item) => {
        if (selectedProduct._id == item._id) {
          return {
            ...selectedProduct,
            productName: title,
            productCategory: listCategories[categorySelectedIndex],
            productStatus: articleState[statusSelectedIndex],
            productLocation: {
              state: listState[locationSelectedIndex],
              latitude: 40.109319,
              longitude: -3.229615,
            },
            description: description,
            price: price,
            image: finalImages,
            stock: parseInt(stock),
          };
        } else {
          return item;
        }
      });

      dispatch(setProducts([]));
      if (IsASoldProduct) {
        productsUpdated = productsUpdated.filter(
          (el) => el._id != selectedProduct._id
        );
      }
      dispatch(setProducts(productsUpdated));

      if (IsASoldProduct) {
        setAlertMessage("El producto se marco como vendido");
        setShowAlert(true);
      }
    } else {
      console.log("Se obtuvo el error al intentar actualizar el producto: ");
      console.log(response);
    }
  };

  const onTextInputChange = (setValue, text) => {
    setValue(text);
  };

  const onPriceChange = (setValue, text) => {
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

  const onStockChange = (setValue, text) => {
    let numericValue = text.replace(/[^0-9]/g, "");
    if (text.indexOf(".") >= 0) {
      let index = text.indexOf(".");
      let secondIndex = text.indexOf(".", index + 1);
      if (secondIndex >= 0) {
        numericValue = numericValue.substring(0, numericValue.length - 1);
      }
    }
    setValue(numericValue);
  };

  useEffect(() => {
    if (
      productStatus &&
      !showAlert &&
      alertMessage != "El producto se marco como vendido"
    ) {
      setAlertMessage(
        isNewProduct
          ? "El producto se creo correctamente"
          : "El producto se actualizo correctamente"
      );
      setproductStatus(false);
      setShowAlert(true);
    }

    if (
      !productStatus &&
      !showAlert &&
      (alertMessage == "El producto se creo correctamente" ||
        alertMessage == "El producto se actualizo correctamente" ||
        alertMessage == "El producto se marco como vendido")
    ) {
      setShowModal(false);
    }
  }, [productStatus, showAlert]);

  useEffect(() => {
    if (!isNewProduct) {
      setTitle(selectedProduct?.productName);
      setPrice(selectedProduct?.price);
      onStockChange(setStock, selectedProduct?.stock.toString());
      setDescription(selectedProduct?.description);
      setCategorySelectedIndex(
        listCategories.findIndex((el) => el == selectedProduct?.productCategory)
      );
      setStatusSelectedIndex(
        articleState.findIndex((el) => el == selectedProduct?.productStatus)
      );
      setLocationSelectedIndex(
        listState.findIndex(
          (el) => el == selectedProduct?.productLocation.state
        )
      );
    }
  }, [isNewProduct]);

  useEffect(() => {
    if (markingAsSold) {
      updateProducto(true);
    }
  }, [markingAsSold]);

  useEffect(() => {
    if (!isNewProduct) {
      setImageListSelectedProduct(selectedProduct?.image);
    }
  }, [isNewProduct]);

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
            <Text style={styles.detailsTitle}>
              {isNewProduct ? "Nuevo Producto" : "Editar Producto"}
            </Text>
            <View style={styles.dividingLine}></View>
          </View>

          <ConfirmAlertMessage
            seeModal={confirmAlertMessage}
            setShowAlert={setConfirmAlertMessage}
            setMarkingAsSold={setMarkingAsSold}
          ></ConfirmAlertMessage>
          {/* Ubcacion de la alerta */}
          <AlertMessage
            seeModal={showAlert}
            message={alertMessage}
            setShowAlert={setShowAlert}
          ></AlertMessage>

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
                  Publicacion publica en ObbaraMarket
                </Text>
              </View>

              <Text style={styles.titleText}>Titulo</Text>

              <View style={styles.titleInputContainer}>
                <TextInput
                  style={styles.titleInput}
                  value={title}
                  onChangeText={(text) => {
                    onTextInputChange(setTitle, text);
                  }}
                  placeholder="Ingresa el titulo"
                ></TextInput>
              </View>

              <Text style={styles.priceLabel}>Precio</Text>

              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Ingresa el Precio"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    onPriceChange(setPrice, text);
                  }}
                  value={price <= 0 ? "" : "€ " + price}
                ></TextInput>
              </View>

              <Text style={styles.categoryLabel}>Categoria</Text>
              <InputSelectBox
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
              ></InputSelectBox>

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

              <View style={styles.principalFotoContainer}>
                <Text style={styles.addFotoLabel}>Agrega una foto</Text>
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
                                  setImageListSelectedProduct(
                                    imageListSelectedProduct.filter(
                                      (item, subIndex) => subIndex != index
                                    )
                                  );
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
                                  setImageList(
                                    imageList.filter(
                                      (el, subindex) => subindex != index
                                    )
                                  );
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
                <Text style={styles.articleLabel}>
                  Informacion del Articulo
                </Text>
                <Text style={styles.locationLabel}>Ubicacion</Text>
                <InputSelectBox
                  listItems={listState}
                  placeHolder={"Seleccione la ubicacion"}
                  setSelectedItemIdex={setLocationSelectedIndex}
                  selectedItemIdex={
                    isNewProduct
                      ? -1
                      : listState.findIndex(
                          (el) => el == selectedProduct?.productLocation.state
                        )
                  }
                ></InputSelectBox>
                <Text style={styles.stockLabel}>Stock / Disponible</Text>
                <TextInput
                  style={styles.stockInput}
                  placeholder="Ingresa cuantos hay disponibles"
                  onChangeText={(text) => {
                    onStockChange(setStock, text);
                  }}
                  value={stock <= 0 ? "" : stock}
                  keyboardType="numeric"
                ></TextInput>
                <Text style={styles.descriptionLabel}>Descripcion</Text>
                <TextInput
                  style={styles.descriptionContainer}
                  placeholder="Ingresa una descripcion"
                  multiline={true}
                  value={description}
                  onChangeText={(text) => {
                    onTextInputChange(setDescription, text);
                  }}
                ></TextInput>
              </View>
            </ScrollView>

            {!isNewProduct && (
              <View style={styles.sellerBottomContainer}>
                <TouchableOpacity
                  style={styles.sellerBottom}
                  onPress={() => {
                    setConfirmAlertMessage(true);
                  }}
                >
                  <Text style={styles.sellerBottomText}>
                    Marcar como vendido
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.bottonsContainer} className="d-flex flex-row">
              <TouchableOpacity
                style={styles.cancelBotton}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.cancelLabel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.publicBotton}
                onPress={() => {
                  if (isNewProduct) {
                    crearProducto();
                  } else {
                    updateProducto(false);
                  }
                }}
              >
                <Text style={styles.publicLabel}>
                  {isNewProduct ? "Publicar" : "Actualizar"}
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
    width: 100,
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
    width: 100,
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
export default NewProductForm;
