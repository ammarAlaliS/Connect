import { View } from "react-native";
import Card from "../components/Card";
import TravelHome from "../components/TravelComponents/TravelHome";
import { useSelector } from "react-redux";

const TravelScreen = () => {
  const showInitialCard = useSelector((state) => state.travel.showInitialCard);

  return (
    <View>
      {showInitialCard && <Card></Card>}
      <TravelHome></TravelHome>
    </View>
  );
};

export default TravelScreen;
