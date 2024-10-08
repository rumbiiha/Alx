import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, Card, useTheme } from '@ui-kitten/components';
import { Minus, Plus, Backspace, ShoppingCart, ArrowRight } from 'phosphor-react-native'; // Import icons from Phosphor
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateItemQuantity } from '../../store/cartSlice';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'expo-router';

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const isLoggedIn = useLogin();

    // Get cart items from Redux store
    const cartItems = useSelector(state => state.cart.items);
    const [selectedItems, setSelectedItems] = useState([]);

    // Handle quantity changes for items in the cart
    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateItemQuantity({ id: item._id, quantity: newQuantity }));
        } else {
            handleRemoveItem(item);
        }
    };

    // Handle removing an item from the cart
    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item._id));
    };

    // Calculate the total price of selected items
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    };

    const renderCartItem = (item) => (
        <Layout style={{ marginBottom: 8, borderWidth: 1, borderColor: 'rgb(228, 233, 242)', borderRadius: 5, padding: 10, }} key={item._id}>
            <View style={styles.cartItem}>
                <Image
                    source={require('../../assets/placeholder.png')}
                    style={styles.productImage}
                />
                <View style={styles.productInfo}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, flexGrow: 1 }} numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
                        <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveItem(item)}>
                            <Backspace size={25} color={theme['color-basic-600']} />
                        </TouchableOpacity>
                    </View>
                    <Text appearance='hint'>{`Color: ${item?.selectedColor?.colorName || '--'}`}</Text>
                    <Text appearance='hint'>{`Size: ${item?.selectedSize || '--'}`}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text category='s1' style={[styles.price, { color: theme['color-primary-default'] }]}>UGX {item.price.toLocaleString()}</Text>
                        <View style={styles.quantityContainer}>
                            <Button
                                size='tiny'
                                accessoryLeft={() => <Minus size={14} color={theme['color-primary-default']} weight="bold" />}
                                style={styles.quantityButton}
                                appearance='outline'
                                onPress={() => handleQuantityChange(item, item.quantity - 1)}  // Decrease quantity
                            />
                            <Text style={styles.quantity}>{item.quantity || 1}</Text>
                            <Button
                                size='tiny'
                                appearance='outline'
                                accessoryLeft={() => <Plus size={14} color={theme['color-primary-default']} weight="bold" />}
                                style={styles.quantityButton}
                                onPress={() => handleQuantityChange(item, item.quantity + 1)}  // Increase quantity
                            />
                        </View>
                    </View>

                </View>
            </View>
        </Layout>
    );

    const renderEmptyCartMessage = () => (
        <View style={styles.emptyCartContainer}>
            <ShoppingCart size={48} color={theme['color-primary-default']} weight="duotone" />
            <Text category='s1' style={styles.emptyCartText}>Your cart is empty!</Text>
            <Button size='small'>
                Shop Now
            </Button>
        </View>
    );

    return (
        <Layout style={styles.container}>
            {cartItems.length === 0 ? (
                renderEmptyCartMessage()
            ) : (
                <>
                    <ScrollView style={{ padding: 15 }}>
                        {cartItems.map(renderCartItem)}
                    </ScrollView>
                    <Layout style={styles.footer}>
                        <View>
                            <Text category='s1'>Total</Text>
                            <Text category='h6' style={{ color: theme['color-primary-default'] }}>
                                UGX {getTotalPrice().toLocaleString()}
                            </Text>
                        </View>
                        <Button style={styles.checkoutButton} onPress={() => router.push(isLoggedIn?'checkout':'otpRegister')}>
                            Checkout
                        </Button>
                    </Layout>
                </>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        position: 'relative', // For positioning remove icon
    },
    removeIcon: {
        // position: 'absolute',
        // top: -15,
        // right: -20,
        // width: 30,
        marginLeft: 10,
        zIndex: 1, // Ensure the icon is above other elements
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
    },
    price: {
        fontWeight: 'bold',
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 1,
    },
    quantityButton: {
        width: 25,
        height: 25,
    },
    quantity: {
        marginHorizontal: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EDF1F7',
    },
    checkoutButton: {
        width: 120,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyCartText: {
        marginTop: 16,
        marginBottom: 32,
        fontSize: 18,
        color: '#8F9BB3',
    },
});

export default CartScreen;
