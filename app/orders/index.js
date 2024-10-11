import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme } from '@ui-kitten/components';
import { useGetOrdersQuery } from '@/api'; // Adjust the path to your API file
import { useRouter } from 'expo-router';
import { Appbar, Divider } from 'react-native-paper';
import { CheckCircle, XCircle, Truck, Clock, CurrencyDollarSimple, ArrowCounterClockwise, ClockCountdown, WarningDiamond, WarningCircle } from 'phosphor-react-native';

const activityTypeEnum = {
    'Awaiting Payment': { type: 'Awaiting Payment', description: 'The order has been created.', color: '#FF9800', icon: <Clock size={20} color="#FF9800" /> },
    'Payment Failed': { type: 'Payment Failed', description: 'The order has been created.', color: 'red', icon: <WarningCircle size={20} color="red" /> },
    ORDER_CREATED: { type: 'ORDER_CREATED', description: 'The order has been created.', color: '#2196F3', icon: <ClockCountdown size={20} color="#2196F3" /> },
    PAYMENT_SUCCESS: { type: 'PAYMENT_SUCCESS', description: 'Payment was successful.', color: '#4CAF50', icon: <CheckCircle size={20} color="#4CAF50" /> },
    PAYMENT_FAILED: { type: 'PAYMENT_FAILED', description: 'Payment failed.', color: '#F44336', icon: <XCircle size={20} color="#F44336" /> },
    PROCESSING: { type: 'PROCESSING', description: 'Your order is being processed.', color: '#FF9800', icon: <Clock size={20} color="#FF9800" /> },
    ORDER_CANCELLED: { type: 'ORDER_CANCELLED', description: 'The order was cancelled.', color: '#F44336', icon: <XCircle size={20} color="#F44336" /> },
    ORDER_SHIPPED: { type: 'ORDER_SHIPPED', description: 'The order has been shipped.', color: '#2196F3', icon: <Truck size={20} color="#2196F3" /> },
    ORDER_DELIVERED: { type: 'ORDER_DELIVERED', description: 'The order has been delivered.', color: '#4CAF50', icon: <CheckCircle size={20} color="#4CAF50" /> },
    ORDER_COMPLETED: { type: 'ORDER_COMPLETED', description: 'The order has been completed.', color: '#4CAF50', icon: <CheckCircle size={20} color="#4CAF50" /> },
    REFUND_REQUESTED: { type: 'REFUND_REQUESTED', description: 'A refund has been requested.', color: '#FF9800', icon: <ArrowCounterClockwise size={20} color="#FF9800" /> },
    REFUND_COMPLETED: { type: 'REFUND_COMPLETED', description: 'The refund has been completed.', color: '#4CAF50', icon: <CurrencyDollarSimple size={20} color="#4CAF50" /> },
};

const OrderCard = ({ order }) => {
    const theme = useTheme();
    const router = useRouter();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    // Function to get color and icon based on the order status
    const getStatusStyle = (status) => {
        console.log('=====', status)
        const statusEnum = activityTypeEnum[status] || {};
        return {
            color: statusEnum.color || '#000',
            icon: statusEnum.icon || null,
            description: statusEnum.description || 'Unknown Status',
        };
    };

    const statusInfo = getStatusStyle(order.status);

    return (
        <Card style={[styles.card, { borderColor: theme['color-basic-600'] }]}>
            <View style={styles.cardHeader}>
                <Text category='s1' style={styles.orderNumber}>Order № #{order._id?.slice(-7)}</Text>
                <Text category='c1' appearance='hint' style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
            </View>
            
            <View style={styles.cardDetails}>
                <Text category='c1'>Quantity: <Text category='c1' style={styles.boldText}>{order.items[0].quantity}</Text></Text>
                <Text category='c1'>Total Amount: <Text category='c1' style={styles.boldText}>{order.total} UGX</Text></Text>
            </View>

            <View style={styles.cardDetails}>
                <Text category='c1'>Payment Type: <Text category='c1' style={styles.boldText}>{order.paymentType}</Text></Text>
                <Text category='c1'>Paid: <Text category='c1' style={styles.boldText}>{order.paid ? 'Yes' : 'No'}</Text></Text>
            </View>

            <View style={styles.cardFooter}>
                <Button onPress={() => router.push({
                    pathname: `orders/${order._id}`,
                })} size='small'>Details</Button>
                <View style={styles.statusContainer}>
                    {statusInfo.icon}
                    <Text category='c1' style={[styles.status, { color: statusInfo.color }]}>{order.status}</Text>
                </View>
            </View>
        </Card>
    );
};

const OrdersScreen = () => {
    const router = useRouter();
    const { data: ordersData, isLoading, isError } = useGetOrdersQuery(); // Fetch orders dynamically

    if (isLoading) return <Text>Loading...</Text>;
    if (isError) return <Text>Error fetching orders</Text>;

    const orders = ordersData.data || [];

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.push('account')} />
                <Appbar.Content title="Orders" />
            </Appbar.Header>
            <Divider />
            <ScrollView style={styles.container}>
                {orders.length > 0 ? (
                    orders.map((order) => <OrderCard key={order._id} order={order} />)
                ) : (
                    <Text category='h5' style={styles.noOrdersText}>No Orders Available</Text>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: '#FFFFFF',
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        fontWeight: '700',
        marginLeft: 8,
    },
    noOrdersText: {
        textAlign: 'center',
        marginTop: 16,
        color: '#8F9BB3',
    }
});

export default OrdersScreen;
