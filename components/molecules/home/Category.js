const Category = ({ onPress, item }) => (
  <TouchableOpacity
    onPress={() => onPress(item)}
    style={{
      backgroundColor: COLORS.white,
      marginHorizontal: screenWidth * 0.015,
      marginBottom: screenWidth * 0.03,
      shadowColor: COLORS.border_light,
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 1,
      borderRadius: 5,
    }}
  >
    <View
      style={{
        borderRadius: 5,
        alignItems: 'center',
        paddingTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        height: (screenWidth * 0.88 * 1.04) / 3,
        width: (screenWidth * 0.88) / 3,
        overflow: 'hidden',
      }}
    >
      {item?.icon?.url ? (
        <CategoryImage size={(screenWidth * 0.88) / 9} uri={item.icon.url} />
      ) : (
        <CategoryIcon
          iconName={item.icon.class}
          iconSize={(screenWidth * 0.88) / 9}
          iconColor={COLORS.primary}
        />
      )}
      <View
        style={{
          paddingTop: '12%',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            color: COLORS.text_dark,
            fontWeight: 'bold',
            fontSize: 13,
            textAlign: 'center',
          }}
          numberOfLines={2}
        >
          {decodeString(item.name)}
          {/* {decodeString(item.name).split(" ")[0]} */}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)
