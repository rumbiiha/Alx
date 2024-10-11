const { View, Image } = require('react-native');
import { Text,StyleSheet, useTheme } from '@ui-kitten/components';


const SkeletonLoader = () => {
    const theme = useTheme();
    return (
        <SafeAreaView style={styles.safeArea}>
            <Layout style={styles.container}>
                <ScrollView contentContainerStyle={styles.productsContainer}>
                    {[...Array(6)].map((_, index) => (
                        <View style={styles.skeletonCard}>
                            <View key={index} style={[styles.skeletonImageContainer, { backgroundColor: theme['color-basic-400'] }]}>
                                <Image
                                    source={require('@/assets/placeholder.png')}
                                    style={styles.skeletonImage}
                                />
                            </View>
                            <View style={[styles.skeletonText, { backgroundColor: theme['color-basic-400'] }]} />
                            <View style={[styles.skeletonTextSmall, { backgroundColor: theme['color-basic-400'] }]} />
                            <View style={[styles.skeletonPrice, { backgroundColor: theme['color-basic-400'] }]} />
                        </View>
                    ))}
                </ScrollView>
            </Layout>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
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
});

export default SkeletonLoader;