import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    androidSafeArea:{
        flex:1,
        backgroundColor: "#4F03D4", 
        paddingTop: Platform.OS === "android" ? 0 : 0,

    }
})