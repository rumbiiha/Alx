import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import useLogin from '@/hooks/useLogin';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import HomeScreen from './home';
import CategoryScreen from './(tabs)/category';
import Cart from './cart';
import Account from './accountzz';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const [index, setIndex] = React.useState(0);
  const router = useRouter();
  const [isUserExist, setIsUserExist] = React.useState(false);
  // const isLoggedIn = useLogin();

  // Check for user data in AsyncStorage
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('@user');
      if (user) {
        setIsUserExist(true);
      }
    };
    checkUser();
  }, []);

  const handleNavigation = (route) => {
    setIndex(route.key);
    // router.push(route.key); // Navigate to the corresponding screen
  };

  const routes = [
    { key: '/', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'category', title: 'Categories', focusedIcon: 'view-list', unfocusedIcon: 'view-list-outline' },
    { key: 'cart', title: 'Cart', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
    { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ];

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      barStyle={{ backgroundColor: '#FFFFFF', borderTopColor: 'gainsboro', borderTopWidth: 1 }}
      onIndexChange={setIndex}
      renderScene={({ route }) => {
        switch (route.key) {
          case '/':
            return <HomeScreen />;
          case 'category':
            return <CategoryScreen />;
          case 'cart':
            const cartItems = useSelector((state) => state.cart.items);
            const cartCount = cartItems.length;

            return <Cart/>;
          case 'account':
            return <Account />;
          default:
            return null;
        }
      }}
      onTabPress={({ route }) => handleNavigation(route)} // Navigate on tab press
      activeColor={activeTintColor}
      inactiveColor="#aaa"
    />
  );
}

