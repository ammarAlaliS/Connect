// ./api/checkSession.js
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../globalState/userSlice';

const useAuthCheck = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const checkSession = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Home');
        return;
      }

      const response = await axios.get('https://obbaramarket-backend.onrender.com/api/obbaramarket/check-session', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        dispatch(setUser({
          global_user: {
            _id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            profile_img_url: response.data.profile_img_url,
            token: token,
          }
        }));
        navigation.navigate('MainScreen');
      } else {
        navigation.navigate('Home');
      }
    } catch (error) {
      navigation.navigate('Home');
    }
  };

  return { checkSession };
};

export default useAuthCheck;
