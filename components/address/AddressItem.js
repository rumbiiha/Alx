import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Radio, useTheme, Button } from '@ui-kitten/components';
import { MapPin, User, Phone, Envelope, PencilSimple, Trash } from 'phosphor-react-native';
import { Divider } from 'react-native-paper';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AddressItem = ({ address, handleEditAddress, refetch, isMainAddress, onMainSelect, viewOnly }) => {
  const theme = useTheme();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteAddress = () => {
    setDeleteModalVisible(false);
    refetch();
  };

  return (
    <Layout style={styles.card(theme)}>
      <View style={styles.addressRow}>
        <MapPin size={20} color="#8F9BB3" weight="fill" />
        <Text category="s2" style={styles.addressText}>
          {address.addressName}, {address.city}, {address.region}, Uganda
        </Text>
        <Text style={styles.addressLabel} category="c2">
          {address.addressLabel || 'Home'}
        </Text>
        {!viewOnly && <Radio
          style={styles.radio}
          checked={isMainAddress}
          onChange={onMainSelect}
        />}
      </View>
      <Divider style={{ marginVertical: 10 }} />
      <Layout style={styles.actionRow}>
        <View>
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
              {address.email || 'example@example.com'}
            </Text>
          </View>
        </View>
        {!viewOnly && <View style={styles.actionButtons}>
          <Button
            appearance="ghost"
            accessoryLeft={() => <PencilSimple size={20} color="#8F9BB3" />}
            onPress={() => handleEditAddress(address)} // Trigger edit address handler
          />
          <DeleteConfirmationModal
            isVisible={isDeleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onDelete={handleDeleteAddress}
            address={address}
          />
        </View>}
      </Layout>

    </Layout>
  );
};

const styles = StyleSheet.create({
  card: (theme) => ({
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme['color-basic-600'],
  }),
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    marginLeft: 'auto',
    padding: 6,
    backgroundColor: '#EDF1F7',
    borderRadius: 6,
  },
  addressText: {
    marginLeft: 10,
    width: '60%',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    marginLeft: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radio: {
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
});

export default AddressItem;
