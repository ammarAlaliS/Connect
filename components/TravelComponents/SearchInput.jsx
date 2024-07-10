import { TextInput } from "react-native";
import { View } from "react-native-animatable";
import XMarkIcon from "../../icons/XMarkIcon";

const SearchInput = () => {
  return (
    <View>
      <TextInput placeholder="Elije tu destino"></TextInput>
      <XMarkIcon height={25} width={25} color={"#000"}></XMarkIcon>
    </View>
  );
};

export default SearchInput;
