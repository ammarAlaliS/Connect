import { Image, Text, View } from "react-native";

const ArticleCard = ({ urlImage }) => {
  return (
    <View
      style={{
        width: "30%",
        // backgroundColor: "#fff",
        marginTop: 15,
      }}
    >
      <Image
        source={{
          uri: urlImage,
        }}
        style={{ width: "100%", height: 100, borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text>$1,500</Text>
      <Text>Auto</Text>
      <Text>2 disponibles</Text>
    </View>
  );
};

export default ArticleCard;
