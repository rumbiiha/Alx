import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View, StyleSheet } from 'react-native';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { Lightning } from 'phosphor-react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

// Countdown Timer Logic
const calculateTimeLeft = (expiryDate) => {
  const difference = new Date(expiryDate) - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'), // Format hours
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'), // Format minutes
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'), // Format seconds
    };
  } else {
    // If time is up, set all values to "00"
    timeLeft = {
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  return timeLeft;
};

// Digital Clock Style Component
const FlipClockDigit = ({ digit }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(360, {
      duration: 500,
      easing: Easing.linear,
    });
  }, [digit]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View style={[styles.flipDigit, animatedStyle]}>
      <Text style={styles.digitText}>{digit}</Text>
    </Animated.View>
  );
};

const FlashSale = () => {
  const theme = useTheme();
  const flashSaleProducts = [
    { id: 1, title: 'Chocolate Cake', discount: 40, image: require('../../assets/placeholder.png') },
    { id: 2, title: 'Donut Box', discount: 25, image: require('../../assets/placeholder.png') },
    { id: 3, title: 'Cookies Pack', discount: 30, image: require('../../assets/placeholder.png') },
    { id: 4, title: 'Cupcake', discount: 35, image: require('../../assets/placeholder.png') },
    { id: 5, title: 'Pastry', discount: 50, image: require('../../assets/placeholder.png') },
  ];

  const expiryDate = '2024-11-01T23:59:59'; // Replace with actual expiry date
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Render a product card for each product in the flash sale
  const renderProduct = (product) => (
    <View key={product.id} style={styles.productContainer}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productPrice}>UGX {product.discount}.00000</Text>
        <Text style={styles.productSold}>240 sold</Text>
      </View>
    </View>
  );

  return (
    <Layout style={styles.layout}>
      {/* Flash Sale Header with Countdown */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconWrapper, { backgroundColor: theme['color-primary-default'] }]}>
            <Lightning color="white" weight="fill" size={25} />
          </View>
          <View>
            <Text style={styles.flashSaleTitle}>Flash Sale</Text>
            <Text style={styles.flashSaleSubtitle}>Limited time offer.</Text>
          </View>
        </View>
        <View style={styles.countdown}>
          <FlipClockDigit digit={timeLeft.hours} />
          <Text style={styles.colon}>:</Text>
          <FlipClockDigit digit={timeLeft.minutes} />
          <Text style={styles.colon}>:</Text>
          <FlipClockDigit digit={timeLeft.seconds} />
        </View>
      </View>

      {/* Horizontal Scrollable Products */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {flashSaleProducts.map(renderProduct)}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconWrapper: {
    padding: 4,
    borderRadius: 10,
    marginLeft: 7,
  },
  flashSaleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flashSaleSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flipDigit: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    marginHorizontal: 2,
  },
  digitText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'digital7', // Make sure to link your digital font
  },
  colon: {
    fontSize: 24,
    color: 'black',
    marginHorizontal: 2,
  },
  productContainer: {
    width: 115,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  productImage: {
    height: 100,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#ddd',
  },
  productDetails: {
    gap: 3,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
  },
  productSold: {
    fontSize: 10,
    color: '#555',
  },
});

export default FlashSale;
