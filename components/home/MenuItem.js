import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../../theme/colors'

const MenuItem = ({ iconName, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <MaterialIcons style={styles.icon} name={iconName} size={24} />
      <Text style={styles.menuItemText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 40,
    fontSize: 16,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.blackText,
  },
  icon: {
    paddingRight: 16,
    color: colors.blackText,
  },
})

export default MenuItem
