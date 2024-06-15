import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Animated } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import CheckIcon from "../../icons/CheckIcon";
import { ScrollView } from "react-native";

const InputSelectBox = ({ listItems, placeHolder }) => {
  const [itemSelected, setItemSelect] = useState(false);
  const [showSelectItem, setShowSelectItem] = useState(false);
  const [itemIndex, setItemIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(-1);
  const heigthItemAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(heigthItemAnim, {
        toValue: !showSelectItem ? 0 : 120,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();
  }, [showSelectItem]);

  const widthContainer = Dimensions.get("screen");

  return (
    <View>
      <View
        style={[
          {
            borderWidth: itemSelected ? 2 : 0,
          },
          styles.principalContainer,
        ]}
        onTouchEnd={(e) => {
          e.stopPropagation();
          setItemSelect(!itemSelected);
          setShowSelectItem(!showSelectItem);
        }}
      >
        <Text
          style={[
            {
              borderWidth: itemSelected ? 0 : 1,
            },
            styles.textPrincipalInput,
          ]}
        >
          {selectedItem >= 0 ? listItems[selectedItem] : placeHolder}
        </Text>
      </View>
      <Animated.View
        style={[
          {
            height: heigthItemAnim,
          },
          styles.animateView,
        ]}
      >
        <ScrollView
          horizontal={true}
          style={styles.scrollViewContainer}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView
            nestedScrollEnabled={true}
            style={[
              {
                width: widthContainer.width * 0.74,
                borderWidth: showSelectItem ? 2 : 0,
              },
              styles.secondScrollViewContainer,
            ]}
          >
            {listItems.map((item, index) => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      width: widthContainer.width * 0.8,
                      backgroundColor:
                        index == itemIndex ? "#c3c3c3" : "#ffffff10",
                      marginTop: index == 0 ? 5 : 0,
                    },
                    styles.itemBoton,
                  ]}
                  key={index}
                  onPressIn={() => {
                    setItemIndex(index);
                  }}
                  onPressOut={() => {
                    setItemIndex(-1);
                  }}
                  onPress={() => {
                    setSelectedItem(index);
                    setItemSelect(!itemSelected);
                    setShowSelectItem(!showSelectItem);
                  }}
                >
                  <View
                    style={styles.itemContainer}
                    className="d-flex flex-row"
                  >
                    <Text style={styles.textContainer}>{item}</Text>
                    {index == selectedItem && (
                      <CheckIcon
                        height={25}
                        width={25}
                        color={"#2b00b6"}
                      ></CheckIcon>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  principalContainer: {
    borderColor: "#2b00b6",
    borderStyle: "solid",
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
  textPrincipalInput: {
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
  animateView: {
    marginTop: 3,
    marginHorizontal: 15,
    width: "80%",
  },
  scrollViewContainer: {
    position: "absolute",
    width: "auto",
    height: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  secondScrollViewContainer: {
    backgroundColor: "#f5f6f7",
    borderRadius: 3,
    position: "relative",
    top: 0,
    height: "100%",
    borderColor: "#c3c3c3",
    borderStyle: "solid",
  },
  itemBoton: {
    height: 43,
    marginHorizontal: 2,
    borderRadius: 3,
  },
  itemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 50,
  },
  textContainer: {
    height: 43,
    width: "80%",
    fontSize: 16,
    textAlignVertical: "center",
    fontFamily: "PlusJakartaSans-SemiBold",
    paddingLeft: 8,
    borderRadius: 3,
  },
});

export default InputSelectBox;
