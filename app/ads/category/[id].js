import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image } from 'react-native';
import { Layout, Text, Input, Button, RadioGroup, Radio, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { useGetProductsQuery } from '../../../api';
import { FunnelSimple, ShoppingCart, MagnifyingGlass, SortAscending, Star, Heart } from 'phosphor-react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

const NoProductsFound = ({ onExploreMore }) => {
    return (
        <View style={styles.noProductsContainer}>
            <MagnifyingGlass size={48} color="#ccc" />
            <Text category="h6" appearance='hint' style={styles.noProductsText}>
                Sorry, there are no products available in this category at the moment.
            </Text>
            <Button onPress={onExploreMore} style={styles.exploreButton}>
                Explore More
            </Button>
        </View>
    );
};


const SkeletonLoader = () => {
    const theme = useTheme();
    return (
        <View style={styles.skeletonCard}>
            <View style={[styles.skeletonImageContainer, { backgroundColor: theme['color-basic-400'] }]}>
                <Image
                    source={require('../../../assets/placeholder.png')}
                    style={styles.skeletonImage}
                />
            </View>
            <View style={[styles.skeletonText, { backgroundColor: theme['color-basic-400'] }]} />
            <View style={[styles.skeletonTextSmall, { backgroundColor: theme['color-basic-400'] }]} />
            <View style={[styles.skeletonPrice, { backgroundColor: theme['color-basic-400'] }]} />
        </View>
    );
};

const ProductCard = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/ads/${product._id}`)}>
            <View style={styles.productImageContainer}>
                <Image source={product.files.length !== 0 ? { uri: product.files[0]?.url } : require('../../../assets/placeholder.png')} style={[styles.productImage, { backgroundColor: theme['color-basic-400'] }]} />
                {/* Add to Cart Button */}
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

const Ads = () => {
    const { id, category } = useLocalSearchParams();
    const dispatch = useDispatch();
    const router = useRouter()

    const { data, isLoading, isError } = useGetProductsQuery(id ? { category: id } : {});
    const products = data?.data?.docs || [];

    const [modalVisible, setModalVisible] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedSort, setSelectedSort] = useState(0); // Default to first sort option
    const [selectedRating, setSelectedRating] = useState(0); // Default to no rating filter

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, selectedColor, selectedSize }));
    };

    const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Rating'];
    const ratingOptions = ['4 stars & up', '3 stars & up', 'All Ratings'];

    // Filtering and sorting logic
    const filteredProducts = products
        .filter(product => {
            const priceCondition = (minPrice ? product.price >= Number(minPrice) : true) && (maxPrice ? product.price <= Number(maxPrice) : true);
            const ratingCondition = (selectedRating === 0) || (selectedRating === 1 && product.rating >= 4) || (selectedRating === 2);
            return priceCondition && ratingCondition;
        })
        .sort((a, b) => {
            if (selectedSort === 0) return a.price - b.price; // Price: Low to High
            if (selectedSort === 1) return b.price - a.price; // Price: High to Low
            return (b.rating || 0) - (a.rating || 0); // Rating
        });

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
            <Stack.Screen
                options={{
                    title: category,
                    headerRight: () => <TopNavigationAction icon={CartIconWithBadge} />,
                }}
            />
            <SafeAreaView style={styles.safeArea}>
                <Layout style={styles.container}>
                    {filteredProducts.length !== 0 && <View style={styles.topBar}>
                        <Input style={styles.searchInput} placeholder="Search..." accessoryLeft={<MagnifyingGlass />} />
                        <Button appearance='outline'  status='basic' style={{ height: 40 }} accessoryLeft={FunnelSimple} onPress={() => setModalVisible(true)} />
                    </View>}

                    {/* Modal for Sort & Filter */}
                    <Modal visible={modalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text category="h5" style={styles.modalTitle}>Sort & Filter</Text>

                                {/* Sort By Section */}
                                <Text category="label" style={styles.filterLabel}>Sort By</Text>
                                <RadioGroup selectedIndex={selectedSort} onChange={index => setSelectedSort(index)}>
                                    {sortOptions.map((option, index) => (
                                        <Radio key={index}>
                                            {() => (
                                                <View style={styles.radioOption}>
                                                    <SortAscending size={16} color="#333" />
                                                    <Text style={styles.radioText}>{option}</Text>
                                                </View>
                                            )}
                                        </Radio>
                                    ))}
                                </RadioGroup>

                                {/* Rating Filter */}
                                <Text category="label" style={styles.filterLabel}>Rating</Text>
                                <RadioGroup selectedIndex={selectedRating} onChange={index => setSelectedRating(index)}>
                                    {ratingOptions.map((option, index) => (
                                        <Radio key={index}>
                                            {() => (
                                                <View style={styles.radioOption}>
                                                    <Star size={16} color="orange" />
                                                    <Text style={styles.radioText}>{option}</Text>
                                                </View>
                                            )}
                                        </Radio>
                                    ))}
                                </RadioGroup>

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
                                        setSelectedSort(0);
                                        setSelectedRating(0);
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
                        {filteredProducts.length === 0 ? (
                            <NoProductsFound onExploreMore={() => router.push('category')} />
                        ) : (
                            filteredProducts.map((product) => (
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
    productImageContainer: {
        position: 'relative',
    },
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
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 'auto'
    },
    noProductsText: {
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'normal'
    },
    exploreButton: {
        marginTop: 10,
    },
});

export default Ads;
