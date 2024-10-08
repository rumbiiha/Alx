import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { useGetProductsQuery } from '../../api';
import { ShoppingCart, Star } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

// Product Card Component
const ProductCard = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/ads/${product._id}`)}>
            <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image || '../../../assets/placeholder.png' }} style={styles.productImage} />
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <ShoppingCart size={20} color="white" weight="bold" />
                </TouchableOpacity>
            </View>
            <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
                {product.title}
            </Text>
            <View style={styles.ratingContainer}>
                <Star size={16} color="orange" weight="fill" />
                <Text style={styles.ratingText}>{product.rating || '4.7'}</Text>
                <Text style={{ fontSize: 16, color: 'grey' }}> | </Text>
                <Text style={styles.soldText}>{product.sold} sold</Text>
            </View>
            <Text style={styles.productPrice}>UGX {product.price?.toLocaleString('en-UG')}</Text>
        </TouchableOpacity>
    );
};

// Skeleton Loader Component
const SkeletonLoader = () => {
    const theme = useTheme()
    return (
        <View style={styles.skeletonCard}>
            <View style={[styles.skeletonImageContainer, { backgroundColor: theme['color-basic-400'] }]}>
                <Image
                    source={require('../../assets/placeholder.png')}
                    style={styles.skeletonImage}
                />
            </View>
            <View style={[styles.skeletonText, { backgroundColor: theme['color-basic-400'] }]} />
            <View style={[styles.skeletonTextSmall, { backgroundColor: theme['color-basic-400'] }]} />
            <View style={[styles.skeletonPrice, { backgroundColor: theme['color-basic-400'] }]} />
        </View>
    );
};

// Ads List Component
const AdsList = () => {
    const { data, isLoading, isError } = useGetProductsQuery();
    const products = data?.data?.docs || [];

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Layout style={styles.container}>
                    <ScrollView contentContainerStyle={styles.productsContainer}>
                        {/* Display multiple skeleton loaders */}
                        {[...Array(6)].map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        );
    }

    if (isError) {
        return <Text>Error loading products</Text>;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Layout style={styles.container}>
                <ScrollView contentContainerStyle={styles.productsContainer}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </ScrollView>
            </Layout>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    productImageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
    },
    addToCartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FF5656', // Adjust color as per your theme
        padding: 8,
        borderRadius: 50,
    },
    productTitle: {
        fontSize: 15,
    },
    ratingContainer: {
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
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF5656',
        marginVertical: 5,
    },
    // Skeleton Loader Styles
    skeletonCard: {
        width: '48%',
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    skeletonImageContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 10,
    },
    skeletonImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
    },
    skeletonText: {
        width: '80%',
        height: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonTextSmall: {
        width: '60%',
        height: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonPrice: {
        width: '50%',
        height: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
});

export default AdsList;
