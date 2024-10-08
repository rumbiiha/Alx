import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from '@ui-kitten/components';
import { useRoute } from 'expo-router';

const OrderDetailsScreen = () => {
  // Dummy order data for demonstration
  const order = {
    id: '12345',
    date: '2024-09-29T10:00:00Z',
    status: 'Shipped',
    items: [
      { name: 'Product 1', quantity: 1, price: 29.99 },
      { name: 'Product 2', quantity: 2, price: 15.49 },
      { name: 'Product 3', quantity: 1, price: 45.00 },
    ],
    shippingAddress: '123 Main St, Springfield, USA',
    paymentMethod: 'Credit Card',
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text category='h5'>Order #{order.id}</Text>
        <Text category='s1'>Date: {new Date(order.date).toLocaleDateString()}</Text>
        <Text category='s1'>Status: {order.status}</Text>
      </Card>

      <Card style={styles.card}>
        <Text category='h6'>Items:</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text category='s1'>{item.name}</Text>
            <Text category='s1'>Qty: {item.quantity}</Text>
            <Text category='s1'>Price: ${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text category='h6' >Shipping Address:</Text>
        <Text category='s1'>{order.shippingAddress}</Text>
      </Card>

      <Card style={styles.card}>
        <Text category='h6'>Payment Method:</Text>
        <Text category='s1'>{order.paymentMethod}</Text>
      </Card>

      <Button style={styles.button} onPress={() => alert('Reorder functionality here!')}>
        Reorder
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  itemContainer: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default OrderDetailsScreen;
