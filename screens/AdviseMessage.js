import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
    },
    {
      title: "¡BIENVENIDO A QUICKCAR!",
      message:
        "Inicia sesión como invitado para explorar nuestra interfaz y ver nuestras tiendas y blogs. Para interactuar plenamente, te recomendamos registrarte o iniciar sesión.",
      showNext: false,
      showPrev: true,
      showFinish: true,
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: darkMode.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.topRightContainer}>
            <TouchableOpacity onPress={toggleDarkModeHandler}>
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
          <View style={styles.buttonContainer} className=" space-x-4">
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
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
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  messageContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconButton: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 10,
    marginVertical: 10,
  },
  iconLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  prevButton: {
    backgroundColor: "#666",
  },
  nextButton: {
    backgroundColor: "#1E90FF",
  },
  finishButton: {
    backgroundColor: "#1E90FF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#1E90FF",
  },
});
