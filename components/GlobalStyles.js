import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    androidSafeArea:{
        flex:1,
        backgroundColor: "#FFFFFF", 
        paddingTop: Platform.OS === "android" ? 0 : 0,

    }
})