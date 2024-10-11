import React, { useState } from 'react';
import PaymentOption from '../components/PaymentOptions';
import { View, Keyboard, Text, StyleSheet } from 'react-native';
import { Layout, Input, useTheme } from '@ui-kitten/components';
import { Phone, CheckCircle, Question } from 'phosphor-react-native'; // Import CheckCircle and Question icons
import DraggableButton from '@/components/ConfirmRepay';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

const PaymentOptions = () => {
    const [selected, setSelected] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const theme = useTheme();
    const router = useRouter();
    const { amount, orderId } = useLocalSearchParams();

    // Phone number validation
    const validNum = (v) => v.match(/^0(?:75|74|70|78|77|76|3|2)\d{7}$/);

    const handleChange = (val) => {
        setPhoneNumber(val);
        if (val.match(/^0(?:75|74|70|2)/)) {
            setSelected('AIRTEL');
        }
        if (val.match(/^0(?:78|77|76|3)/)) {
            setSelected('MTN');
        }
        if (validNum(val)) {
            Keyboard.dismiss();
        }
    };

    // Check if phone number is valid
    const isPhoneNumberValid = validNum(phoneNumber);

    // Render phone icon on the left
    const renderPhoneAccessoryLeft = () => (
        <Phone size={20} color={theme['color-basic-600']} />
    );

    // Render checkmark or question mark on the right
    const renderPhoneAccessoryRight = () => (
        isPhoneNumberValid ? (
            <CheckCircle size={20} weight='fill' color={theme['color-success-500']} /> // Check icon for valid phone number
        ) : (
            <Question size={20} weight='fill' color={theme['color-basic-600']} /> // Question mark for invalid number
        )
    );

    return (
        <>
            <Appbar.Header style={{ borderColor: 'gainsboro', borderWidth: 1, paddingRight: 15 }}>
                <Appbar.BackAction />
                <Appbar.Content title="Payments" />
                <View style={styles.contactContainer}>
                    <Phone
                        size={24}
                        // color={theme.colors.primary}
                        onPress={() => {
                            // Implement the functionality to contact support
                            console.log('Contact Support: +256123456789');
                        }}
                    />
                    <Text style={styles.contactText} variant="labelLarge">0200922167</Text>
                </View>
            </Appbar.Header>
            <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
                <View>
                    <View
                        style={{
                            height: 100,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme['color-basic-300'],
                            borderWidth: 1,
                            borderColor: theme['color-basic-500'],
                            flexDirection: 'row',
                            borderRadius: 3,
                            marginVertical: 15,
                            padding: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 35,
                                color: theme['color-primary-default'],
                                textAlign: 'center',
                                fontWeight: '600',
                                marginRight: 2,
                            }}>
                            {Number(amount).toLocaleString()} /-
                        </Text>
                    </View>

                    <View style={{ width: '100%', marginVertical: 5 }}>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                width: '100%',
                            }}>
                            <PaymentOption type="MTN" selected={selected === 'MTN'} />
                            <PaymentOption type="AIRTEL" selected={selected === 'AIRTEL'} />
                        </View>
                    </View>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <Input
                        label="Enter your Phone Number"
                        onChangeText={handleChange}
                        keyboardType="phone-pad"
                        placeholder="07## ### ###"
                        accessoryLeft={renderPhoneAccessoryLeft}  // Phone icon on the left
                        accessoryRight={renderPhoneAccessoryRight} // Question mark or checkmark on the right
                    // status={isPhoneNumberValid ? 'success' : 'danger'} // Optional visual feedback
                    />
                </View>

                <View style={{ marginBottom: 30 }}>
                    <DraggableButton
                        onSlideConfirmed={() =>
                            router.push({
                                pathname: 'processing',
                                params: {
                                    orderId,
                                    amount: amount,
                                    msisdn: phoneNumber,
                                },
                            })
                        }
                        disabled={!isPhoneNumberValid}
                    />
                </View>
            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        // padding: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F7F9FC',
        borderTopWidth: 1,
        borderColor: '#E4E9F2',
    },
    totalPrice: {
        fontWeight: 'bold',
    },
    checkoutButton: {
        marginLeft: 16,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactText: {
        marginLeft: 8,
        fontSize: 16,
        // color: 'black',
    },
});

export default PaymentOptions;
