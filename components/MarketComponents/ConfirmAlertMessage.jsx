import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

const ConfirmAlertMessage = ({ seeModal, setShowAlert, setMarkingAsSold }) => {
  return (
    <Modal
      visible={seeModal}
      animationType="fade"
      transparent={true}
      style={{ zIndex: 1000 }}
    >
      <View style={styles.principalContainer}>
        <View style={styles.secondContainer}>
          <Text style={styles.thirdContainer}>Alerta</Text>
          <Text style={styles.textContainer}>
            Estas seguro que quieres marcar este producto como vendido
          </Text>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.bottom}
              onPress={() => {
                setShowAlert(false);
              }}
            >
              <Text style={styles.textBottom}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottom}
              onPress={() => {
                setMarkingAsSold(true);
                setShowAlert(false);
              }}
            >
              <Text style={styles.textBottom}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  principalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000030",
  },
  secondContainer: {
    height: 150,
    width: "80%",
    margin: "auto",
    marginTop: "50%",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00000090",
    borderStyle: "solid",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  thirdContainer: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "900",
    fontFamily: "PlusJakartaSans-Bold",
  },
  textContainer: {
    width: "90%",
    height: "50%",
    marginHorizontal: "auto",
    textAlign: "justify",
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 17,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  bottom: {
    height: 30,
    marginRight: 10,
    padding: 2,
    alignItems: "center",
  },
  textBottom: {
    color: "#2b00b6",
    fontFamily: "PlusJakartaSans-SemiBold",
    borderRadius: 2,
  },
});

export default ConfirmAlertMessage;
