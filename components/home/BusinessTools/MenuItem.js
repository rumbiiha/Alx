import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../../../theme/colors'

const MenuItem = ({ iconName, text, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <MaterialIcons style={styles.icon} name={iconName} size={24} />
      <View>
        <Text style={styles.menuItemText}>{text}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 45,
    fontSize: 16,
  },
  description: {
    marginLeft: 10,
    fontSize: 13,
    color: colors.blackSecondaryText,
  },
  menuItemText: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 17,
    color: colors.blackText,
  },
  icon: {
    paddingRight: 16,
    color: colors.blackText,
  },
})

export default MenuItem
