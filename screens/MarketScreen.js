import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import ArticleCard from "../components/MarketComponents/ArticleCard.jsx";
import FooterMarket from "../components/MarketComponents/FooterMarket.jsx";

const MarketScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users/1")
    //   .then((response) => response.json())
    //   .then((data) => dispatch(addUser(data)));
  }, []);
  const [search, setSearch] = useState("");
  const [selectedclassification, setSelectedclassification] = useState(1);
  const [carroDeCompras, setCarroDeCompras] = useState([]);
  const handleFilterPress = () => {
    Alert.alert("Modal para los filtros");
  };

  const listClasifications = [
    { id: 1, name: "Todos" },
    { id: 2, name: "Vehiculos de Traccion" },
    { id: 3, name: "Motocicletas" },
    { id: 4, name: "Motocarro" },
    { id: 5, name: "Ciclomotor" },
    { id: 6, name: "Ciclomotor" },
    { id: 7, name: "Ciclomotor" },
  ];

  const productList = [
    {
      id: 1,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 2,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 3,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 4,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 5,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 6,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 7,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 8,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 9,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 10,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 11,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 12,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 13,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 14,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 15,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      id: 16,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
  ];

  return (
    <View style={styles.principalContainer}>
      <View className="d-flex flex-row">
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color={search ? "#000000" : "#00000099"}
            />
            <TextInput
              style={styles.input}
              placeholder="Busca por nombre o codigo"
              onChangeText={(text) => setSearch(text)}
              value={search}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.searchSection}>
            <TouchableOpacity onPress={handleFilterPress}>
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

      <View>
        <ScrollView
          style={styles.scrollStyles}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {listClasifications.map((item, index) => {
            if (item.id == selectedclassification) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.selectedItem}
                  onPress={() => {
                    setSelectedclassification(item.id);
                  }}
                >
                  <Text style={{ color: "#fff" }}>{item.name}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => {
                    setSelectedclassification(item.id);
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </View>

      {/* Cards de articulos */}

      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <View className="d-flex flex-row" style={styles.articlesContainer}>
          {productList.map((item, index) => {
            return (
              <ArticleCard
                carroDeCompras={carroDeCompras}
                setCarroDeCompras={setCarroDeCompras}
                urlImage={item.urlImage}
                id={item.id}
                key={index}
              ></ArticleCard>
            );
          })}
        </View>
      </ScrollView>
      {/* FooterMarket */}

      <FooterMarket></FooterMarket>
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
    flexDirection: "row",
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
  scrollStyles: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    marginTop: 5,
  },
  item: {
    padding: 5,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#c3c3c3",
    borderStyle: "solid",
    fontFamily: "Eina01-BoldItalic",
  },
  selectedItem: {
    padding: 5,
    margin: 5,
    backgroundColor: "#2b00b6",
    fontFamily: "Eina01-BoldItalic",
    borderRadius: 5,
  },
  articlesContainer: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingBottom: 100,
  },
});

export default MarketScreen;
