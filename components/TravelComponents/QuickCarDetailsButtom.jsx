import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

const QuickCarDetailsButtom = ({ setShowQuickCarDetails }) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        width: 48,
        height: 48,
        bottom: "5%",
        right: 20,
        zIndex: 101,
        backgroundColor: "#ffbb1c",
        borderRadius: 24,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      onPress={() => {
        setShowQuickCarDetails(true);
      }}
    >
      <FontAwesome
        name="angle-up"
        size={44}
        color="#000"
        style={{ marginBottom: 5 }}
      />
    </TouchableOpacity>
  );
};

export default QuickCarDetailsButtom;
