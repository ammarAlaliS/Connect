import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import MessageIcon from "../../icons/MessageIcon";
import { useDispatch, useSelector } from "react-redux";
import { setMessageBoxState } from "../../globalState/marketSlice.js";

const ArticleCard = ({ urlImage, id }) => {
  const dispatch = useDispatch();
  const isMessageBoxActive = useSelector(
    (state) => state.market?.isMessageBoxActive
  );

  const handleToggleMessageBox = () => {
    dispatch(setMessageBoxState());
  };

  return (
    <View style={styles.container}>
      <View style={{ position: "relative", width: "100%", height: 100 }}>
        <Image
          source={{
            uri: urlImage,
          }}
          style={styles.imageContainer}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={handleToggleMessageBox}
        >
          <MessageIcon width={28} height={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Text>$1,500</Text>
      <Text>Auto</Text>
      <Text>2 disponibles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    marginTop: 15,
  },
  imageContainer: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  messageContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#f1f1f1",
    height: 29,
    width: 29,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
export default ArticleCard;
