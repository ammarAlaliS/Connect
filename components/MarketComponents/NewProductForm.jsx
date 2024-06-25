import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Animated, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import XMarkIcon from "../../icons/XMarkIcon.js";
import AddFileIcon from "../../icons/AddFileIcon.js";
import InputSelectBox from "./InputSelectBox.jsx";
import { ScrollView } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const NewProductForm = ({ setShowModal }) => {
  const idProduct = useSelector((state) => state.market?.idProduct);
  const ulrImage = useSelector((state) => state.market?.urlProductImage);

  const listCategories = ["Moto", "Carro", "Articulo", "Camioneta"];
  const listState = ["Madrid", "Barselona", "Andalucía", "Castilla", "León"];
  const articleState = [
    "Nuevo",
    "Usado-Como nuevo",
    "Usado-Buen estado",
    "Usado-Aceptable",
  ];

  const [imageList, setImageList] = useState([]);

  const [title, setTitle] = useState("");

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

    if (!result.canceled) {
      setImageList([...imageList, result.assets[0]]);
      // imageList.push(result.assets[0]);
      console.log("El numero de imagenes es: " + imageList.length);
    }
  };

  const crearProducto = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random", {
      method: "Post",
      body: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {});
  };

  const onTextInputChange = (setValue, text) => {
    setValue(text);
  };

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
            <Text style={styles.detailsTitle}>Nuevo Producto</Text>
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
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                    }}
                    style={styles.sellerImage}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={styles.sellerName}>Carlos Perez</Text>
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
                  onChange={(text) => {
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
                ></TextInput>
              </View>

              <Text style={styles.categoryLabel}>Categoria</Text>
              <InputSelectBox
                listItems={listCategories}
                placeHolder={"Selecciona una categoria"}
              ></InputSelectBox>

              <Text style={styles.stateLabel}>Estado</Text>
              <InputSelectBox
                listItems={articleState}
                placeHolder={"Selecciona un estado"}
              ></InputSelectBox>

              <View style={styles.principalFotoContainer}>
                <Text style={styles.addFotoLabel}>Agrega una foto</Text>
                <Text style={styles.addFotoSubLable}>Puedes subir 5 fotos</Text>
                {imageList.length == 0 && (
                  <View style={styles.fotoContainer}>
                    <View
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderWidth: 1.5,
                          borderColor: "#000",
                          borderStyle: "solid",
                          borderRadius: 10,
                          padding: 0.8,
                          width: 45,
                        }}
                        onPress={pickImage}
                      >
                        <AddFileIcon
                          color={"#2b00b6"}
                          width={40}
                          height={40}
                        ></AddFileIcon>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            position: "absolute",
                            top: 15,
                            left: 10,
                            color: "#2b00b6",
                          }}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.fotoLabel}>Sube una foto</Text>
                    </View>
                  </View>
                )}
                {imageList.length > 0 && (
                  <ScrollView style={styles.fotoContainer} horizontal={true}>
                    {imageList.map((item) => {
                      return (
                        <View>
                          <Image
                            source={{ uri: item.uri }}
                            style={{
                              height: 150,
                              width: 150,
                              marginTop: 25,
                              marginLeft: 10,
                            }}
                          ></Image>
                        </View>
                      );
                    })}

                    <View
                      style={{
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderWidth: 1.5,
                          borderColor: "#000",
                          borderStyle: "solid",
                          borderRadius: 10,
                          padding: 0.8,
                          width: 45,
                        }}
                        onPress={pickImage}
                      >
                        <AddFileIcon
                          color={"#2b00b6"}
                          width={40}
                          height={40}
                        ></AddFileIcon>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            position: "absolute",
                            top: 15,
                            left: 10,
                            color: "#2b00b6",
                          }}
                        >
                          +
                        </Text>
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
                ></InputSelectBox>
                <Text style={styles.stockLabel}>Stock / Disponible</Text>
                <TextInput
                  style={styles.stockInput}
                  placeholder="Ingresa cuantos hay disponibles"
                ></TextInput>
                <Text style={styles.descriptionLabel}>Descripcion</Text>
                <TextInput
                  style={styles.descriptionContainer}
                  placeholder="Ingresa una descripcion"
                  multiline={true}
                ></TextInput>
              </View>
            </ScrollView>
            <View style={styles.bottonsContainer} className="d-flex flex-row">
              <TouchableOpacity
                style={styles.cancelBotton}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.cancelLabel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.publicBotton}>
                <Text style={styles.publicLabel}>Publicar</Text>
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
    // justifyContent: "center",
    // alignItems: "center",
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
});
export default NewProductForm;
