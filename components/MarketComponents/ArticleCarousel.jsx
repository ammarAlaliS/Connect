import { useEffect, useRef, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import XMarkIcon from "../../icons/XMarkIcon";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import ArrowRightHeroIcon from "../../icons/ArrowRightHeroICon";

const ArticleCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [imageActive, setIamgeActive] = useState(0);

  const [modal, showModal] = useState(false);

  const scrollViewRef = useRef(null);

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

  const handleScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;

    setScrollPosition({ x: xOffset, y: 0 });

    let numberElement = Math.floor(scrollPosition.x / 300);
    if (numberElement * 300 + 150 < scrollPosition.x) {
      numberElement++;
    }
  };

  const scrollToPosition = (x, y) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, y, animated: true });
    }
  };

  const NextImage = () => {
    if (imageActive < imageList.length - 1) {
      setScrollPosition((imageActive + 1) * 300);
      scrollToPosition((imageActive + 1) * 300);
      setIamgeActive(imageActive + 1);
    } else {
      setScrollPosition(0);
      scrollToPosition(0);
      setIamgeActive(0);
    }
  };

  const PreviuosImage = () => {
    if (imageActive > 0) {
      setScrollPosition((imageActive - 1) * 300);
      scrollToPosition((imageActive - 1) * 300);
      setIamgeActive(imageActive - 1);
    } else {
      setScrollPosition((imageList.length - 1) * 300);
      scrollToPosition((imageList.length - 1) * 300);
      setIamgeActive(imageList.length - 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!modal) {
        NextImage();
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [imageActive, modal]);

  return (
    <View style={styles.container} className="d-flex flex-column">
      <TouchableOpacity
        style={styles.leftArrowContainer}
        onPress={PreviuosImage}
      >
        <ArrowLeftIcon width={40} height={40} color={"#000"} styles={{}} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightArrowContainer} onPress={NextImage}>
        <ArrowRightHeroIcon width={40} height={40} color={"#000"} styles={{}} />
      </TouchableOpacity>
      <View
        style={styles.carrucelPrincipalContainer}
        className="d-flex flex-row"
      >
        <ScrollView
          horizontal={true}
          onScroll={handleScroll}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={() => {
            let numberElement = Math.floor(scrollPosition.x / 300);
            if (numberElement * 300 + 150 < scrollPosition.x) {
              numberElement++;
            }
            scrollToPosition(numberElement * 300, 0);
            setIamgeActive(numberElement);
          }}
        >
          {imageList.map((item, index) => {
            return (
              <View
                key={index}
                style={{ width: 300, height: 250 }}
                onTouchEnd={() => {
                  showModal(true);
                }}
              >
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
                  }}
                  style={[styles.imageContainer, { opacity: modal ? 0.1 : 1 }]}
                  resizeMode="cover"
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Modal visible={modal} transparent={true} animationType="fade">
        <View
          style={styles.imageZoomModal}
          onTouchEnd={() => {
            showModal(false);
          }}
          className="d-flex"
        >
          <View
            style={styles.xMarkIconContainer}
            onTouchEnd={() => {
              showModal(false);
            }}
          >
            <TouchableOpacity>
              <XMarkIcon width={30} height={30} color={"#f1f1f1"}></XMarkIcon>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs1ne2JPwK-k3y1qa9Vzms1Tmsq2i5dMVjSA&s",
            }}
            style={{ width: "100%", height: "90%" }}
            resizeMode="contain"
          />
        </View>
      </Modal>
      {/* CARRUCEL */}
      <View
        style={styles.itemScrollCarrucelContainer}
        className="d-flex flex-row"
      >
        {imageList.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.itemScrollCarrucel,
                {
                  backgroundColor: index == imageActive ? "#2b00b6" : "#c3c3c3",
                },
              ]}
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
    marginHorizontal: 10,
  },
  container: {
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "#f1f1f1",
    paddingBottom: 10,
  },
  leftArrowContainer: {
    position: "absolute",
    top: 110,
    left: 10,
    zIndex: 200,
  },
  rightArrowContainer: {
    position: "absolute",
    top: 110,
    right: 10,
    zIndex: 200,
  },
  carrucelPrincipalContainer: {
    width: 300,
    height: 240,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  imageZoomModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000099",
    justifyContent: "center",
    padding: 20,
  },
  xMarkIconContainer: {
    position: "absolute",
    top: 15,
    end: 10,
    width: 30,
    height: 30,
    zIndex: 100,
  },
  itemScrollCarrucelContainer: {
    height: 5,
    width: 5,
    width: "100%",
    justifyContent: "center",
    paddingBottom: 5,
    marginBottom: 2,
  },
  itemScrollCarrucel: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 2,
  },
});

export default ArticleCarousel;
