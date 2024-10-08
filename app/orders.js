import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Card, Button, Tab, TabView } from '@ui-kitten/components';
import { useRouter } from 'expo-router';

// Dummy order data
const orders = [
    {
        id: '1',
        orderNumber: '1947034',
        trackingNumber: 'IW3475453455',
        quantity: 3,
        totalAmount: 112,
        date: '05-12-2019',
        status: 'Delivered',
    },
    {
        id: '2',
        orderNumber: '1947035',
        trackingNumber: 'IW3475453456',
        quantity: 2,
        totalAmount: 90,
        date: '05-12-2019',
        status: 'Delivered',
    },
    {
        id: '3',
        orderNumber: '1947036',
        trackingNumber: 'IW3475453457',
        quantity: 1,
        totalAmount: 45,
        date: '05-12-2019',
        status: 'Delivered',
    },
];

// Reusable Order Card Component
const OrderCard = ({ order }) => {
    const router = useRouter()
    return (<Card style={styles.card}>
        <View style={styles.cardHeader}>
            <Text category='s1' style={styles.orderNumber}>Order №{order.orderNumber}</Text>
            <Text category='c1' appearance='hint' style={styles.orderDate}>{order.date}</Text>
        </View>
        <Text category='c1' style={styles.trackingText}>Tracking number: <Text category='c1' style={styles.boldText}>{order.trackingNumber}</Text></Text>
        <View style={styles.cardDetails}>
            <Text category='c1'>Quantity: <Text category='c1' style={styles.boldText}>{order.quantity}</Text></Text>
            <Text category='c1'>Total Amount: <Text category='c1' style={styles.boldText}>{order.totalAmount}$</Text></Text>
        </View>
        <View style={styles.cardFooter}>
            <Button style={styles.detailsButton} size='small' appearance='outline'>Details</Button>
            <Text category='c1' style={styles.status}>{order.status}</Text>
        </View>
    </Card>)
};

const OrdersScreen = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerShown: false,
    //     })
    // }, [navigation])

    // Dynamically render the content for each tab
    const renderOrders = (status) => {
        return orders
            .filter(order => order.status === status)
            .map(order => <OrderCard key={order.id} order={order} />);
    };

    return (
        <Layout style={styles.container}>
            <TabView
                selectedIndex={selectedIndex}
                // shouldLoadComponent={shouldLoadComponent}
                onSelect={index => setSelectedIndex(index)}
            >
                <Tab title='Delivered'>
                    <Layout style={styles.ordersList}>
                        {renderOrders('Delivered')}
                    </Layout>
                </Tab>
                <Tab title='Processing'>
                    <Layout style={styles.ordersList}>
                        <Text category='h5' style={styles.noOrdersText}>No Processing Orders</Text>
                    </Layout>
                </Tab>
                <Tab title='Cancelled'>
                    <Layout style={styles.ordersList}>
                        <Text category='h5' style={styles.noOrdersText}>No Cancelled Orders</Text>
                    </Layout>
                </Tab>
            </TabView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 18,
    },
    ordersList: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 8,
        height: 500
    },
    card: {
        marginBottom: 16,
        backgroundColor: '#FFF',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderNumber: {
        fontWeight: '700',
    },
    orderDate: {
        color: '#8F9BB3',
    },
    trackingText: {
        marginBottom: 8,
    },
    boldText: {
        fontWeight: '700',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    detailsButton: {},
    status: {
        color: 'green',
        fontWeight: '700',
    },
    noOrdersText: {
        textAlign: 'center',
        marginTop: 16,
        color: '#8F9BB3',
    },
});

export default OrdersScreen;
