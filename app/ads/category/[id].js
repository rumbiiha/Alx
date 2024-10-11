import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image } from 'react-native';
import { Layout, Text, Input, Button, Select, SelectItem } from '@ui-kitten/components';
import { useGetProductsQuery } from '../../../api';
import { ShoppingCart, MagnifyingGlass } from 'phosphor-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {useSelector } from 'react-redux';
import { Appbar } from 'react-native-paper';
import ProductCard from '@/components/products/ProductCard';
import NoProductsFound from '../../../components/products/NoProductsFound';


const Ads = () => {
    const { id, category } = useLocalSearchParams();
    const router = useRouter();

    const { data, isLoading, isError } = useGetProductsQuery(id ? { category: id } : {});
    const products = data?.data?.docs || [];

    const [modalVisible, setModalVisible] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedSort, setSelectedSort] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;

    const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Rating'];
    const ratingOptions = ['All Ratings', '4 stars & up', '3 stars & up'];
    const categoryOptions = ['All Categories', 'Electronics', 'Clothing', 'Books', 'Home & Garden'];

    // Filtering and sorting logic

    const CartIconWithBadge = () => (
        <TouchableOpacity onPress={() => router.push('/cart')}>
            <View style={styles.cartIconContainer}>
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                    <View style={styles.cartCount}>
                        <Text style={styles.cartCountText}>{cartCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Appbar.Header style={{backgroundColor:"white",borderBottomWidth:1,borderBottomColor:'gainsboro'}}>
                <Appbar.BackAction onPress={() => { /* Handle back action */ }} />
                <Appbar.Content title={category} />
                <Appbar.Action
                    icon={({ color }) => (
                        <View style={styles.iconContainer}>
                            <MagnifyingGlass size={24} color={color} />
                        </View>
                    )}
                    onPress={() => { /* Handle search action */ }}
                />
                <Appbar.Action
                    icon={({ color }) => (
                        <View style={styles.iconContainer}>
                            <CartIconWithBadge />
                        </View>
                    )}
                    onPress={() => { /* Handle shopping action */ }}
                />
            </Appbar.Header>
            
            <SafeAreaView style={styles.safeArea}>
                <Layout style={styles.container}>
                    {/* New Filter Buttons */}
                    <View style={styles.filterButtonsContainer}>
                        <Select
                            style={styles.filterButton}
                            placeholder="Sort"
                            size='small'
                            value={sortOptions[selectedSort]}
                            onSelect={index => setSelectedSort(index.row)}
                        >
                            {sortOptions.map((option, index) => (
                                <SelectItem key={index} title={option} />
                            ))}
                        </Select>
                        <Select
                            style={styles.filterButton}
                            placeholder="Rating"
                            size='small'
                            value={ratingOptions[selectedRating]}
                            onSelect={index => setSelectedRating(index.row)}
                        >
                            {ratingOptions.map((option, index) => (
                                <SelectItem key={index} title={option} />
                            ))}
                        </Select>
                        <Select
                            style={styles.filterButton}
                            placeholder="Category"
                            size='small'
                            value={selectedCategory}
                            onSelect={index => setSelectedCategory(categoryOptions[index.row])}
                        >
                            {categoryOptions.map((option, index) => (
                                <SelectItem key={index} title={option} />
                            ))}
                        </Select>
                    </View>
                    {/* Modal for Advanced Filters */}
                    <Modal visible={modalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text category="h5" style={styles.modalTitle}>Advanced Filters</Text>

                                {/* Price Range Filter */}
                                <Text category="label" style={styles.filterLabel}>Price Range</Text>
                                <View style={styles.priceRangeContainer}>
                                    <Input
                                        style={styles.priceInput}
                                        placeholder="Min"
                                        keyboardType="numeric"
                                        value={minPrice}
                                        onChangeText={setMinPrice}
                                    />
                                    <Input
                                        style={styles.priceInput}
                                        placeholder="Max"
                                        keyboardType="numeric"
                                        value={maxPrice}
                                        onChangeText={setMaxPrice}
                                    />
                                </View>

                                {/* Modal Buttons */}
                                <View style={styles.modalActions}>
                                    <Button appearance='outline' onPress={() => {
                                        setMinPrice('');
                                        setMaxPrice('');
                                    }}>
                                        Reset
                                    </Button>
                                    <Button onPress={() => setModalVisible(false)}>
                                        Apply
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Products List */}
                    <ScrollView contentContainerStyle={styles.productsContainer}>
                        {products.length === 0 ? (
                            <NoProductsFound  />
                        ) : (
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        )}
                    </ScrollView>
                </Layout>
            </SafeAreaView>
        </>
    );
};


const styles = StyleSheet.create({
    cartIconContainer: {
        position: 'relative',
    },
    cartCount: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#d32f2f',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartCountText: {
        color: 'white',
        fontSize: 12,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        marginBottom: 10,
    },
    filterLabel: {
        marginTop: 15,
        marginBottom: 5,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
    },
    priceRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceInput: {
        width: '48%',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    productsContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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

    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        gap: 7,
        paddingVertical: 3,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    filterButton: {
        flex: 1,
        // marginHorizontal: 5,
    },
});

export default Ads;
