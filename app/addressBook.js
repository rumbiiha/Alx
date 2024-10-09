import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import { Button, Layout, Text, IndexPath } from '@ui-kitten/components';
import { useCreateAddressMutation, useGetAddressQuery, useUpdateAddressMutation } from '../api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCountryByShort } from 'countrycitystatejson';
import AddressItem from '@/components/address/AddressItem';
import AddressModal from '@/components/address/AddressModal';
import SkeletonLoader from '@/components/address/SkeletonLoader';

const AddressComponent = () => {
  const { data: fetchedAddresses, error: fetchError, isLoading: isFetching, refetch } = useGetAddressQuery();
  const [createAddress, { error: createError, isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { error: updateError, isLoading: isUpdating }] = useUpdateAddressMutation();
  const { edit } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    addressName: '',
    city: '',
    region: '',
    addressLabel: 'Home',
    mainAddress: false,
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedMainAddressId, setSelectedMainAddressId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // Determines whether we're in update mode or not

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setForm((prevForm) => ({
          ...prevForm,
          phoneNumber: parsedData.user.phoneNumber || '',
          email: parsedData.user.email || '',
          name: parsedData.user.name || '',
        }));
      }
    } catch (error) {
      console.error('Error loading user data from local storage:', error);
    }
  };

  useEffect(() => {
    loadUserData();
    const loadMainAddress = async () => {
      const savedAddress = await AsyncStorage.getItem('selectedAddress');
      if (savedAddress) {
        const parsedAddress = JSON.parse(savedAddress);
        setSelectedMainAddressId(parsedAddress._id);
      }
    };
    loadMainAddress();
  }, []);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching addresses:", fetchError);
    }
  }, [fetchError]);

  useEffect(() => {
    if (fetchedAddresses) {
      setAddresses(fetchedAddresses.data.docs);
    }
  }, [fetchedAddresses]);

  const handleMainAddressSelect = async (selectedAddress) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      mainAddress: addr._id === selectedAddress._id,
    }));
    setAddresses(updatedAddresses);
    setSelectedMainAddressId(selectedAddress._id);

    await AsyncStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
  };

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (selectedAddress) {
      await handleUpdateAddress();
    } else {
      await handleCreateAddress();
    }
  };

  const handleCreateAddress = async () => {
    try {
      await createAddress(form).unwrap();
      resetForm();
      setRegion('');
      setDistricts([]);
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error("Error creating address:", createError);
    }
  };

  const handleUpdateAddress = async () => {
    try {
      await updateAddress({ id: selectedAddress._id, data: form }).unwrap();
      resetForm();
      setRegion('');
      setDistricts([]);
      setSelectedAddress(null);
      setModalVisible(false);
      refetch();
    } catch (error) {
      console.error("Error updating address:", updateError);
    }
  };

  const resetForm = () => {
    setForm({
      phoneNumber: '',
      email: '',
      name: '',
      addressName: '',
      city: '',
      region: '',
      addressLabel: 'Home',
      mainAddress: false,
    });
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setForm(address);
    setModalVisible(true);
  };

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (selectedIndex.row === 0) {
      setRegion('');
      setDistricts([]); // Clear districts if 'None' is selected
    } else {
      const regions = ['Central', 'Eastern', 'Northern', 'Western'];
      setRegion(regions[selectedIndex.row - 1]);
      handleInputChange('region', regions[selectedIndex.row - 1]);
      setDistricts(getCountryByShort('UG')?.states[regions[selectedIndex.row - 1]].map(({ name }) => ({ title: name })));
    }
  }, [selectedIndex]);

  const [selectedCityIndex, setSelectedCityIndex] = useState(new IndexPath(0));

  useEffect(() => {
    if (selectedIndex.row === 0) {
      setCity('');
    } else if (districts.length > 0) {
      const selectedCity = districts[selectedCityIndex.row - 1];
      handleInputChange('city', selectedCity.title);
      setCity(selectedCity.title);
    }
  }, [selectedCityIndex]);

  return (
    <>
      <Layout style={styles.container}>
        <Button onPress={() => {
          setSelectedAddress(null); // Ensure we're in "create" mode
          setModalVisible(true);
        }} style={{ marginBottom: 10 }}>Create New Address</Button>
        {isFetching ? (
          <FlatList
            data={Array.from({ length: 5 })}
            renderItem={() => <SkeletonLoader />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : fetchError ? (
          <Text status='danger'>Error fetching addresses: {fetchError.message}</Text>
        ) : (
          <FlatList
            data={addresses}
            renderItem={({ item }) => (
              <AddressItem
                address={item}
                handleEditAddress={handleEditAddress}
                refetch={refetch}
                isMainAddress={item._id === selectedMainAddressId}
                onMainSelect={() => handleMainAddressSelect(item)}
              />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
          />
        )}
        {edit && <Button appearance='outline' onPress={() => router.push('/checkout')}>Select and Confirm</Button>}
      </Layout>
      <AddressModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        form={form}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        selectedAddress={selectedAddress}
        selectedCityIndex={selectedCityIndex}
        setSelectedCityIndex={setSelectedCityIndex}
        setSelectedIndex={setSelectedIndex}
        city={city}
        districts={districts}
        region={region}
        isCreating={isCreating || isUpdating}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default AddressComponent;
