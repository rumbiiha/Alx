import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons' // Assuming you're using Expo icons
import colors from '../../../theme/colors'

const FilterBar = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.filterItem}>
        <Text style={styles.filterText}>Budget</Text>
        <AntDesign name='down' size={16} color='black' />
      </View>
      <View style={styles.filterItem}>
        <Text style={styles.filterText}>Brand and Model</Text>
        <AntDesign name='down' size={16} color='black' />
      </View>
      <View style={styles.filterItem}>
        <Text style={styles.filterText}>Year</Text>
        <AntDesign name='down' size={16} color='black' />
      </View>
      <View style={styles.filterItem}>
        <Text style={styles.filterText}>Fuel</Text>
        <AntDesign name='down' size={16} color='black' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8eded',
    borderWidth: 1,
    borderColor: colors.blackText,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    marginRight: 5,
  },
})

export default FilterBar
