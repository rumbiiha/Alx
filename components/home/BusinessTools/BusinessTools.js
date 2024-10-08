import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import colors from '../../../../theme/colors'
import MenuItem from './MenuItem' // Import the MenuItem component
import { Icon } from 'react-native-paper'

const BusinessTools = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const handleSelect = (value) => {
    setSelectedValue(value)
    toggleModal()
  }

  const menuItems = [
    {
      iconName: 'collections',
      text: 'Business Profile',
      description: 'Manage address, hours and website',
    },
    {
      iconName: 'shopping-cart',
      text: 'Greeting Message',
      description: 'Welcome new customers automatically',
    },
    {
      iconName: 'receipt',
      text: 'Away message',
      description: "reply automatically when you'r away",
    },
    {
      iconName: 'receipt',
      text: 'Quick replies',
      description: 'Reuse frequent messages',
    },
  ]

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={{ marginLeft: 'auto' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Icon source='store' color={colors.blackText} size={20} />
          <Text style={{ color: colors.blackText }}>Tools</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <AntDesign name='close' size={24} color={colors.blackText} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {menuItems.map((menuItem, index) => (
              <MenuItem
                key={index}
                iconName={menuItem.iconName}
                text={menuItem.text}
                description={menuItem.description}
                onPress={() => handleSelect(menuItem.text)}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: StatusBar.currentHeight + 36,
  },
  modalContent: {
    backgroundColor: 'white',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 3,
    zIndex: 1000,
    right: 20,
    elevation: 7,
  },
})

export default BusinessTools
