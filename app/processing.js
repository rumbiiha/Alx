import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import SpinSVG from '@/components/Spinner'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Layout, useTheme } from '@ui-kitten/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMakePaymentMutation } from '../api'

const DepositProcessing = () => {
    const theme = useTheme(); // Access the theme colors
    const { amount, msisdn } = useLocalSearchParams();
    const [payNow] = useMakePaymentMutation()
    const router = useRouter()


    const fetchData = async () => {
        try {
            payNow({ amount, msisdn })
        } catch (error) {
            // return displayErrorNotification()
            console.log('error.message===', error.message)
        }
    }


    useEffect(() => {
        fetchData()
    }, [amount, msisdn])


    return (
        <Layout style={{ flex: 1 }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    padding: 10,
                }}>
                <View style={{ margin: 'auto', padding: 20 }}>
                    <View style={{ paddingVertical: 6, marginBottom: 20 }}>
                        <SpinSVG />
                    </View>
                    {/* Updated to use theme for text color */}
                    <Text style={{ fontSize: 20, marginBottom: 20, color: theme['text-basic-color'], textAlign: 'center' }}>
                        Waiting for you to Complete
                    </Text>
                    {/* Kept hardcoded colors where necessary */}
                    <Text style={{ textAlign: 'center', color: theme['text-hint-color'] }}>
                        Confirmation Prompt has been sent to{' '}
                        <Text style={{ color: theme['text-basic-color'], fontWeight: 'bold' }}>
                            {msisdn}
                        </Text>{' '}
                        Enter your PIN to confirm or Press{' '}
                        <Text style={{ color: theme['text-basic-color'], fontWeight: 'bold' }}>
                            *165#
                        </Text>
                    </Text>
                </View>
            </View>
            <SafeAreaView style={{ width: '100%' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#e5e7eb', // Kept hardcoded color for background
                        width: '100%',
                        padding: 15,
                        gap: 3,
                        alignItems: 'center',
                    }}>
                    {/* Updated to use theme for text color */}
                    <Text style={{ textAlign: 'center', color: theme['text-hint-color'] }}>
                        Don't press Back or close the app during this state.
                    </Text>
                </View>
            </SafeAreaView>
        </Layout>
    )
}

export default DepositProcessing
