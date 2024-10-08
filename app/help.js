import React from 'react';
import { SafeAreaView, StyleSheet, Linking, View } from 'react-native';
import { Layout, List, ListItem, Divider, Text, Card } from '@ui-kitten/components';
import { WhatsappLogo, Globe, Phone, MapPin, Envelope } from "phosphor-react-native"; // Import Envelope icon

const HelpCenterScreen = () => {
  const data = [
    {
      title: 'WhatsApp',
      meta: 'Chat with us on WhatsApp', // Meta text for WhatsApp
      icon: () => <WhatsappLogo size={24} color="#25D366" />,
      onPress: () => Linking.openURL('https://wa.me/256758307272') // Opens WhatsApp chat
    },
    {
      title: 'Website',
      meta: 'Visit our official website', // Meta text for Website
      icon: () => <Globe size={24} color="#007bff" />,
      onPress: () => Linking.openURL('https://alx.ug') // Opens the website
    }
  ];

  const contactDetails = [
    { label: 'Customer Support', number: '+256 123 456 789', email: 'support@alx.ug' },
    { label: 'Technical Support', number: '+256 987 654 321', email: 'tech@alx.ug' },
  ];

  const renderItem = ({ item }) => (
    <Layout style={styles.listItem}>
      <ListItem
        title={item.title}
        accessoryLeft={item.icon}
        onPress={item.onPress} // Handle the item press
        titleStyle={styles.listItemTitle}
      />
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>{item.meta}</Text>
      </View>
    </Layout>
  );

  const renderContactItem = ({ label, number, email }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <View style={{flexDirection:'row'}}>
          <Phone size={20} color="#007bff" />
          <Text style={styles.contactText}>{label}: </Text>
        </View>
        <Text style={styles.contactNumber} appearance='hint'>{number}</Text>
      </View>
      <View style={styles.contactInfo}>
        <View style={{flexDirection:'row'}}>
          <Envelope size={20} color="#007bff" />
          <Text style={styles.contactText}> Email: </Text>
        </View>
        <Text style={styles.contactNumber} appearance='hint' onPress={() => Linking.openURL(`mailto:${email}`)}>
          {email}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Divider />
      <Layout style={styles.container}>
        <Card style={styles.contactCard}>
          <Text category="h6" style={styles.contactCardTitle}>Contact Center</Text>
          {contactDetails.map(contact => renderContactItem(contact))}
        </Card>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    // padding: 16,
  },
  listItem: {
    paddingVertical: 16,
  },
  listItemTitle: {
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginLeft: 15,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
    flex: 1,
  },
  contactCard: {
    // marginTop: 20,
    padding: 16,
    borderRadius: 10,
  },
  contactCardTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  contactItem: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingVertical: 8,
    justifyContent: 'space-between', // Space between phone and email
  },
  contactInfo: {
    flexDirection: 'column',
    // alignItems: 'center',
    flex: 1,
    marginVertical:10,
  },
  contactText: {
    fontWeight: '500',
    color: '#333',
  },
  contactNumber: {
    // color: '#007bff',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    marginLeft: 4,
    color: '#333',
  },
});

export default HelpCenterScreen;
