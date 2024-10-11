import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { House, ListMagnifyingGlass, ShoppingCart, User, ArrowLeft } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { useTheme } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLogin from '@/hooks/useLogin';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();
  const [isUserExist, setIsUserExist] = React.useState(false);
  const isLoggedIn = useLogin();

  // Get cart item count from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('@user');
      if (user) {
        setIsUserExist(true);
      }
    };

    checkUser();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme['color-primary-default'],
        tabBarLabelStyle:{paddingBottom:15},
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House size={24} color={color} weight={focused ? 'fill' : 'regular'} style={styles.icon} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categories',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: false,
          // tabBarIcon: ({ color, focused }) => (
          //   <View style={styles.iconWithBadge}>
          //     <ShoppingCart size={24} color={color} weight={focused ? 'fill' : 'regular'} style={styles.icon} />
          //     {cartCount > 0 && (
          //       <View style={styles.badge}>
          //         <Text style={styles.badgeText}>{cartCount}</Text>
          //       </View>
          //     )}
          //   </View>
          // ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={activeTintColor} style={styles.backIcon} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} weight={focused ? 'fill' : 'regular'} style={styles.icon} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#fff', // Change this to your desired background color
    borderTopWidth: 1, // Remove default border
    padding: 15,
    height:70,
  },
  iconWithBadge: {
    position: 'relative',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5, // Space between icon and label
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  backIcon: {
    marginLeft: 10,
  },
});
