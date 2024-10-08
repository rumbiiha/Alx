import React from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import colors from '../../../theme/colors'
import { useGetRelatedProductsQuery } from '../../../api'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({ imageUrl, id, name, price, location }) => {
  const router = useNavigation()
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => router.navigate(`AdDetails`, { id })}
      >
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require('../../../assets/placeholder.png')
          }
          style={styles.image}
        />
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={styles.price} numberOfLines={1}>
            UGX {price?.toLocaleString()}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.location}>{location?.streetName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const LoadingGridCard = () => (
  <View style={[styles.card, styles.cardBorder]}>
    <View style={styles.imagePlaceholder} />
    <View style={styles.textPlaceholder} />
    <View style={styles.textPlaceholder} />
    <View style={styles.textPlaceholder} />
  </View>
)

const RelatedProducts = ({ params }) => {
  const { data, isLoading, error } = useGetRelatedProductsQuery(params)
  return (
    <View>
      {data?.data.map((item) => (
        <ProductCard
          imageUrl={item.imageUrl}
          id={item._id}
          key={item._id}
          name={item.title}
          price={item.price}
          location={item.store?.location}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.blackDividers,
    marginTop: 5,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    height: 120,
    width: 120, // Take full width
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  price: {
    fontSize: 16,
    color: colors.blackText,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 13,
    color: colors.blackSecondaryText,
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: colors.blackSecondaryText,
  },
  imagePlaceholder: {
    height: 160,
    width: '100%',
    backgroundColor: '#E0E0E0', // Placeholder color
    marginBottom: 10,
    borderRadius: 5,
  },
  textPlaceholder: {
    height: 20,
    backgroundColor: '#E0E0E0', // Placeholder color
    marginBottom: 5,
    borderRadius: 5,
  },
})

export default RelatedProducts
