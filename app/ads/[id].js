import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text, ViewPager, Button } from '@ui-kitten/components';
import { useGetProductQuery } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ShoppingCart, Star, Check } from 'phosphor-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Snackbar, Appbar } from 'react-native-paper'; // Import Appbar from React Native Paper
import ProductDetailsSkeleton from '../../components/loading/ProductDetailsSkeleton';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const { data, isLoading, isUninitialized } = useGetProductQuery(id, {
    skip: !id,
  });

  const product = data?.data;
  const images = product?.files.length ? product?.files.map((file) => ({ uri: file.url })) : [require('../../assets/placeholder.png'), require('../../assets/placeholder.png')];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [showMore, setShowMore] = useState(false); // State for toggling 'see more' description
  const [visible, setVisible] = useState(false); // State for managing Snackbar visibility

  // Function to hide the Snackbar
  const onDismissSnackBar = () => setVisible(false);
  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      productId: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      file: product.files.length ? product.files[0]?.url : '',
      selectedColor,
      selectedSize
    };
  
    dispatch(addToCart(cartItem));
    setVisible(true); // Show the Snackbar after adding to cart
  };

  const CartIconWithBadge = () => (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <View style={styles.cartIconContainer}>
        <ShoppingCart size={24} color="#3E4685" />
        {cartCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading || isUninitialized) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <>
      {/* Paper Appbar for Top Navigation */}
      <Appbar.Header style={{backgroundColor:'white'}}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Product Details" />
        <Appbar.Action style={{borderRadius:0}} icon={() => <CartIconWithBadge />} onPress={() => router.push('/cart')} />
      </Appbar.Header>

      <ScrollView style={{ backgroundColor: 'white' }}>
        <Layout style={styles.content}>
          {/* Image ViewPager */}
          <ViewPager
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
            style={styles.viewPager}
          >
            {images.map((image, index) => (
              <Layout key={index} style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
              </Layout>
            ))}
          </ViewPager>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  selectedIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <Layout style={{ padding: 17 }}>
            {/* Product Info */}
            <View style={styles.infoCard}>
              <View style={{ flexGrow: 1 }}>
                <Text category="h6" style={styles.productTitle}>
                  {product?.title}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.soldText}>{product?.sold} sold</Text>
                  <Star size={16} color="#FFD700" weight="fill" />
                  <Text>4.9</Text>
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text category="s2" style={{ fontWeight: 'bold', marginBottom: 3 }}>
                Description
              </Text>
              {/* Collapsible text */}
              <Text
                style={{ marginVertical: 3 }}
                numberOfLines={showMore ? undefined : 3}
              >
                {product?.description}
              </Text>
              <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                <Text style={{ color: '#3E4685' }}>
                  {showMore ? 'See less' : 'See more'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Colors and Sizes */}
            {product?.variants?.colors?.length > 0 && (
              <View style={{ marginBottom: 5 }}>
                <Text category="s2" style={{ fontWeight: 'bold' }}>Colors</Text>
                <View style={styles.colorContainer}>
                  {product.variants.colors.map((colorItem, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorBox,
                        { backgroundColor: colorItem.colorCode },
                        selectedColor?.colorCode === colorItem.colorCode && styles.selectedColorBox,
                      ]}
                      onPress={() => setSelectedColor(colorItem)}
                    >
                      {selectedColor.colorCode === colorItem.colorCode && <Check size={16} color="#FFF" weight="bold" />}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {product?.variants?.sizes?.length > 0 && (
              <>
                <Text category="s2" style={{ fontWeight: 'bold' }}>Sizes</Text>
                <View style={styles.sizeContainer}>
                  {product.variants.sizes.map((size, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.sizeBox,
                        selectedSize === size && { borderColor: '#3E4685' },
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text style={selectedSize === size && { color: '#3E4685' }}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </Layout>
        </Layout>
      </ScrollView>

      <Layout style={styles.bottomTabsContainer} level="1">
        <View style={{ flex: 1 }}>
          <Text category="s2" style={{ fontWeight: 'bold' }}>Total Price</Text>
          <Text category="h6" style={styles.price}>
            {`UGX ${(product?.price).toLocaleString()}`}
          </Text>
        </View>
        <Button
          style={styles.tabButton}
          onPress={handleAddToCart}
          accessoryLeft={() => <ShoppingCart size={20} weight="bold" color="white" />}
        >
          Add to Cart
        </Button>
      </Layout>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000} // Auto dismiss after 3 seconds
        action={{
          label: 'View Cart', // Label for the button
          onPress: () => {
            router.push('/cart'); // Navigate to the cart screen
          },
        }}
        style={styles.snackbar} // Apply custom style here
      >
        Product added to cart!
      </Snackbar>
    </>
  );
};


const styles = StyleSheet.create({
  viewPager: {
    height: 300,
    padding: 15,
    width: '100%'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'cover',
    borderColor: 'gainsboro'
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: -30,
    backgroundColor: 'transparent'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginHorizontal: 4,
    marginTop: -50,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 20,
  },
  content: {
    // padding: 16,
  },
  infoCard: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTitle: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  soldText: {
    fontSize: 11,
    backgroundColor: 'gainsboro',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginRight: 15,
  },
  bottomTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: 'gainsboro',
  },
  price: {
    marginTop: 8,
    color: '#d32f2f',
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
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
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorBox: {
    borderColor: '#000',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  sizeBox: {
    width: 70,
    padding: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Skeleton Styles
  skeletonContainer: {
    padding: 16,
    height: '100%'
  },
  skeletonImage: {
    height: 300,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 20,
  },
  skeletonDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  skeletonDot: {
    width: 8,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skeletonInfoContainer: {
    marginBottom: 20,
  },
  skeletonTitle: {
    height: 25,
    width: '80%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonRating: {
    height: 15,
    width: '50%',
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
    borderRadius: 5,
  },
  skeletonDescription: {
    height: 15,
    width: '90%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonColors: {
    height: 30,
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonSizes: {
    height: 30,
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 5,
  },
  skeletonBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  skeletonPrice: {
    height: 25,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  skeletonButton: {
    height: 40,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  table: {
    marginVertical: 10,
    // padding: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 5,
    // paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  altRow: {
    backgroundColor: '#f9f9f9',
  },
  key: {
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    backgroundColor: 'gainsboro',
    marginRight: 10,
    padding: 5
  },
  value: {
    flex: 1,
    padding: 5,
    fontSize: 14,
    textAlign: 'left',
  },
  snackbar: {
    backgroundColor: 'green',
    bottom: 75,
    // margin:'auto'
    // flex:1,
    // position: 'absolute' // Change the background color to green
  },
});

export default ProductDetailsScreen;
