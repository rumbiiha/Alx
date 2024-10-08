import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons' // Import Ionicons from react-native-vector-icons
import colors from '../../../theme/colors'

const SwitchLayout = ({ onChangeLayout }) => {
  const [isGrid, setIsGrid] = useState(true)

  const handleToggleLayout = () => {
    setIsGrid((prevState) => !prevState)
    onChangeLayout(!isGrid) // Pass the new layout type to the parent component
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleLayout}
        style={[styles.button, isGrid && styles.activeButton]}
      >
        <Icon
          name='grid'
          size={16}
          color={isGrid ? 'gainsboro' : colors.primaryBase}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleToggleLayout}
        style={[styles.button, !isGrid && styles.activeButton]}
      >
        <Icon
          name='list'
          size={16}
          color={isGrid ? colors.primaryBase : 'gainsboro'}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
  },
  button: {
    // backgroundColor: '#007AFF',
    padding: 7,
    // borderRadius: 5,
    // marginRight: 10,
  },
  activeButton: {
    backgroundColor: colors.primaryBase, // Change the color of the active button
  },
})

export default SwitchLayout
