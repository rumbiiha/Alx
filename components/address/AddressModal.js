import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Layout, Text, Input, Button, Select, SelectItem, CheckBox } from '@ui-kitten/components';

const AddressModal = ({
    isVisible,
    onClose,
    form,
    handleInputChange,
    handleSubmit,
    selectedAddress,
    selectedIndex,
    setSelectedIndex,
    selectedCityIndex,
    setSelectedCityIndex,
    city,
    region,
    districts,
    isCreating,
}) => {
    const isEditing = selectedAddress !== null;

    return (
        <Modal visible={isVisible} backdropStyle={styles.backdrop} style={styles.modal}>
            <Layout style={styles.modalContent}>
                <Text style={{ marginVertical: 10 }} category='h6'>{isEditing ? 'Edit Address' : 'Create Address'}</Text>
                <Text category='label' appearance='hint'>Address Label</Text>
                <View style={{gap:10,flexDirection:'row'}}>
                <CheckBox
                    style={styles.radio}
                    checked={form.addressLabel === 'Home'}
                    onChange={() => handleInputChange('addressLabel', 'Home')}
                >
                    Home
                </CheckBox>
                <CheckBox
                    style={styles.radio}
                    checked={form.addressLabel === 'Office'}
                    onChange={() => handleInputChange('addressLabel', 'Office')}
                >
                    Office
                </CheckBox>
                </View>
                <Input
                    accessoryLeft={() => <View style={{ paddingHorizontal: 10 }}>
                        <Text category='s1'>+256</Text>
                    </View>}
                    label='Phone Number'
                    value={form.phoneNumber?.split('256')[1]}
                    onChangeText={(value) => handleInputChange('phoneNumber', value)}
                    placeholder='7XXX'
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
                    label='Region'
                    selectedIndex={selectedIndex || 0} // Default to "None"
                    onSelect={index => setSelectedIndex(index)}
                    value={form.region || region || 'None'}
                    style={styles.select}
                >
                    <SelectItem title='None' />
                    <SelectItem title='Central' />
                    <SelectItem title='Eastern' />
                    <SelectItem title='Northern' />
                    <SelectItem title='Western' />
                </Select>

                <Select
                    label='City/Town'
                    selectedIndex={selectedCityIndex || 0} // Default to "None"
                    placeholder={'Select City'}
                    value={form.city|| city || 'None'}
                    onSelect={index => {
                        setSelectedCityIndex(index);
                        handleInputChange('city', districts[index.row]?.title || 'None'); // Update city value
                    }}
                    style={styles.select}
                >
                    <SelectItem title='None' />
                    {districts?.map(({ title }) => <SelectItem title={title} key={title} />)}
                </Select>

                <Input
                    label='Full Address Name'
                    value={form.addressName}
                    onChangeText={(value) => handleInputChange('addressName', value)}
                />

                <View style={styles.buttonContainer}>
                    <Button onPress={onClose} appearance='outline' status="basic">
                        Cancel
                    </Button>
                    <Button
                        onPress={isEditing ? () => handleSubmit(selectedAddress) : handleSubmit}
                        disabled={isCreating} // Disable button when creating
                    >
                        {isCreating ? 'Creating...' : isEditing ? 'Update Address' : 'Create Address'}
                    </Button>
                </View>
            </Layout>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        bottom: 0,
        width: '100%'
    },
    modalContent: {
        padding: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        gap: 15,
        bottom: 0
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        bottom: 0
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AddressModal;
