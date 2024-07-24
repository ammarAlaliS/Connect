import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuVisibility } from "../globalState/menuSlice";
import MenuItem from "../components/MenuItem";

const MenuButton = ({
  activeScreen,
  handlePress,
  toggleDarkModeHandler,
  darkMode,
}) => {
  const dispatch = useDispatch();
  const menuVisible = useSelector((state) => state.menu.menuVisible);
  const headerVisible = useSelector((state) => state.header.headerVisible);
  const [animation] = React.useState(new Animated.Value(1));

  const getButtonStyles = (screenName) => {
    if (screenName === activeScreen) {
      return {
        borderBottomWidth: 3,
        width: 50,
        borderRadius: 10,
        borderBottomColor: darkMode.headerBorderIcon,
        marginBottom:3
      };
    } else {
      return {
        borderBottomWidth: 3,
        width: 50,
        borderRadius: 10,
        borderBottomColor: 'transparent', 
      };
    }
  };

  return (
    <View className=" ">
      <Animated.View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{ backgroundColor: darkMode.background }}
            className="flex-row items-center w-full justify-center space-x-6 "
          >
            <View style={getButtonStyles("Card")}>
              <MenuItem
                iconName="HomeIcon"
                iconWidth={32}
                iconHeight={28}
                iconColor={activeScreen === "Card" ? darkMode.headerIconColor : darkMode.icon}
                onPress={() => {
                  handlePress("Card");
                }}
              />
            </View>
            <View style={getButtonStyles("Profile")}>
              <MenuItem
                iconName="UserIcon"
                iconWidth={32}
                iconHeight={28}
                iconColor={activeScreen === "Profile" ? darkMode.headerIconColor : darkMode.icon}
                onPress={() => {
                  handlePress("Profile");
                }}
              />
            </View>
            <View style={getButtonStyles("Store")}>
              <MenuItem
                iconName="StoreIcon"
                iconWidth={32}
                iconHeight={28}
                iconColor={activeScreen === "Store" ? darkMode.headerIconColor : darkMode.icon}
                onPress={() => {
                  handlePress("Store");
                }}
              />
            </View>
            <View style={getButtonStyles("Blog")}>
              <MenuItem
                iconName="BlogIcon"
                iconWidth={32}
                iconHeight={28}
                iconColor={activeScreen === "Blog" ? darkMode.headerIconColor : darkMode.icon}
                onPress={() => {
                  handlePress("Blog");
                }}
              />
            </View>
            <View style={getButtonStyles("Contact")}>
              <MenuItem
                iconName="ContactIcon"
                iconWidth={32}
                iconHeight={28}
                iconColor={activeScreen === "Contact" ? darkMode.headerIconColor : darkMode.icon}
                onPress={() => {
                  handlePress("Contact");
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default MenuButton;
