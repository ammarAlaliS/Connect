import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ArticleCarousel = () => {
  const [imagePositions, setImagePositions] = useState([]);

  const imageList = [
    {
      idImage: 1,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      idImage: 2,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      idImage: 3,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      idImage: 4,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      idImage: 5,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      idImage: 6,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
    {
      idImage: 7,
      urlImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
    },
  ];

  useEffect(() => {
    let arrayPositions = [];
    for (let i = 0; i < imageList.length; i++) {
      arrayPositions.push({ top: 0, right: 0 });
    }
  }, []);

  return (
    <View style={styles.thirdContainer}>
      <View
        style={{
          width: 280,
          height: 240,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 15,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {imageList.map((item, index) => {
          return (
            <Image
              key={index}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
              }}
              style={[
                styles.imageContainer,
                // { marginLeft: index == 1 ? -200 : 0 },
              ]}
              resizeMode="cover"
            />
          );
        })}
      </View>

      {/* CARRUCEL */}
      <View
        style={{
          height: 5,
          width: 5,
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          //   marginTop: 5,
          paddingBottom: 5,
          marginBottom: 2,
        }}
      >
        {imageList.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                backgroundColor: index == 1 ? "#2b00b6" : "#c3c3c3",
                borderRadius: 4,
                margin: 2,
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 280,
    height: 240,
    borderRadius: 10,
    marginTop: 10,
    position: "relative",
    // left: -140,
  },
  thirdContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#f1f1f1",
    paddingBottom: 10,
    // height: "auto",
  },
});

export default ArticleCarousel;
