import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, useTheme, Divider } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import { useCreateAddressMutation, useGetAddressQuery } from '../api';
import ShippingAddress from '../components/checkout/AddressSection';
import ShippingOptions from '../components/checkout/ShippingSection';
import OrderItems from '../components/checkout/OrderItemsSection';

const CheckoutScreen = () => {

    const cartItems = useSelector(state => state.cart.items);
    const theme = useTheme();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    const order = {
        "orderId": "ORD12345678",
        "shippingAddress": {
            "addressLine1": "123 Main St",
            "addressLine2": "Apt 4B",
            "city": "Kampala",
            "state": "Central",
            "country": "Uganda",
            "postalCode": "12345",
            "isDefault": true,
            "label": "Home"
        },
        "items": [],
        "payment": {
            "method": "Credit Card",
            "transactionId": "TX1234567890",
            "totalAmount": 80.00,
            "currency": "USD"
        },
        "orderStatus": "Pending",
        "shippingMethod": {
            "method": "Standard Shipping",
            "cost": 5.00,
            "currency": "USD",
            "estimatedDelivery": "2024-10-10T12:00:00Z"
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <ShippingAddress />
                <OrderItems cartItems={cartItems} theme={theme} />
                <ShippingOptions theme={theme} />
            </ScrollView>
            <Layout style={styles.footer}>
                <View>
                    <Text category='s1'>Total</Text>
                    <Text category='h6' style={{ ...styles.totalPrice, color: theme['color-primary-default'] }}>UGX {(getTotalPrice() + 10000).toLocaleString()}</Text>
                </View>
                <Button onPress={() => router.push({ pathname: 'payments', params: { amount: (getTotalPrice() + 10000) } })} style={styles.checkoutButton}>Pay Now</Button>
            </Layout>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        // padding: 16,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F7F9FC',
        borderTopWidth: 1,
        borderColor: '#E4E9F2',
    },
    totalPrice: {
        fontWeight: 'bold',
    },
    checkoutButton: {
        // flex: 1,
        marginLeft: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        gap: 5,
    },
    input: {
        marginBottom: 16,
    },
    saveButton: {
        marginTop: 16,
    },
    addressLabel: {
        marginLeft: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: '#EDF1F7',
        borderRadius: 6,
    },
    contact: {
        marginTop: 8,
    },
    addAddressButton: {
        marginTop: 16,
    }
});

export default CheckoutScreen;
