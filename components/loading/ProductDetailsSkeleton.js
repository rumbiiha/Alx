import React from 'react';
import { Image, StyleSheet, View} from 'react-native';
import { Layout,useTheme } from '@ui-kitten/components';


const ProductDetailsSkeleton = () => {
    const theme = useTheme(); // Get the theme object from useTheme()
  
    return (
      <Layout style={styles.skeletonContainer}>
        {/* Image Skeleton */}
        <View style={[styles.skeletonImage, { backgroundColor: theme['color-basic-400'] }]} />
  
        {/* Dots Indicator Skeleton */}
        <View style={styles.skeletonDotsContainer}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={[styles.skeletonDot, { backgroundColor: theme['color-basic-400'] }]} />
          ))}
        </View>
        <Layout style={{flex:1}}>
  
        {/* Info Skeleton */}
        <View style={styles.skeletonInfoContainer}>
          <View style={[styles.skeletonTitle, { backgroundColor: theme['color-basic-400'] }]} />
          <View style={[styles.skeletonRating, { backgroundColor: theme['color-basic-400'] }]} />
          <View style={[styles.skeletonRating, { backgroundColor: theme['color-basic-400'] }]} />
        </View>
  
        {/* Description Skeleton */}
        <View style={[styles.skeletonDescription, { backgroundColor: theme['color-basic-400'] }]} />
        <View style={[styles.skeletonDescription, { backgroundColor: theme['color-basic-400'] }]} />
  
        {/* Color and Size Skeleton */}
        <View style={[styles.skeletonColors, {width: "40%", backgroundColor: theme['color-basic-400'] }]} />
        <View style={[styles.skeletonSizes, {width: "80%", backgroundColor: theme['color-basic-400'] }]} />
        <View style={[styles.skeletonColors, {width: "60%", backgroundColor: theme['color-basic-400'] }]} />
        <View style={[styles.skeletonSizes, {width: "80%", backgroundColor: theme['color-basic-400'] }]} />
        </Layout>
        {/* Price and Button Skeleton */}
        <Layout style={[styles.bottomTabsContainer,{paddingHorizontal:0}]}>
          <View style={[styles.skeletonPrice, { backgroundColor: theme['color-basic-400'] }]} />
          <View style={[styles.skeletonButton, { backgroundColor: theme['color-basic-400'] }]} />
        </Layout>
      </Layout>
    );
  };


  const styles = StyleSheet.create({
    bottomTabsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderTopWidth: 1,
      borderColor: 'gainsboro',
    },
    // Skeleton Styles
    skeletonContainer: {
      padding: 16,
      height:'100%'
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
  });

export default ProductDetailsSkeleton;
