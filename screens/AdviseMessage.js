import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import useCustomFonts from "../fonts/useCustomFonts";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, selectTheme } from "../globalState/themeSlice";

export default function AdviseMessage() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const { fontsLoaded } = useCustomFonts();
  const navigation = useNavigation();
  const darkMode = useSelector(selectTheme);
  const dispatch = useDispatch();

  if (!fontsLoaded) {
    return null;
  }

  const screens = [
    {
      title: "¡LA CARRERA ACABA DE COMENZAR!",
      message:
        "QuickCar te conecta con el mundo. Regístrate, inicia sesión y disfruta de un viaje sin complicaciones.",
      showNext: true,
      showPrev: false,
      backgroundImage: require("../assets/imgs/verde2.png"), 
    },
    {
      title: "¿CÓMO EMPEZAR HA SER CONDUCTOR EN QUICKCAR?",
      steps: [
        {
          icon: "user-plus",
          title: "Regístrate",
          description:
            "Crea tu cuenta de conductor. Introduce tus datos y sube una imagen personal junto con tu carnet de conducir. Estarás listo para compartir viaje.",
        },
        {
          icon: "car",
          title: "Comparte tu Ruta",
          description:
            "Espera a que alguien contacte contigo para compartir tu ruta en tu vehículo y en tu horario. Alquila tus asientos libres y gana dinero por ello.",
        },
        {
          icon: "money",
          title: "Gana Dinero",
          description:
            "Consigue puntos por cada asiento alquilado en tu viaje. Al final del mes podrás canjear tus puntos por dinero real en nuestro monedero.",
        },
      ],
      showNext: true,
      showPrev: true,
      backgroundImage: require("../assets/imgs/lightAndBlueBg.jpg"), 
    },
    {
      title: "MARKETPLACE DE QUICKCAR",
      steps: [
        {
          icon: "shopping-cart",
          title: "Vende Productos",
          description:
            "Publica tus productos en nuestro marketplace. Los usuarios pueden ver tus productos y realizar pedidos directamente desde la aplicación.",
        },
        {
          icon: "envelope",
          title: "Envía Mensajes",
          description:
            "Comunícate fácilmente con los vendedores. Envía y recibe mensajes para resolver dudas y acordar detalles de compras.",
        },
        {
          icon: "handshake-o",
          title: "Acuerdos de Venta",
          description:
            "Coordina la entrega y el pago con los vendedores. QuickCar facilita la comunicación para asegurar acuerdos exitosos.",
        },
      ],
      showNext: true,
      showPrev: true,
      backgroundImage: require("../assets/imgs/lightAndBlueBg.jpg"), 
    },
    {
      title: "BLOG DE QUICKCAR",
      message:
        "Mantente actualizado con las últimas noticias y novedades de QuickCar. Da 'Me gusta', comenta y guarda tus artículos favoritos.",
      icons: [
        { name: "heart", label: "Me gusta" },
        { name: "comment", label: "Comentar" },
        { name: "bookmark", label: "Guardar" },
      ],
      showNext: true,
      showPrev: true,
      backgroundImage: require("../assets/imgs/lightAndBlueBg.jpg"), 
    },
    {
      title: "¡BIENVENIDO!",
      message:
        "Inicia sesión como invitado para explorar nuestra interfaz y ver nuestras tiendas y blogs. Para interactuar plenamente, te recomendamos registrarte o iniciar sesión.",
      showNext: false,
      showPrev: true,
      showFinish: true,
      backgroundImage: require("../assets/imgs/lightAndBlueBg.jpg"), 
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleDotPress = (index) => {
    setCurrentScreen(index);
  };

  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  const handleFinish = () => {
    navigation.navigate("SignInForm");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={screens[currentScreen].backgroundImage}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.content}>
            <View style={styles.topRightContainer}>
              <TouchableOpacity
                onPress={toggleDarkModeHandler}
                style={{ paddingVertical: 40 }}
              >
                <FontAwesome
                  name={darkMode.darkMode ? "sun-o" : "moon-o"}
                  size={32}
                  color={darkMode.darkMode ? colors.dark.icon : darkMode.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: darkMode.text }]}>
              {screens[currentScreen].title}
            </Text>
            {currentScreen === 1 || currentScreen === 2 ? (
              screens[currentScreen].steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <FontAwesome
                    name={step.icon}
                    size={30}
                    color={darkMode.icon}
                    style={styles.icon}
                  />
                  <View style={styles.stepTextContainer}>
                    <Text style={[styles.stepTitle, { color: darkMode.text }]}>
                      {step.title}
                    </Text>
                    <Text
                      style={[styles.stepDescription, { color: darkMode.text }]}
                    >
                      {step.description}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.messageContainer}>
                <Text style={[styles.message, { color: darkMode.text }]}>
                  {screens[currentScreen].message}
                </Text>
                {screens[currentScreen].icons && (
                  <View style={styles.iconContainer}>
                    {screens[currentScreen].icons.map((icon, index) => (
                      <TouchableOpacity key={index} style={styles.iconButton}>
                        <FontAwesome
                          name={icon.name}
                          size={30}
                          color={darkMode.icon}
                          style={styles.icon}
                        />
                        <Text
                          style={[styles.iconLabel, { color: darkMode.text }]}
                        >
                          {icon.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
            <View style={{
              justifyContent: "center",
              width: "100%",
              marginVertical: 20,
              position:'absolute',
              bottom:50
            }}>
              <View style={styles.buttonContainer} className=" space-x-16">
                {screens[currentScreen].showPrev && (
                  <TouchableOpacity
                    style={[styles.button, styles.prevButton]}
                    onPress={handlePrevious}
                  >
                    <FontAwesome name="chevron-left" size={20} color="white" />
                    <Text style={styles.buttonText}>Anterior</Text>
                  </TouchableOpacity>
                )}
                {screens[currentScreen].showNext && (
                  <TouchableOpacity
                    style={[styles.button, styles.nextButton]}
                    onPress={handleNext}
                  >
                    <Text style={styles.buttonText}>Siguiente</Text>
                    <FontAwesome name="chevron-right" size={20} color="white" />
                  </TouchableOpacity>
                )}
                {screens[currentScreen].showFinish && (
                  <TouchableOpacity
                    style={[styles.button, styles.finishButton]}
                    onPress={handleFinish}
                  >
                    <Text style={styles.buttonText}>Finalizar</Text>
                    <FontAwesome name="chevron-right" size={20} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.dotsContainer}>
                {screens.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dot,
                      currentScreen === index && styles.activeDot,
                    ]}
                    onPress={() => handleDotPress(index)}
                  />
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImageStyle: {
    opacity: 0.5, 
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  topRightContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stepDescription: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  messageContainer: {
    alignItems: "center",
  },
  message: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  prevButton: {
    backgroundColor: "#007bff",
  },
  nextButton: {
    backgroundColor: "#28a745",
  },
  finishButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
  },
});
