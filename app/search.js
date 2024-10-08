import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import { MagnifyingGlass } from 'phosphor-react-native';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([
        'Snake Skin Bag',
        'Casual Shirt',
        'Black Nike Shoes',
        'Airtight Microphone',
        'Headphones White',
        'Nikon Camera',
        'Silver Watch',
        'Kitchen Appliances',
    ]);

    const handleDeleteSearch = (item) => {
        setRecentSearches(recentSearches.filter(search => search !== item));
    };

    const handleClearAll = () => {
        setRecentSearches([]);
    };

    return (
        <Layout style={styles.container}>
            {/* Search Input */}
            <View style={styles.searchBar}>
                <Input
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search..."
                    accessoryLeft={() => <MagnifyingGlass size={20} color="gray" />}
                />
                <Button appearance='ghost' style={styles.filterButton}>
                    <Icon name="funnel" />
                </Button>
            </View>

            {/* Recent Searches */}
            <View style={styles.recentContainer}>
                <Text category='h6'>Recent</Text>
                <Button appearance='ghost' size='tiny' onPress={handleClearAll}>
                    Clear All
                </Button>
            </View>

            <ScrollView style={styles.scrollView}>
                {recentSearches.map((item, index) => (
                    <View key={index} style={styles.searchItem}>
                        <Text style={styles.searchText}>{item}</Text>
                        <TouchableOpacity onPress={() => handleDeleteSearch(item)}>
                            <Icon style={styles.deleteIcon} fill="gray" name="close-outline" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        marginRight: 8,
    },
    filterButton: {
        paddingHorizontal: 8,
    },
    recentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    scrollView: {
        marginBottom: 16,
    },
    searchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    searchText: {
        fontSize: 16,
    },
    deleteIcon: {
        width: 24,
        height: 24,
    },
});

export default SearchScreen;
