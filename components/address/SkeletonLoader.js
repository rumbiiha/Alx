// SkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '@ui-kitten/components';

const SkeletonLoader = () => (
  <Card style={[styles.addressItem, { opacity: 0.5 }]}>
    <View style={styles.skeletonLine} />
    <View style={styles.skeletonLine} />
    <View style={styles.skeletonLine} />
  </Card>
);

const styles = StyleSheet.create({
  skeletonLine: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default SkeletonLoader;
