import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import {
  setLocationForegroundPermissions,
  setUserLocation,
} from "../globalState/travelSlice";

const useLocation = () => {
  const dispatch = useDispatch();

  const RequestLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    dispatch(setLocationForegroundPermissions(status));

    if (status == "granted") {
      let location = await Location.getCurrentPositionAsync({});

      dispatch(
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    }
  };

  return {
    RequestLocationPermissions,
  };
};

export default useLocation;
