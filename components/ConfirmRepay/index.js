import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Pressable, PanResponder, Dimensions } from 'react-native';
import { CaretRight, Check } from 'phosphor-react-native'; // Import Phosphor icons
import { useTheme } from '@ui-kitten/components';

const IS_NATIVE_DRIVER = true;

const SlideToConfirm = ({
  onSlide,
  onSlideEnd,
  onSlideRelease,
  onSlideBegin,
  onSlideConfirmed,
  onSlideNotConfirmed,
  defaultColor = '#e2e8f0',
  defaultIconSize = 30,
  confirmedPercent = 0.8,
  ballPadding = 0,
  disableOnConfirmed = false,
  disabled = false,
  sliderStyle = {
    height: 52,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 5,
  },
  unconfirmedTipText = 'Slide to Pay',
  confirmedTipText = 'Confirmed',
}) => {
  const pan = useRef(new Animated.Value(0)).current;
  const [startPoint, setStartPoint] = useState(null);
  const sliderWidth = Dimensions.get('window').width - 60; // Dynamic width based on screen size
  const theme = useTheme();

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => !disabled, // Disable sliding if disabled
    onPanResponderGrant: (e) => {
      if (!disabled) {
        onSlideBegin?.(e);
        setStartPoint(e.nativeEvent.pageX);
      }
    },
    onPanResponderMove: (e) => {
      if (!disabled) {
        onSlide?.(e);
        pan.setValue(e.nativeEvent.pageX - startPoint);
      }
    },
    onPanResponderRelease: (e) => {
      onSlideRelease?.(e);
      pan.flattenOffset();
    },
    onPanResponderEnd: (e) => {
      onSlideEnd?.(e);
      if (pan._value > sliderWidth * confirmedPercent) {
        Animated.spring(pan, {
          toValue: sliderWidth,
          useNativeDriver: IS_NATIVE_DRIVER,
        }).start(() => {
          if (disableOnConfirmed) {
            // Disable sliding after confirmation if required
          }
          onSlideConfirmed?.(e);
        });
      } else {
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: IS_NATIVE_DRIVER,
        }).start(() => onSlideNotConfirmed?.(e));
      }
    },
  });

  const slideOpacity = pan.interpolate({
    inputRange: [0, sliderWidth * confirmedPercent],
    outputRange: [1, 0],
  });

  const checkOpacity = pan.interpolate({
    inputRange: [sliderWidth * confirmedPercent, sliderWidth],
    outputRange: [0, 1],
  });

  // Reset slide on unmount
  useEffect(() => {
    return () => {
      pan.setValue(0); // Reset the animated value
    };
  }, []);

  return (
    <View style={[{ backgroundColor: theme['color-basic-300']}, sliderStyle,{borderColor: theme['color-basic-500']}]}>
      <Animated.View
        {...(disabled ? {} : panResponder.panHandlers)}
        style={{ transform: [{ translateX: pan }] }}
      >
        <Pressable style={[styles.defaultBall, { backgroundColor: theme['color-primary-default'] }, disabled && {backgroundColor:theme['color-primary-300']}]}>
          <Animated.View style={[styles.defaultIcon, { opacity: slideOpacity }]}>
            <CaretRight color={disabled ? '#ccc' : defaultColor} size={defaultIconSize} />
          </Animated.View>
          <Animated.View style={[styles.defaultCheck, { opacity: checkOpacity }]}>
            <Check color={disabled ? '#ccc' : defaultColor} size={defaultIconSize} />
          </Animated.View>
        </Pressable>
      </Animated.View>
      <Animated.Text style={[styles.tipText, { opacity: slideOpacity, color: disabled ? '#ccc' : '#64748b' }]}>
        {unconfirmedTipText}
      </Animated.Text>
      <Animated.Text style={[styles.tipText, { opacity: checkOpacity, color: disabled ? '#ccc' : '#64748b' }]}>
        {confirmedTipText}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultBall: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    marginLeft: 5,
    width: 70,
    borderRadius: 5,
    backgroundColor: '#93122c',
  },
  disabledBall: {
    backgroundColor: '#e2e8e0', // Lighter color when disabled
  },
  defaultIcon: {
    position: 'absolute',
  },
  defaultCheck: {
    position: 'absolute',
  },
  tipText: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default SlideToConfirm;
