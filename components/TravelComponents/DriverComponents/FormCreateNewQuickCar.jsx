import { useEffect, useState } from "react";
import {
  Alert,
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
import AlertMessage from "../../MarketComponents/AlertMessage";

const FormCreateNewQuickCar = ({ setShowModal, isNewProduct }) => {
  const dispatch = useDispatch();
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;
  const completeName = global_user?.first_name + " " + global_user?.last_name;
  const profileImageUrl = global_user?.profile_img_url;

  const vehiculeType = ["Coche", "Moto"];

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [vehiculeImageList, setVehiculeImageList] = useState([]);

  const [price, setPrice] = useState(0);
  const [seatsAvailables, setSeatsAvailables] = useState(0);
  const [licenseNumber, setLicenseNumber] = useState("");

  const [modelo, setModelo] = useState("");
  const [vehiculeSelectedIndex, setVehiculeSelectedIndex] = useState(-1);

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
  const pickVehiculeImage = async () => {
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

  const onSeatsChange = (setValue, text) => {
    let numericValue = text.replace(/[^0-9]/g, "");
    setValue(numericValue);
  };

  const onLicenseChange = (setValue, text) => {
    setValue(text);
  };

  const CrearQuickCar = async () => {
    console.log("Creando quickCar");
    if (vehiculeSelectedIndex < 0) {
      setAlertMessage("Seleccione un tipo de vehiculo");
      setShowAlert(true);
      return;
    }
    if (modelo.length <= 3) {
      setAlertMessage("Ingrese un modelo valido");
      setShowAlert(true);
      return;
    }
    if (price <= 0) {
      setAlertMessage("Ingrese un precio valido");
      setShowAlert(true);
      return;
    }
    if (seatsAvailables <= 0) {
      setAlertMessage(
        "El numero de asientos disponibles debe ser mayor que cero"
      );
      setShowAlert(true);
      return;
    }
    if (seatsAvailables > 5) {
      setAlertMessage("El numero de asientos disponibles debe ser menor que 6");
      setShowAlert(true);
      return;
    }
    if (licenseNumber.length < 5) {
      setAlertMessage("Ingrese un numero de licencia valido");
      setShowAlert(true);
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < vehiculeImageList.length; i++) {
      let localUri = vehiculeImageList[i].uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("vehicleModelImage", {
        uri: localUri,
        name: filename,
        type,
      });
    }

    for (let i = 0; i < imageList.length; i++) {
      let localUri = imageList[i].uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("drivingLicenseImage", {
        uri: localUri,
        name: filename,
        type,
      });
    }

    formData.append("vehicleType", vehiculeType[vehiculeSelectedIndex]);
    formData.append("vehicleModel", modelo);
    formData.append("drivingLicense", licenseNumber);
    formData.append(
      "startTime",
      JSON.stringify({
        hour: 0,
        minute: 0,
      })
    );
    formData.append(
      "endTime",
      JSON.stringify({
        hour: 0,
        minute: 0,
      })
    );
    formData.append("regularDays", "Lunes,Martes,Miércoles,Jueves,Viernes");
    formData.append("availableSeats", seatsAvailables);
    formData.append("pricePerSeat", price);
    formData.append("TripFare", price);
    formData.append("PricePerKilometer", price);
    formData.append("vehicleModelImageAlt", modelo);
    formData.append("drivingLicenseImageAlt", licenseNumber);
    formData.append("starLocation", {
      startLocationName: "Casa",
      latitude: 40.473687,
      longitude: -3.709342,
    });
    formData.append("endLocation", {
      endLocationName: "Trabajo",
      latitude: 40.45142,
      longitude: -3.715488,
    });
    formData.append("currentQuickCarLocation", {
      latitude: 40.473687,
      longitude: -3.709342,
    });

    try {
      const response = await fetch(
        "https://obbaramarket-backend.onrender.com/api/obbaramarket/driver/register",
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
        console.log("La creacion fue exitosa");
        //AQUI SE DEBE DE GUARDAS LA INFO EN EL REDUCER
      } else {
        console.error(`Error en la solicitud: ${response.status}`);
        Alert.alert("Ya existe un quickcar");
      }
    } catch (error) {
      console.log(error.message);
    }
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
            <Text style={styles.detailsTitle}>Crear QuickCar</Text>
            <View style={styles.dividingLine}></View>
          </View>

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
                  Verifica tu cuenta con una foto de tu identificacion
                </Text>
              </View>

              <Text style={styles.titleText}>Tipo de Vehiculo</Text>

              <InputSelectBox
                listItems={vehiculeType}
                placeHolder={"Selecciona el tipo de vehiculo"}
                setSelectedItemIdex={setVehiculeSelectedIndex}
                selectedItemIdex={-1}
              ></InputSelectBox>

              <Text style={styles.titleText}>Modelo</Text>

              <View style={styles.titleInputContainer}>
                <TextInput
                  style={styles.titleInput}
                  value={modelo}
                  onChangeText={(text) => {
                    onTextInputChange(setModelo, text);
                  }}
                  placeholder="Ingresa el modelo del vehiculo"
                ></TextInput>
              </View>

              <View style={styles.principalFotoContainer}>
                <Text style={styles.addFotoLabel}>
                  Agrega una foto de tu vehiculo
                </Text>
                <Text style={styles.addFotoSubLable}>Puedes subir 5 fotos</Text>
                {vehiculeImageList.length == 0 && (
                  <View style={styles.fotoContainer}>
                    <View style={styles.addImageBottomContainer}>
                      <TouchableOpacity
                        style={styles.addImageBottom}
                        onPress={pickVehiculeImage}
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
                {vehiculeImageList.length > 0 && (
                  <ScrollView style={styles.fotoContainer} horizontal={true}>
                    {vehiculeImageList.length > 0 &&
                      vehiculeImageList.map((item, index) => {
                        return (
                          <View key={index}>
                            <View>
                              <TouchableOpacity
                                style={styles.deleteImageBottomContainer}
                                onPress={() => {
                                  setVehiculeImageList(
                                    vehiculeImageList.filter(
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
                        onPress={pickVehiculeImage}
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

              <Text style={styles.priceLabel}>Precio por asiento</Text>

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

              <Text style={styles.categoryLabel}>Asientos disponibles</Text>

              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Ingresa el # de asientos disponibles"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    onSeatsChange(setSeatsAvailables, text);
                  }}
                  value={seatsAvailables <= 0 ? "" : seatsAvailables}
                ></TextInput>
              </View>

              <Text style={styles.priceLabel}>Numero de Licencia</Text>

              <View style={styles.priceInputContainer}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Ingresa el numero de licencia"
                  keyboardType="default"
                  onChangeText={(text) => {
                    onLicenseChange(setLicenseNumber, text);
                  }}
                  value={licenseNumber <= 0 ? "" : licenseNumber}
                ></TextInput>
              </View>

              <View style={styles.principalFotoContainer}>
                <Text style={styles.addFotoLabel}>
                  Agrega una foto de tu dentificacion
                </Text>
                <Text style={styles.addFotoSubLable}>Puedes subir 5 fotos</Text>
                {imageList.length == 0 && (
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
                {imageList.length > 0 && (
                  <ScrollView style={styles.fotoContainer} horizontal={true}>
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
              <TouchableOpacity
                style={styles.publicBotton}
                onPress={() => {
                  if (isNewProduct) {
                    // updateProducto(false);
                  } else {
                    CrearQuickCar();
                  }
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
