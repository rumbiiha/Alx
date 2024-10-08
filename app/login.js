import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { Snackbar } from 'react-native-paper'; // Snackbar for error messages
import { useLoginMutation } from '@/api'; // Assume you have this mutation for login
import { Eye, EyeSlash } from 'phosphor-react-native'; // Phosphor icons for password visibility
import { useRouter } from 'expo-router';
import LoginIllustration from '../assets/LoginIllustration'; // Assume you have this illustration
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const router = useRouter();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [login, { isLoading }] = useLoginMutation(); // Assume this is the login mutation

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/; // Phone number validation regex

  const handleSnackOpen = (message) => {
    setSnackMessage(message);
    setSnackVisible(true);
  };

  const handleLogin = async () => {
    if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
      handleSnackOpen('Please enter a valid phone number (format: 75XXXXXXX, 74XXXXXXX, etc.)');
      return;
    }
    if (!password) {
      handleSnackOpen('Please enter your password');
      return;
    }

    try {
      const response = await login({ phoneNumber, password }).unwrap();
      if (response.status === 200) {
        console.log('response.data', response.data)
        await AsyncStorage.setItem('@user', JSON.stringify(response.data));
        handleSnackOpen('Login successful!');
        // router.push('/'); // Navigate to the home screen
      } else {
        handleSnackOpen(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      handleSnackOpen(error?.data?.message || 'Login failed. Please try again.');
      console.error('Login Error:', error);
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.container}>
          {/* Illustration at the top */}
          <LoginIllustration />
          
          <Text category='h5' style={styles.title}>Login</Text>

          {/* Phone Number Input */}
          <Text category='s1' style={styles.label}>Phone Number</Text>
          <Input
            style={styles.input}
            placeholder='Enter phone number'
            onChangeText={(text) => setPhoneNumber(text)}
            accessoryLeft={() => <Text style={styles.countryCode}>+256</Text>}
            keyboardType='numeric'
          />

          {/* Password Input */}
          <Text category='s1' style={styles.label}>Password</Text>
          <Input
            style={styles.input}
            placeholder='Enter password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Toggle for password visibility
            accessoryRight={() => (
              <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <Eye size={24} weight="bold" />
                ) : (
                  <EyeSlash size={24} weight="bold" />
                )}
              </TouchableOpacity>
            )}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading} // Disable the button while logging in
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          {/* Register Link */}
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerText}>
              Don’t have an account? <Text style={styles.linkText}>Register</Text>
            </Text>
          </TouchableOpacity>
        </Layout>
      </TouchableWithoutFeedback>

      {/* Snackbar for Error Messages */}
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackVisible(false),
        }}
      >
        {snackMessage}
      </Snackbar>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  title: {
    textAlign: 'center',
    marginVertical: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    marginBottom: 15,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: '#007BFF',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
