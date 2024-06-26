import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import ContactIcon from "../../icons/ContactIcon";

const ArticleCard = ({ setShowModal, setSelectedProduct, item }) => {
  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        setSelectedProduct(item);
      }}
    >
      <View
        style={styles.secondContainer}
        onTouchEnd={() => {
          setShowModal(true);
        }}
      >
        <Image
          source={{
            uri: item.image[0]
              ? item.image[0]
              : "https://noticias.coches.com/wp-content/uploads/2019/12/Recirculacion-de-Aire-2-859x483.jpg",
          }}
          style={styles.imageContainer}
          resizeMode="cover"
        />

        <TouchableOpacity
          className="d-flex flex-row"
          style={styles.messageContainer}
        >
          <ContactIcon width={25} height={30} color="#3725dd" />
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={{
            fontSize: 19,
            paddingLeft: 5,
            fontFamily: "PlusJakartaSans-Bold",
          }}
        >
          {item.productName}
        </Text>
        <Text style={styles.detailTextStyle}>€ {item.price}</Text>
        <Text style={styles.detailTextStyle}>{item.stock} disponibles</Text>
        <Text style={styles.location}>{item.productLocation.state}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1.5,
    marginTop: 14,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  messageContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#f1f1f1",
    height: 29,
    width: 29,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  secondContainer: { position: "relative", width: "100%", height: 150 },
  descriptionContainer: {
    borderTopWidth: 0,
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  detailTextStyle: {
    color: "#000",
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14,
    paddingLeft: 10,
  },
  location: {
    color: "#000",
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 12,
    paddingLeft: 10,
    fontWeight: "700",
    paddingBottom: 10,
  },
});
export default ArticleCard;
