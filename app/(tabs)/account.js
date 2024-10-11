import React from 'react';
import { Layout, Text, Button, Divider, useTheme } from '@ui-kitten/components';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Heart, Clock, House, Headset, User, HourglassSimple, Truck, FileText, Repeat } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import Timer from '@/assets/icons/Timer';
import Transit from '@/assets/icons/Transit';

export default function Component() {
  const router = useRouter();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme['background-basic-color-2'],
    },
    headerContainer: {
      paddingVertical: 16,
      height: 100,
      alignItems: 'center',
      backgroundColor: theme['color-primary-500'],
    },
    loginButton: {
      borderRadius: 20,
      width: 200,
      backgroundColor: theme['color-primary-100'],
      borderColor: theme['color-primary-500'],
      marginTop: -20,
      zIndex: 1,
      alignSelf: 'center',
    },
    loginButtonText: {
      color: theme['color-primary-700'],
      fontWeight: 'bold',
    },
    sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: theme['text-basic-color'],
    },
    viewAllButton: {
      fontSize: 14,
    },
    orderStatusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
    },
    orderItem: {
      alignItems: 'center',
      width: '23%',
    },
    orderText: {
      marginTop: 8,
      flexWrap: 'wrap',
      textAlign: 'center',
      fontSize: 12,
      color: theme['text-hint-color'],
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 16,
    },
    optionText: {
      fontSize: 14,
      color: theme['text-basic-color'],
    },
    cardContainer: {
      backgroundColor: theme['background-basic-color-1'],
      borderRadius: 8,
      marginBottom: 10,
      padding: 15,
      shadowColor: theme['color-basic-transparent-300'],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

  return (
    <Layout style={styles.container}>
      <Layout style={styles.headerContainer} />
      <Button
        style={styles.loginButton}
        textStyle={styles.loginButtonText}
        onPress={() => router.push('/login')}
      >
        LOGIN / REGISTER
      </Button>

      <View style={styles.cardContainer}>
        <Layout style={styles.sectionContainer}>
          <Text category="h6" style={styles.sectionTitle}>
            My Orders
          </Text>
          <Button appearance="ghost" style={styles.viewAllButton}>
            View All
          </Button>
        </Layout>
        <View style={styles.orderStatusContainer}>
          <View style={styles.orderItem}>
            <Timer size={35} primaryColor={theme['color-primary-default']} color={theme['text-basic-color']} />
            <Text style={styles.orderText}>Pending Payment</Text>
          </View>
          <View style={styles.orderItem}>
            <Transit primaryColor={theme['color-primary-default']} size={35} color={theme['text-basic-color']} />
            <Text style={styles.orderText}>In Transit</Text>
          </View>
          <View style={styles.orderItem}>
            <FileText size={35} color={theme['text-basic-color']} />
            <Text style={styles.orderText}>Pending Feedback</Text>
          </View>
          <View style={styles.orderItem}>
            <Repeat size={35} color={theme['text-basic-color']} />
            <Text style={styles.orderText}>Return & Refund</Text>
          </View>
        </View>
      </View>

      <Divider />

      <View style={styles.cardContainer}>
        <View style={styles.optionItem}>
          <Heart size={24} weight="fill" color={theme['text-basic-color']} />
          <Text style={styles.optionText}>Wish List</Text>
        </View>
        <View style={styles.optionItem}>
          <Clock size={24} weight="fill" color={theme['text-basic-color']} />
          <Text style={styles.optionText}>Recently Viewed</Text>
        </View>
      </View>

      <ScrollView style={styles.cardContainer}>
        <View style={styles.optionItem}>
          <House size={24} weight="fill" color={theme['text-basic-color']} />
          <Text style={styles.optionText}>Address Management</Text>
        </View>
        <View style={styles.optionItem}>
          <Headset size={24} weight="fill" color={theme['text-basic-color']} />
          <Text style={styles.optionText}>Service Center</Text>
        </View>
        <View style={styles.optionItem}>
          <User size={24} weight="fill" color={theme['text-basic-color']} />
          <Text style={styles.optionText}>Invite Friend</Text>
        </View>
      </ScrollView>
    </Layout>
  );
}