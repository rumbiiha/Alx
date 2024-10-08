import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Layout,
  Modal,
  Text,
  Input,
} from '@ui-kitten/components';

const PhoneNumberModal = ({ visible, onClose }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');

  return (
    <Modal
      visible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <Layout style={styles.container}>
        <Text category='h5' style={styles.title}>OTP Register</Text>
        <Text style={styles.description}>
          We will send you a one-time password to your registered mobile number.
        </Text>
        <Input
          placeholder='Enter your phone number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          accessoryRight={() => (
            <Text style={styles.countryCode}>+256</Text>
          )}
          style={styles.input}
        />
        <Button onPress={onClose} style={styles.button}>
          Send OTP
        </Button>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 20,
    color: 'grey',
  },
  input: {
    marginBottom: 20,
  },
  countryCode: {
    marginRight: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default PhoneNumberModal;
