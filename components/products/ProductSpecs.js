import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

const ProductSpecifications = ({ product }) => {
  if (!product?.specs) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Specifications</Text>
      <View style={styles.specification}>
        {Object.entries(product.specs).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{value.toString()}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 5,
    // padding: 10,
  },
  heading: {
    fontSize: 17,
    color: colors.blackText,
    fontWeight: '500',
    marginBottom: 5,
  },
  specification: {
    // flexDirection: 'column',
    borderWidth: 0.5,
    borderRadius: 5,
    // padding: 10,
    overflow: 'hidden',
    borderBottomColor: colors.blackDividers,
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: .5,
    // borderBottomColor: colors.blackDividers,
    paddingVertical: 0.5,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  label: {
    width: 170,
    paddingHorizontal: 5,
    fontSize: 13,
    backgroundColor: '#e8ecec',
    color: colors.blackText,
    fontWeight: '500',
    borderBottomWidth: 0.5,
    textTransform: 'capitalize',
    borderBottomColor: colors.blackDividers,
  },
  value: {
    // fontWeight: 'bold',
    fontSize: 11,
    paddingHorizontal: 4,
    color: colors.blackSecondaryText,
    flex: 1,
    marginRight: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.blackDividers,
  },
})

export default ProductSpecifications
