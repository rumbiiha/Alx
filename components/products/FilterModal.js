import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {
  Button,
  Input,
  Text,
  Layout,
  Radio,
  RadioGroup,
} from '@ui-kitten/components';
import { useGetProductFiltersQuery } from '../../../api';
import { X } from 'phosphor-react-native'; // Phosphor Icons
import colors from '../../../theme/colors';

export default function FilterModal({
  meta,
  open,
  setFilterModalOpen,
  button,
}) {
  const [inputValue, setInputValue] = useState([0, 0]);
  const { data } = useGetProductFiltersQuery({});

  const toggleModal = () => {
    setFilterModalOpen(!open);
  };

  useEffect(() => {
    if (meta) {
      setInputValue([meta.minPrice, meta.maxPrice]);
    }
  }, [meta]);

  const applyFilters = () => {
    // Implement filter application logic here
    setFilterModalOpen(false);
  };

  const clearFilters = () => {
    // Implement filter clearing logic here
    setFilterModalOpen(false);
  };

  return (
    <Layout style={styles.container}>
      {button}
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <Layout style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <X size={24} color={colors.blackText} />
            </TouchableOpacity>
            <Text category="h5" style={styles.modalTitle}>
              Filter Products
            </Text>
            {data &&
              data.data.map((filter) => (
                <View key={filter._id} style={styles.filterSection}>
                  <Text category="s1" style={styles.filterTitle}>
                    {filter.label}
                  </Text>
                  {filter.name !== 'price' ? (
                    <RadioGroup>
                      {filter.values.map((option) => (
                        <Radio key={option.value} style={styles.radioButton}>
                          {option.name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  ) : (
                    <View>
                      {/* Placeholder 0766389284 for other filters, e.g., slider for price */}
                    </View>
                  )}
                </View>
              ))}
            <View style={styles.buttonGroup}>
              <Button style={styles.button} appearance="outline" onPress={clearFilters}>
                Clear Filters
              </Button>
              <Button style={styles.button} onPress={applyFilters}>
                Apply Filters
              </Button>
            </View>
          </Layout>
        </View>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  modalTitle: {
    marginBottom: 20,
  },
  filterSection: {
    marginVertical: 10,
  },
  filterTitle: {
    marginBottom: 5,
  },
  radioButton: {
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
