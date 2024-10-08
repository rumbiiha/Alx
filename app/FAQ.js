import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, Divider, Input, Tab, TabBar, Text } from '@ui-kitten/components';
import { ArrowLeft, CaretDown } from "phosphor-react-native";

const FAQScreen = ({ navigation }) => {

    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState("");

    const BackAction = () => (
        <TopNavigationAction icon={() => <ArrowLeft size={24} />} onPress={() => navigation.goBack()} />
    );

    const FAQItem = ({ question, answer }) => (
        <Layout style={styles.faqItem}>
            <Text category="s1" style={styles.faqQuestion}>{question}</Text>
            <Text category="p2" appearance="hint">{answer}</Text>
        </Layout>
    );

    // Sample FAQ content based on e-commerce topics
    const faqContent = [
        {
            category: 'General',
            questions: [
                { question: "How do I make a purchase?", answer: "When you find a product you want to purchase, tap on it to view the product details, and then tap the 'Add to Cart' button." },
                { question: "How do I use discount codes?", answer: "During checkout, enter the discount code in the designated box, and the discount will apply if valid." },
            ],
        },
        {
            category: 'Account',
            questions: [
                { question: "How do I create an account?", answer: "Tap on 'Sign Up' and follow the steps to create an account using your email or social login options." },
                { question: "How do I reset my password?", answer: "Go to the login screen and tap 'Forgot Password' to receive instructions on resetting your password." },
            ],
        },
        {
            category: 'Service',
            questions: [
                { question: "How do I track my orders?", answer: "Go to your order history and select the order you want to track to see the latest updates." },
                { question: "Can I cancel or return an order?", answer: "Yes, you can cancel or return an order within a specified time frame after placing it." },
                { question: "What is your return policy?", answer: "Our return policy allows returns within 30 days of purchase, as long as the item is in original condition." },
            ],
        },
        {
            category: 'Payment',
            questions: [
                { question: "What payment methods are accepted?", answer: "We accept credit/debit cards, PayPal, Apple Pay, Google Pay, and more." },
                { question: "Is my payment information secure?", answer: "Yes, we use industry-standard encryption to ensure your payment information is secure." },
            ],
        },
    ];

    // Combine all FAQs into one list for search functionality
    const allFAQs = faqContent.flatMap(category => category.questions);

    // Filtered FAQ based on the search query
    const filteredFAQs = searchQuery 
        ? allFAQs.filter(faq => 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqContent[selectedTabIndex].questions;

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* Tabs */}
            <TabBar selectedIndex={selectedTabIndex} onSelect={index => setSelectedTabIndex(index)}>
                {faqContent.map((item, index) => (
                    <Tab title={item.category} key={index} />
                ))}
            </TabBar>

            {/* Search Bar */}
            <Layout style={styles.searchBar}>
                <Input
                    placeholder="Search for questions..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    accessoryRight={() => <CaretDown size={20} />}
                />
            </Layout>
            <Divider style={{
                height: 1,
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.25, 
                shadowRadius: 3.84, 
                elevation: 3,
            }} />

            {/* FAQs */}
            <ScrollView style={styles.container}>
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))
                ) : (
                    <Text category="p1" style={{textAlign: 'center', marginTop: 20}}>
                        No results found.
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    searchBar: {
        padding: 16,
        backgroundColor: '#fff',
    },
    faqItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E9F2',
    },
    faqQuestion: {
        marginBottom: 8,
    },
});

export default FAQScreen;
