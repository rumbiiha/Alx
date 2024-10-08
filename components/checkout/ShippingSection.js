import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';
import DeliveryLogo from './DeliveryLogo';

const ShippingOptions = ({ theme }) => (
  <Layout style={styles.container}>
    <Text style={{ marginBottom: 5 }} category='s1'>Shipping</Text>
    <Layout style={styles.option}>
      <View style={{ flexDirection: 'row' }}>
        <DeliveryLogo />
        <View style={styles.optionDetails}>
          <Text category='s1'>alxpress Delivery</Text>
          <Text appearance='hint' category='c2' style={{ marginVertical: 3 }}>Estimated arrival: 5 hours</Text>
          <Text category='h6' style={{ color: theme['color-primary-default'] }}>UGX 10,000</Text>
        </View>
      </View>

    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24, gap: 5, padding:15 },
  option: { padding: 20, borderWidth: 1, borderColor: 'rgb(228, 233, 242)', borderRadius: 5 },
  optionDetails: { marginLeft: 10 },
});

export default ShippingOptions;
