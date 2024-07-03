import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import ContactIcon from "../../icons/ContactIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";
import { setSelectedProduct } from "../../globalState/marketSlice";

const ArticleCard = ({
  setShowModal,
  item,
  setShowNewProductModal,
  showNewProductModal,
  showModal,
  setIsNewProduct,
  setDeleteAlertModal,
}) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [productItem, setProductItem] = useState(item);
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;

  const decodedToken = jwtDecode(token);

  useEffect(() => {
    setUserId(productItem?.user._id);
  }, [productItem]);

  useEffect(() => {
    if (showNewProductModal && showModal) {
      setShowModal(false);
    }
  }, [showModal, showNewProductModal]);

  useEffect(() => {
    if (isDeletingProduct) {
      setShowModal(false);
      setIsDeletingProduct(false);
    }
  }, [isDeletingProduct]);

  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        dispatch(setSelectedProduct(productItem));
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
            uri: productItem?.image[0]
              ? productItem?.image[0]
              : "https://noticias.coches.com/wp-content/uploads/2019/12/Recirculacion-de-Aire-2-859x483.jpg",
          }}
          style={styles.imageContainer}
          resizeMode="cover"
        />

        <TouchableOpacity
          className="d-flex flex-row"
          style={styles.messageContainer}
          onPress={(e) => {
            e.stopPropagation();
            if (userId == decodedToken.id) {
              setIsNewProduct(false);
              setShowNewProductModal(true);
            }
          }}
        >
          {userId != decodedToken.id && (
            <ContactIcon width={25} height={30} color="#3725dd" />
          )}
          {userId == decodedToken.id && (
            <EditIcon width={25} height={30} color="#3725dd" />
          )}
        </TouchableOpacity>
        {userId == decodedToken.id && (
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={(e) => {
              e.stopPropagation();
              setIsDeletingProduct(true);
              setDeleteAlertModal(true);
            }}
          >
            <TrashIcon width={25} height={30} color="#3725dd" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={{
            fontSize: 19,
            paddingLeft: 5,
            fontFamily: "PlusJakartaSans-Bold",
          }}
        >
          {productItem?.productName}
        </Text>
        <Text style={styles.detailTextStyle}>€ {productItem?.price}</Text>
        <Text style={styles.detailTextStyle}>
          {productItem?.stock} disponibles
        </Text>
        <Text style={styles.location}>
          {productItem?.productLocation.state}
        </Text>
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
  trashContainer: {
    position: "absolute",
    bottom: 5,
    right: 39,
    backgroundColor: "#f1f1f1",
    height: 29,
    width: 29,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
export default ArticleCard;
