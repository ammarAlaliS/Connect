import React, { useEffect } from "react";
import { Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MainNavigator from "./MainNavegator";
import LoadScreen from "./screens/LoadScreen";
import useCustomFonts from "./fonts/useCustomFonts";
import { setUser } from "./globalState/userSlice";
import { setSession, setFetchLoading } from "./globalState/checkUserSessionSlice";
import { checkUserSession } from "./api/checkSession";
import Auth from "./Auth";

export const AuthCheck = () => {
    const dispatch = useDispatch();
    const isUserSessionActive = useSelector((state) => state.sessionStatus.isUserSessionActive);
    const isLoading = useSelector((state) => state.sessionStatus.fetchLoading);
    const { fontsLoaded } = useCustomFonts();

    useEffect(() => {
        checkUserSession(dispatch, setUser, setSession, setFetchLoading);
    }, [dispatch]);

    if (isLoading) {
        return (
            <Animated.View style={{ flex: 1 }}>
                <LoadScreen />
            </Animated.View>
        );
    }

    if (!fontsLoaded) {
        return <LoadScreen />;
    }
    
    return isUserSessionActive ? <MainNavigator /> : <Auth />;
};
