import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text, ViewPager, Button, Spinner, useTheme, TopNavigationAction } from '@ui-kitten/components';
import { useGetProductQuery } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ShoppingCart, Star, Check } from 'phosphor-react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import ProductDetailsSkeleton from '../../components/loading/ProductDetailsSkeleton';


const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
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

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, selectedColor, selectedSize }));
  };

  const CartIconWithBadge = () => (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <View style={styles.cartIconContainer}>
        <ShoppingCart size={24} color={theme['color-primary-500']} />
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
      <Stack.Screen
        options={{
          title: 'Product Details',
          headerRight: () => <TopNavigationAction icon={CartIconWithBadge} />,
        }}
      />
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

            <View style={{ marginBottom: 10 }}>
              <Text category="s2" style={{ fontWeight: 'bold', marginBottom: 3 }}>
                Description
              </Text>
              <Text style={{ marginVertical: 3 }}>{product?.description}</Text>
            </View>

            {product?.specs && (
              <View>
                <Text category="s2" style={{ fontWeight: 'bold' }}>
                  Specifications
                </Text>
                <Layout style={[styles.table, { borderColor: theme['color-basic-400'] }]}>
                  {product.specs.map((spec, index) => (
                    <View key={index} style={[styles.row, index % 2 === 0 && { backgroundColor: theme['color-basic-200'] }]}>
                      <Text style={styles.key}>{spec.key}</Text>
                      <Text style={styles.value}>{spec.value}</Text>
                    </View>
                  ))}
                </Layout>
              </View>
            )}

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
                        selectedSize === size && { borderColor: theme['color-primary-default'] },
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text style={selectedSize === size && { color: theme['color-primary-default'] }}>{size}</Text>
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
            {`UGX ${(product?.price / 100).toLocaleString()}`}
          </Text>
        </View>
        <Button
          style={styles.tabButton}
          // disabled={!selectedColor.colorCode || !selectedSize}
          accessoryLeft={() => <ShoppingCart size={20} weight="bold" color="white" />}
          onPress={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    height: 300,
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
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginHorizontal: 4,
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  altRow: {
    backgroundColor: '#f9f9f9',
  },
  key: {
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});

export default ProductDetailsScreen;
