import React, { useState, useEffect } from 'react';
import useLogin from '@/hooks/useLogin';
import OtpRegisterScreen from '../register';
import Account from '../accountx';


const AccountScreen = () => {
  const isLoggedIn = useLogin()
  return !isLoggedIn ? <Account /> : <OtpRegisterScreen />;
};


export default AccountScreen;
