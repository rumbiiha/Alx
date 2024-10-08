import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Animated, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  { id: '1', title: 'Item 1', image: '../assets/banner.png' },
];

const CarouselComponent = () => {


  // const renderItem = ({ item }) => (

  // );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: '100%', backgroundColor: '#082136' }}>

      </View>
      <View style={{ width: 100, height: '100%', backgroundColor: 'gray' }}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: -40,
    height: 560,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  item: {
    width: viewportWidth,
    height: 160,
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CarouselComponent;
