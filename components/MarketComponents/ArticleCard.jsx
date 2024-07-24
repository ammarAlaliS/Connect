import { Image, Text, View, TouchableOpacity } from "react-native";
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
  darkMode
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
      style={{
        width: "45%",
        backgroundColor: darkMode.backgroundDark,
        shadowRadius: 2,
        marginBottom: 10, // Ajusta esto si es necesario
      }}
      onTouchEnd={() => {
        dispatch(setSelectedProduct(productItem));
      }}
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          height: 150,
        }}
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
          style={{
            width: "100%",
            height: 150,
          }}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            backgroundColor: "#f1f1f1",
            height: 29,
            width: 29,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={(e) => {
            e.stopPropagation();
            if (userId === decodedToken.id) {
              setIsNewProduct(false);
              setShowNewProductModal(true);
            }
          }}
        >
          {userId !== decodedToken.id ? (
            <ContactIcon width={25} height={30} color="#3725dd" />
          ) : (
            <EditIcon width={25} height={30} color="#3725dd" />
          )}
        </TouchableOpacity>
        {userId === decodedToken.id && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 5,
              right: 39,
              backgroundColor: "#f1f1f1",
              height: 29,
              width: 29,
              alignItems: "center",
              justifyContent: "center",
            }}
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
      <View style={{ padding: 5 }}>
        <Text
          style={{
            fontSize: 19,
            paddingLeft: 5,
            fontFamily: "PlusJakartaSans-Bold",
          }}
        >
          {productItem?.productName}
        </Text>
        <Text
          style={{
            color: "#000",
            fontFamily: "PlusJakartaSans-SemiBold",
            fontSize: 14,
          }}
        >
          € {productItem?.price}
        </Text>
        <Text
          style={{
            color: "#000",
            fontFamily: "PlusJakartaSans-SemiBold",
            fontSize: 14,
          }}
        >
          {productItem?.stock} disponibles
        </Text>
        <Text
          style={{
            color: "#000",
            fontFamily: "PlusJakartaSans-SemiBold",
            fontSize: 12,
            fontWeight: "700",
          }}
        >
          {productItem?.productLocation.state}
        </Text>
      </View>
    </View>
  );
};

export default ArticleCard;
