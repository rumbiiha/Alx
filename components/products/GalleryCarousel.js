import React, { useRef, useState } from 'react'
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

const { width } = Dimensions.get('window')

const images = [
  'https://via.placeholder.com/500',
  'https://via.placeholder.com/500',
  'https://via.placeholder.com/500',
]

const GalleryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollViewRef = useRef(null)

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(contentOffsetX / width)
    setActiveIndex(index)
  }

  const handlePaginationPress = (index) => {
    scrollViewRef.current.scrollTo({ x: index * width, animated: true })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index && styles.activeDot,
            ]}
            onPress={() => handlePaginationPress(index)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  image: {
    width,
    height: 200, // Adjust the height as needed
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    // bottom: 10,
    marginTop: 180,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'red', // Change color for active pagination dot
  },
})

export default GalleryCarousel
