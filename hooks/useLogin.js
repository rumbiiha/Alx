import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        setIsLoggedIn(!!userData);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkUserLoggedIn();
  }, []);

  return isLoggedIn;
};

export default useLogin;
