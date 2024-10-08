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
import colors from '@/theme/colors'
import MenuItem from './MenuItem' // Import the MenuItem component
import useNavigator from '@/hooks/useNavigator'

const Dropdown = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const navigate = useNavigator()

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  const handleSelect = (value) => {
    setSelectedValue(value)
    toggleModal()
  }

  const menuItems = [
    { iconName: 'collections', text: 'My ADS', secure: true },
    { iconName: 'shopping-cart', text: 'Buy Business Packages' },
    { iconName: 'receipt', text: 'Bought Packages & Billing' },
    { iconName: 'chat', text: 'Chat', secure: true },
    { iconName: 'notifications', text: 'Notifications', secure: true },
    { iconName: 'help', text: 'Help' },
    { iconName: 'language', text: 'Select language / भाषा चुनें' },
    { iconName: 'settings', text: 'Settings', secure: true },
    { iconName: 'logout', text: 'Logout', secure: true },
  ]

  // onPress={() => navigate.to('StoreView', { secure: true })}
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.button}>
        <SimpleLineIcons
          style={{ paddingHorizontal: 15 }}
          name='menu'
          size={24}
          color='gainsboro'
        />
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
                onPress={() => navigate.to(menuItem.text, { secure: !!menuItem.secure })}
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

export default Dropdown
