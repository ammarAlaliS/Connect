import { Image, Text, View, TouchableOpacity } from "react-native";
import ContactIcon from "../../icons/ContactIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";
import { setSelectedProduct } from "../../globalState/marketSlice";
import { Entypo } from "@expo/vector-icons";
import ModalInitialChat from "./ModalInitialChat";

const 
ArticleCard = ({
  setShowModal,
  item,
  setShowNewProductModal,
  showNewProductModal,
  showModal,
  setIsNewProduct,
  setDeleteAlertModal,
  darkMode,
}) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [productItem, setProductItem] = useState(item);
  const global_user = useSelector((state) => state.user.global_user);
  const token = global_user?.token;
  const user = useSelector((state) => state.user);
  const [showProductDetails, setShowProductDetails] = useState(false);

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

  const HandleShowProductDetails = () => {
    setShowProductDetails(!showProductDetails);
  };
  return (
    <View
      style={{
        flex: 1,
        shadowRadius: 2,
        backgroundColor: darkMode.background,

        borderColor: darkMode.borderBox,
        marginRight: 2,
        marginLeft: 2,
        minWidth: "50%",
      }}
      className=" p-1"
    >
      <View
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
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
            height: 250,
          }}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            backgroundColor: "#0D1117",
            height: 36,
            width: 36,
            borderRadius: 9999,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: darkMode.borderBox,
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
            <ContactIcon width={25} height={30} color="#008000" />
          ) : (
            <EditIcon width={25} height={30} color="#008000" />
          )}
        </TouchableOpacity>
        {userId === decodedToken.id && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 5,
              right: 44,
              backgroundColor: "#0D1117",
              height: 36,
              width: 36,
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: darkMode.borderBox,
            }}
            onPress={(e) => {
              e.stopPropagation();
              setIsDeletingProduct(true);
              setDeleteAlertModal(true);
            }}
          >
            <TrashIcon width={25} height={30} color="#F6001B" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ padding: 5 }}>
        <Text
          style={{
            fontSize: 19,
            fontFamily: "PlusJakartaSans-SemiBold",
            color: darkMode.text,
          }}
        >
          {productItem?.productName}
        </Text>
        <View className=" flex-row items-center justify-between">
          <Text
            style={{
              color: "#000",
              fontFamily: "PlusJakartaSans-SemiBold",
              fontSize: 14,
              color: darkMode.text,
            }}
          >
            <Text
              style={{
                color: "#008000",
              }}
            >
              Precio €:
            </Text>{" "}
            {productItem?.price}
          </Text>
          <Text
            style={{
              color: "#000",
              fontFamily: "PlusJakartaSans-Bold",
              fontSize: 14,
              color: "#06BCEE",
            }}
          >
            <Text
              style={{
                color: darkMode.text,
                fontFamily: "PlusJakartaSans-SemiBold",
              }}
            >
              {" "}
              disponibles:
            </Text>
            {productItem?.stock}{" "}
          </Text>
        </View>
        <View className=" flex-row items-center justify-between space-x-2 my-1">
          <View>
            <TouchableOpacity onPress={HandleShowProductDetails}>
              <Text style={{ color: "#06BCEE", fontSize: 16 }}> Detalles</Text>
            </TouchableOpacity>
          </View>
          <View className=" flex-row items-center justify-end space-x-2 my-1">
            <Entypo name="location" size={18} color="#06BCEE" />
            <Text
              style={{
                color: darkMode.text,
                fontFamily: "PlusJakartaSans-SemiBold",
                fontSize: 14,
                fontWeight: "700",
                textAlign: "end",
              }}
            >
              {productItem?.productLocation.state}
            </Text>
          </View>
        </View>
        {showProductDetails ? (
          <View>
            <View className="">
              <View>
                <Text
                  style={{
                    color: darkMode.text,
                  }}
                >
                  {" "}
                  {productItem?.description}
                </Text>
              </View>
            </View>
            <View className=" flex-row mt-3 space-x-2">
              <View className=" items-center">
                <Image
                  source={{
                    uri: productItem?.user?.global_user.profile_img_url,
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 9999,
                  }}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    color: darkMode.text,
                  }}
                >
                  Vendedor
                </Text>
              </View>
              <View className=" flex-row items-center  justify-between space-x-1 flex-1">
                <View className=" flex-row items-center space-x-1">
                  <Text
                    style={{
                      color: darkMode.text,
                    }}
                  >
                    {productItem?.user?.global_user.first_name}
                  </Text>
                  <Text
                    style={{
                      color: darkMode.text,
                    }}
                  >
                    {productItem?.user?.global_user.last_name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: darkMode.text,
                    }}
                  >
                    {productItem?.productStatus}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}
        <View className=" flex-row  mt-3">
          <ModalInitialChat darkMode={darkMode} />
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;
