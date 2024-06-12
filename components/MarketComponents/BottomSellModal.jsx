import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PlusIcon from "../../icons/PlusIcon";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";

const BottomSellModal = ({ setShowNewProductModal }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(widthAnim, {
        toValue: 250,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.delay(1000),
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [widthAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sellerBottom}
        onPress={() => {
          setShowNewProductModal(true);
        }}
      >
        <PlusIcon
          width={34}
          height={34}
          color={"#f1f1f1"}
          strokeWidth={3}
        ></PlusIcon>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.suggestionContainer,
          {
            width: widthAnim,
            borderWidth: widthAnim > 0 ? 1.5 : 0,
          },
        ]}
      >
        <Text style={styles.textSuggestion}>Vende un producto</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 45,
    right: 30,
    height: 50,
    width: 50,
  },
  sellerBottom: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#ffbb1c",
    width: 50,
    height: 50,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  suggestionContainer: {
    height: "100%",
    backgroundColor: "#ffbb1c",
    position: "absolute",
    top: 0,
    right: 25,
    zIndex: 1,
    borderColor: "#c3c3c3",
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: "flex-start",
    overflow: "hidden",
  },
  textSuggestion: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 16,
    fontFamily: "PlusJakartaSans-SemiBold",
    lineHeight: 17,
    textAlign: "center",
    color: "#000",
    width: 225,
  },
});

export default BottomSellModal;
