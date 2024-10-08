import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Layout, Text, Card, useTheme, Button } from '@ui-kitten/components';
import { ArrowRight, Flashlight, Heart, Lightning } from 'phosphor-react-native';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';

const TopDeals = () => {
    // Dummy flash sale products
    const theme = useTheme()
    const flashSaleProducts = [
        { id: 1, title: 'Chocolate Cake', discount: 40, image: 'https://via.placeholder.com/100' },
        { id: 2, title: 'Donut Box', discount: 25, image: 'https://via.placeholder.com/100' },
        { id: 3, title: 'Cookies Pack', discount: 30, image: 'https://via.placeholder.com/100' },
        { id: 4, title: 'Cupcake', discount: 35, image: 'https://via.placeholder.com/100' },
        { id: 5, title: 'Pastry', discount: 50, image: 'https://via.placeholder.com/100' },
    ];

    // Render a product card for each product in the flash sale
    const renderProduct = (product) => (
        <View key={product.id} style={{ width: 115, paddingVertical: 0, paddingHorizontal: 4, borderWidth: 0 }}>
            <Image source={{ uri: product.image }} style={{ height: 100, width: '100%', borderRadius: 5, }} />
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }} appearance='hint'> UGX {product.discount}.00000</Text>
            </View>
        </View>
    );

    return (
        <Layout style={{ marginVertical: 10 }}>
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', marginBottom: 5, gap: 5 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>Top Deals</Text>
                </View>
                <Text category="label">
                    <ArrowRight weight='bold' />
                </Text>
            </Layout>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {flashSaleProducts.map((product) => renderProduct(product))}
            </ScrollView>
        </Layout >
    );
};

export default TopDeals;
