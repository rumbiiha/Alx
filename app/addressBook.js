import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Input, Button, Layout, Text, Card, Modal, CheckBox, IndexPath, Select, SelectItem, Autocomplete, AutocompleteItem, useTheme } from '@ui-kitten/components';
import { useCreateAddressMutation, useGetAddressQuery, useDeleteAddressMutation, useUpdateAddressMutation } from '../api'; // Adjust the path as necessary
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCountryByShort, getStatesByShort } from 'countrycitystatejson'
import { Envelope, MapPin, Phone, User } from 'phosphor-react-native';
import { Divider } from 'react-native-paper';

const AddressComponent = () => {
  const { data: fetchedAddresses, error: fetchError, isLoading: isFetching, refetch } = useGetAddressQuery();
  const [createAddress, { error: createError, isLoading: isCreating }] = useCreateAddressMutation();
  const [deleteAddress, { error: deleteError, isLoading: isDeleting }] = useDeleteAddressMutation();
  const [updateAddress, { error: updateError }] = useUpdateAddressMutation();
  const { edit } = useLocalSearchParams();

  const [form, setForm] = useState({
    email: '',
    addressName: '',
    city: '',
    region: '',
    addressLabel: 'Home', // Default label
    mainAddress: false,
  });

  const [addresses, setAddresses] = useState([]); // State for addresses
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  // Fetch user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setForm((prevForm) => ({
          ...prevForm,
          phoneNumber: parsedData.user.phoneNumber || '', // Prefill phone number
          email: parsedData.user.email || '', // Prefill phone number
          name: parsedData.user.name || '', // Prefill name
        }));
      }
    } catch (error) {
      console.error('Error loading user data from local storage:', error);
    }
  };

  useEffect(() => {
    loadUserData(); // Load user data when the component mounts

    // getSTATE('eatern')
  }, []);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching addresses:", fetchError);
    }
  }, [fetchError]);

  useEffect(() => {
    if (fetchedAddresses) {
      setAddresses(fetchedAddresses.data.docs); // Update the local state with fetched addresses
    }
  }, [fetchedAddresses]);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await createAddress(form).unwrap();
      resetForm();
      setModalVisible(false);
      refetch(); // Refetch addresses after creating
    } catch (error) {
      console.error("Error creating address:", createError);
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
      addressLabel: 'Home', // Reset to default label
      mainAddress: false,
    });
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setForm(address);
    setModalVisible(true);
  };

  const handleUpdateAddress = async () => {
    try {
      await updateAddress({ id: selectedAddress._id, data: form }).unwrap();
      resetForm();
      setSelectedAddress(null);
      setModalVisible(false);
      refetch(); // Refetch addresses after updating
    } catch (error) {
      console.error("Error updating address:", updateError);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(selectedAddress._id).unwrap();
      setDeleteModalVisible(false);
      setSelectedAddress(null);
      refetch(); // Refetch addresses after deleting
    } catch (error) {
      console.error("Error deleting address:", deleteError);
    }
  };

  const toggleMainAddress = async (address) => {
    const isCurrentlyMain = address.mainAddress;
    if (!isCurrentlyMain) {
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        mainAddress: addr._id === address._id // Set the clicked address to main, others to false
      }));
      setAddresses(updatedAddresses);

      try {
        await AsyncStorage.setItem('selectedAddress', JSON.stringify(address));
        console.log("Selected address saved to local storage:", address);
      } catch (error) {
        console.error("Error saving address to local storage:", error);
      }
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    if (selectedIndex !== null) {
      const regions = ['Central', 'Eastern', 'Northern', 'Western'];
      setRegion(regions[selectedIndex.row]);
      handleInputChange('region', regions[selectedIndex.row])
      setDistricts(getCountryByShort('UG')?.states[regions[selectedIndex.row]].map(({ name }) => ({ title: name })));

    }

  }, [selectedIndex]);


  const [selectedCityIndex, setSelectedCityIndex] = useState(new IndexPath(0));


  useEffect(() => {
    if (selectedCityIndex !== null && districts.length) {
      handleInputChange('city', districts.map(({ title }) => title)[selectedCityIndex.row])
      setCity(districts.map(({ title }) => title)[selectedCityIndex.row]);
    }

  }, [selectedCityIndex]);

  const theme = useTheme();

  const renderAddressItem = (address) => (
    <Layout style={[styles.card, { borderColor: theme['color-basic-500'] }]}>
      <View style={styles.addressRow}>
        <MapPin size={20} color="#8F9BB3" weight="fill" />
        <Text category="s2" style={styles.addressText}>
          {address.addressName},{address.city},{address.region}, Uganda
        </Text>
        <Text style={styles.addressLabel} category="c2">
          Home
        </Text>
      </View>
      <Divider style={{ marginVertical: 10 }} />
      <View style={styles.addressInfo}>
        <User size={20} color="#8F9BB3" weight="fill" />
        <Text category="p2" style={styles.infoText}>
          {address.name || 'John Doe'}
        </Text>
      </View>
      <View style={styles.addressInfo}>
        <Phone size={20} color="#8F9BB3" weight="fill" />
        <Text appearance="hint" style={styles.infoText}>
          {address.phoneNumber}
        </Text>
      </View>
      <View style={styles.addressInfo}>
        <Envelope size={20} color="#8F9BB3" weight="fill" />
        <Text appearance="hint" style={styles.infoText}>
          {address.email || 'example@example.com'} {/* Display email */}
        </Text>
      </View>
    </Layout>
  );

  const SkeletonLoader = () => (
    <Card style={[styles.addressItem, { opacity: 0.5 }]}>
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLine} />
      <View style={styles.skeletonLine} />
    </Card>
  );

  const PhoneNumberAccessory = () => (
    <View style={styles.accessoryContainer}>
      <Text category='s1'>+256</Text>
    </View>
  );

  const router = useRouter();

  return (
    <Layout style={styles.container}>
      <Button onPress={() => setModalVisible(true)} style={{marginBottom:10}}>Create New Address</Button>
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
          renderItem={({ item }) => renderAddressItem(item)}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      {edit && <Button appearance='outline' onPress={() => router.push('/checkout')}>Select and Confirm</Button>}

      {/* Create/Edit Address Modal */}
      <Modal visible={isModalVisible} backdropStyle={styles.backdrop} style={styles.modal}>
        <Layout style={styles.modalContent}>
          <Text style={{ marginVertical: 10 }} category='h6'>Create/Edit Address</Text>
          <Text category='label' appearance='hint'>Address Label</Text>
          <CheckBox
            style={styles.radio}
            checked={form.addressLabel === 'Home'}
            onChange={() => handleInputChange('addressLabel', form.addressLabel === 'Home' ? 'Office' : 'Home')}
          >
            {form.addressLabel === 'Home' ? 'Home' : 'Office'}
          </CheckBox>
          <Input
            label='Phone Number'
            value={form.phoneNumber?.replace('+256', '')}
            onChangeText={(value) => handleInputChange('phoneNumbrt', value)}
            placeholder='7XXX'
            accessoryLeft={PhoneNumberAccessory}
          />
          <Input
            label='Email'
            value={form.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <Input
            label='Names'
            value={form.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <Select
            label='region'
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            style={styles.select}
            value={region}
          >
            <SelectItem title='Central' />
            <SelectItem title='Eastern' />
            <SelectItem title='Northern' />
            <SelectItem title='Western' />
          </Select>

          <Select
            label='City/Town'
            selectedIndex={selectedCityIndex}
            onSelect={index => setSelectedCityIndex(index)}
            style={styles.select}
            value={city}
          >
            {districts?.map(({ title }) => <SelectItem title={title} />)}

          </Select>

          <Input
            label='Full Address Name'
            value={form.addressName}
            onChangeText={(value) => handleInputChange('addressName', value)}
          />

          {/* <Input
            label='Region (Optional)'
            value={form.region}
            onChangeText={(value) => handleInputChange('region', value)}
          /> */}

          <View style={styles.buttonContainer}>
            <Button onPress={selectedAddress ? handleUpdateAddress : handleSubmit}>
              {selectedAddress ? 'Update Address' : 'Create Address'}
            </Button>
            <Button onPress={() => {
              resetForm();
              setSelectedAddress(null);
              setModalVisible(false);
            }}>
              Cancel
            </Button>
          </View>
        </Layout>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={isDeleteModalVisible} backdropStyle={styles.backdrop}>
        <Card disabled={true}>
          <Text>Are you sure you want to delete this address?</Text>
          <View style={styles.modalActions}>
            <Button onPress={handleDeleteAddress}>Yes</Button>
            <Button onPress={() => setDeleteModalVisible(false)}>No</Button>
          </View>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  addressItem: {
    marginVertical: 8,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingBottom: 16,
  },
  modal: {
    width: '90%',
    maxHeight: '80%',
  },
  modalContent: {
    padding: 20,
    gap: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  radio: {
    marginVertical: 10,
  },
  accessoryContainer: {
    paddingHorizontal: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  skeletonLine: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
  card: { padding: 10, borderRadius: 5, marginVertical: 10, borderWidth: 1, borderColor: 'rgb(228, 233, 242)' },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressLabel: { marginLeft: 'auto', padding: 6, backgroundColor: '#EDF1F7', borderRadius: 6 },
  addressText: { marginLeft: 10, width: '60%' },
  addressInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoText: { marginLeft: 10 },
  addAddressButton: { marginTop: 16 },
  loadingPlaceholder: { justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
});

export default AddressComponent;
