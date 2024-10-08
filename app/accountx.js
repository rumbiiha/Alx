import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import { Text, Layout, Divider, Modal, Button, Card, ListItem } from '@ui-kitten/components';
import { ArrowLeft, BellRinging, Cube, User, House, Question, Headphones, SignOut, CaretRight, WarningCircle } from "phosphor-react-native";
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const data = [
    { title: 'My Orders', icon: (props) => <Cube size={20} {...props} />, route: 'orders' },
    { title: 'My Details', icon: (props) => <User size={20} {...props} />, route: 'MyDetails' },
    { title: 'Address Book', icon: (props) => <House size={20} {...props} />, route: 'addressBook' },
    { title: 'Notifications', icon: (props) => <BellRinging size={20} {...props} />, route: 'notifications' },
    { title: 'FAQs', icon: (props) => <Question size={20} {...props} />, route: 'FAQ' },
    { title: 'Help Center', icon: (props) => <Headphones size={20} {...props} />, route: 'help' },
    { title: 'Logout', icon: (props) => <SignOut size={20} color='red' {...props} />, style: { color: 'red' }, route: 'Logout' },
  ];

  const renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      accessoryLeft={item.icon}
      accessoryRight={(props) => <CaretRight size={16} {...props} />}
      style={[styles.listItem, item.route === 'Logout' && styles.logoutItem]}
      onPress={() => {
        if (item.route === 'Logout') {
          setVisible(true);
        } else {
          // Handle navigation
          router.push(item.route);
        }
      }}
    />
  );

  const handleLogout = () => {
    // Logout logic (clear user data and redirect to login)
    AsyncStorage.removeItem('@user'); // Clear user data
    setVisible(false);
    router.push('login'); // Redirect to login screen
  };

  return (
    <Layout style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.section}>
        <FlatList
          data={[data[0]]} // First item (My Orders)
          renderItem={renderItem}
          keyExtractor={(item) => item.route}
          ItemSeparatorComponent={Divider}
        />
      </View>

      <View style={styles.section}>
        <FlatList
          data={data.slice(1, 4)} // My Details to Notifications
          renderItem={renderItem}
          keyExtractor={(item) => item.route}
          ItemSeparatorComponent={Divider}
        />
      </View>

      <View style={styles.section}>
        <FlatList
          data={data.slice(4, 6)} // FAQs and Help Center
          renderItem={renderItem}
          keyExtractor={(item) => item.route}
          ItemSeparatorComponent={Divider}
        />
      </View>

      <View style={{ ...styles.section, borderBottomWidth: 0 }}>
        <FlatList
          data={[data[6]]} // Logout
          renderItem={renderItem}
          keyExtractor={(item) => item.route}
          ItemSeparatorComponent={Divider}
        />
      </View>

      {/* Logout confirmation modal */}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={styles.modalCard}>
          <WarningCircle size={40} color='red' weight='fill' style={styles.warningIcon} />
          <Text category='h6' style={styles.modalTitle}>Logout?</Text>
          <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
          <Button style={styles.yesButton} status='danger' onPress={handleLogout}>
            Yes, Logout
          </Button>
          <Button style={styles.noButton} appearance='outline' onPress={() => setVisible(false)}>
            No, Cancel
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 7,
    borderBottomColor: '#E6E6E6',
  },
  listItem: {
    backgroundColor: 'white',
    borderWidth: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutItem: {
    color: 'red',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: '90%',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  warningIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#8F9BB3',
  },
  yesButton: {
    marginBottom: 8,
    width: '100%',
  },
  noButton: {
    width: '100%',
  },
});

export default Account;
