import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'

// Modal component
const MyModal = ({ visible, onClose, inputData }) => {
  const [quantity, setQuantity] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Function to handle quantity selection
  const handleSelectQuantity = (id) => {
    setQuantity(id)
  }

  // Function to handle form submission
  const handleSubmit = () => {
    // Perform validation if needed
    // Submit the form data
    console.log('Submitted quantity:', quantity)
    // Close the modal
    onClose()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='Open Modal' onPress={() => setModalVisible(true)} />
      <Modal visible={visible} animationType='slide' transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>{inputData.label}</Text>
            {/* Render fields dynamically */}
            {inputData.fields.map((field) => (
              <View key={field.name}>
                <Text style={styles.label}>{field.label}</Text>
                {/* Render single select input */}
                {field.input_type === 'single_select' && (
                  <View style={styles.possibleValuesContainer}>
                    {field.possible_values.map((value) => (
                      <TouchableOpacity
                        key={value.id}
                        style={[
                          styles.possibleValue,
                          quantity === value.id && styles.selectedValue,
                        ]}
                        onPress={() => handleSelectQuantity(value.id)}
                      >
                        <Text>{value.value}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {/* Submit button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  possibleValuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  possibleValue: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedValue: {
    backgroundColor: 'lightblue',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
})

export default MyModal
