import { useRouter } from "expo-router";
import { MagnifyingGlass } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const NoProductsFound = () => {
    const router = useRouter();
    return (
        <View style={styles.noProductsContainer}>
            <MagnifyingGlass size={48} color="#ccc" />
            <Text category="h6" appearance='hint' style={styles.noProductsText}>
                Sorry, there are no products available in this category at the moment.
            </Text>
            <Button onPress={() => router.push('category')} style={styles.exploreButton}>
                Explore More
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 'auto'
    },
    noProductsText: {
        marginVertical: 10,
        textAlign: 'center',
        fontWeight: 'normal'
    },
    exploreButton: {
        marginTop: 10,
    },
});

export default NoProductsFound;
