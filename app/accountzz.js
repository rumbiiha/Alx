import React, { useState, useEffect } from 'react';
import useLogin from '@/hooks/useLogin';
// import OtpRegisterScreen from './otpRegister';
import Account from './accountx';
import { Appbar } from 'react-native-paper';
import { MagnifyingGlass, ShoppingCart } from 'phosphor-react-native';
import { View } from 'react-native';


const AccountScreen = () => {
  const isLoggedIn = useLogin()
  return <>
    <Appbar.Header>
      <Appbar.BackAction onPress={() => { /* Handle back action */ }} />
      <Appbar.Content title="My Account" />
      <Appbar.Action
        icon={({ color }) => (
          <View>
            <ShoppingCart size={24} color={color} /> {/* Customize color */}
          </View>
        )}
        onPress={() => { /* Handle shopping action */ }}
      />
      <Appbar.Action
        icon={({ color }) => (
          <View>
            <MagnifyingGlass size={24} color={color} />
          </View>
        )}
        onPress={() => { /* Handle search action */ }}
      />
    </Appbar.Header>
    <Account />
  </>;
};


export default AccountScreen;
