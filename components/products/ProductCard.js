import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {  Text, useTheme} from '@ui-kitten/components';
import { ShoppingCart, Star } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

const ProductCard = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/ads/${product._id}`)}>
            <View>
                <Image source={product.files.length !== 0 ? { uri: product.files[0]?.url } : require('@/assets/placeholder.png')} style={[styles.productImage, { backgroundColor: theme['color-basic-400'] }]} />
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <ShoppingCart size={16} color="white" weight="bold" />
                </TouchableOpacity>
            </View>
            <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">{product.title}</Text>
            <View style={styles.ratingContainer}>
                <Star size={16} color="orange" weight="fill" />
                <Text style={styles.ratingText}>{product.rating || '4.7'}</Text>
                <Text style={{ fontSize: 16, color: 'grey' }}> | </Text>
                <Text style={[styles.soldText, { backgroundColor: theme['color-basic-400'] }]}>{product.sold} sold</Text>
            </View>
            <Text style={styles.productPrice}>UGX {product.price?.toLocaleString('en-UG')}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    productImage: {
        width: '100%',
        height: 190,
        borderRadius: 8,
        marginBottom: 10,
    },
    addToCartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FF5656', // Adjust color as per your theme
        padding: 7,
        borderRadius: 50,
    },
    productCard: {
        width: '50%',
        backgroundColor: 'white',
        marginBottom: 2,
        borderRadius: 8,
        padding: 4,
    },
    productTitle: {
        fontSize: 15,
        // fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF5656',
        marginVertical: 5,
    },
    ratingContainer: {
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'orange',
        marginLeft: 5,
    },
    soldText: {
        fontSize: 11,
        backgroundColor: 'gainsboro',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        marginRight: 15,
    },
});

export default ProductCard;