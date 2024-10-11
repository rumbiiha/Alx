import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Placeholder from '@/assets/Placeholder';

const ImageWithLoadingAndError = ({ source, style }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  return <>
    {/* {loading && (
      <View style={{ marginBottom: style.marginBottom }}>
        <Placeholder width={style.width} height={style.height} />
      </View>
    )} */}
    <Image
      source={error ? require('@/assets/placeholder.png') : source}
      style={style}
      onLoadStart={() => setLoading(true)}
      onLoad={() => setLoading(false)}
      onError={() => {
        setError(true);
        setLoading(false);
      }}
      resizeMode="cover"
    />
  </>
};


export default ImageWithLoadingAndError;
