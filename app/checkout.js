import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Appbar, Text, Button, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import ShippingAddress from '../components/checkout/AddressSection';
import ShippingOptions from '../components/checkout/ShippingSection';
import OrderItems from '../components/checkout/OrderItemsSection';
import { Phone } from 'phosphor-react-native';
import { useCreateOrderMutation } from '@/api';

const CheckoutScreen = () => {
    const cartItems = useSelector(state => state.cart.items);
    const theme = useTheme();
    const [createOrder, { isLoading, data }] = useCreateOrderMutation();
    const [payNowLoading, setPayNowLoading] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [selectedAddressId, setSelectedAddressId] = React.useState('');

    // Fetch user and selected address ID from local storage
    useEffect(() => {
        const fetchUserAndAddress = async () => {
            try {
                const user = await AsyncStorage.getItem('@user'); // Fetch @user object
                const address = await AsyncStorage.getItem('selectedAddress'); // Fetch selected address ID
                if (user) {
                    const parsedUser = JSON.parse(user);
                    setUserId(parsedUser.user._id); // Assuming the user object has an _id field
                }
                if (address) {
                    const parsedAddress = JSON.parse(address);
                    setSelectedAddressId(parsedAddress._id); // Set selected address ID
                }
            } catch (error) {
                console.error('Failed to fetch user or address:', error);
            }
        };

        fetchUserAndAddress();
    }, []);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    const handlePayNow = async () => {
        setPayNowLoading(true); // Start loading


        const orderData = {
            items: cartItems,
            userId: userId, // Add user ID from local storage
            userAddressId: selectedAddressId, // Add selected address ID from local storage
            total: getTotalPrice() + 10000,
            paymentType:'Mobile Money'
        };
        try {
            const res = await createOrder(orderData).unwrap(); // Execute the mutation
            console.log('data', res.data._id)
            router.push({ pathname: 'payments', params: {orderId: res.data._id, amount: getTotalPrice() + 10000 } });
        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            setPayNowLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={{ borderColor: 'gainsboro', borderWidth: 1, paddingRight: 15 }}>
                <Appbar.BackAction />
                <Appbar.Content title="Checkout" />
                <View style={styles.contactContainer}>
                    <Phone
                        size={24}
                        color={theme.colors.primary}
                        onPress={() => {
                            // Implement the functionality to contact support
                            console.log('Contact Support: +256123456789');
                        }}
                    />
                    <Text style={styles.contactText} variant="labelLarge">0200922167</Text>
                </View>
            </Appbar.Header>
            <ScrollView style={styles.content}>
                <ShippingAddress />
                <OrderItems cartItems={cartItems} theme={theme} />
                <ShippingOptions theme={theme} />
            </ScrollView>
            <View style={styles.footer}>
                <View>
                    <Text variant='titleMedium'>Total</Text>
                    <Text variant="headlineMedium" style={{ ...styles.totalPrice, color: theme.colors.primary }}>
                        UGX {(getTotalPrice() + 10000).toLocaleString()}
                    </Text>
                </View>
                <Button
                    mode="contained"
                    onPress={handlePayNow}
                    loading={payNowLoading} // Loading state for the button
                    style={styles.checkoutButton}
                    disabled={payNowLoading} // Disable the button while loading
                >
                    Pay Now
                </Button>
            </View>
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
        marginLeft: 16,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactText: {
        marginLeft: 8,
        fontSize: 16,
        // color: 'black',
    },
});

export default CheckoutScreen;
