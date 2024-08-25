import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Función para verificar la sesión del usuario
export const checkUserSession = async (dispatch, setUser, setSession, setFetchLoading) => {
  dispatch(setFetchLoading(true));

  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      dispatch(setSession(false));
      console.log('No token found, user session is inactive');
      return;
    }

    const response = await api.get(
      "https://obbaramarket-backend.onrender.com/api/obbaramarket/check-session",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      dispatch(setUser({
        global_user: {
          _id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          profile_img_url: response.data.profile_img_url,
          token: token,
        },
      }));
      dispatch(setSession(true));
      console.log('User session is active');
    } else {
      dispatch(setSession(false));
      console.log('Session check returned non-200 status');
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    dispatch(setSession(false));
    console.log('Error during session verification, user session is inactive');
  } finally {
    dispatch(setFetchLoading(false));
  }
};