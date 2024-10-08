const ListingListHeader = () => (
  <Animated.View>
    {!searchData?.categories && (
      <>
        <View
          style={{
            marginHorizontal: screenWidth * 0.015,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            {__('homeScreenTexts.topCategoriesText', appSettings.lng)}
          </Text>
        </View>
        {/* categories flatlist */}
        <FlatList
          data={topCategoriesData}
          renderItem={renderCategory}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          inverted={rtl_support}
          numColumns={3}
        />
        {allCategoriesData?.length > 6 && (
          <TouchableOpacity
            onPress={handleSeeAll}
            style={{
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
              marginHorizontal: screenWidth * 0.015,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: COLORS.white,
              }}
            >
              {__('homeScreenTexts.seAllButtonText', appSettings.lng)}
            </Text>
          </TouchableOpacity>
        )}
      </>
    )}
    {rtl_support ? (
      <View
        style={[
          styles.featuredListingTop,
          { marginTop: searchData?.categories ? 10 : 0 },
          rtlView,
        ]}
      >
        <View style={[{ flex: 1, alignItems: 'center' }, rtlView]}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
            numberOfLines={1}
          >
            {searchData?.categories
              ? getSelectedCat(cat_name[0])
              : __('homeScreenTexts.latestAdsText', appSettings.lng)}
          </Text>
          {!!searchData?.categories && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleSeeAll}
            >
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}
                numberOfLines={1}
              >
                {__('homeScreenTexts.selectCatBtn', appSettings.lng)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => handleLayoutToggle(false)}
            style={{
              padding: 4,
              borderRadius: 3,
              borderWidth: 1,
              backgroundColor: appSettings?.listView
                ? COLORS.white
                : COLORS.primary,
              marginRight: 10,
              borderColor: appSettings?.listView
                ? COLORS.white
                : COLORS.primary,
            }}
          >
            <Ionicons
              name='grid'
              size={15}
              color={appSettings?.listView ? COLORS.gray : COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLayoutToggle(true)}
            style={{
              padding: 4,
              borderRadius: 3,
              borderWidth: 1,
              backgroundColor: appSettings?.listView
                ? COLORS.primary
                : COLORS.white,
              borderColor: appSettings?.listView
                ? COLORS.primary
                : COLORS.white,
            }}
          >
            <Ionicons
              name='list-sharp'
              size={15}
              color={appSettings?.listView ? COLORS.white : COLORS.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          paddingHorizontal: screenWidth * 0.015,
          paddingBottom: 15,
          paddingTop: 5,
          // marginTop: searchData?.categories ? 10 : 0,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              {
                fontSize: 15,
                fontWeight: 'bold',
              },
              // rtlText,
            ]}
            numberOfLines={1}
          >
            {searchData?.categories
              ? getSelectedCat(cat_name[0])
              : __('homeScreenTexts.latestAdsText', appSettings.lng)}
          </Text>
          {!!searchData?.categories && (
            <TouchableOpacity
              style={{
                paddingHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleSeeAll}
            >
              <Text
                style={[
                  {
                    fontSize: 12.5,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  },
                  // rtlText,
                ]}
                numberOfLines={1}
              >
                {__('homeScreenTexts.selectCatBtn', appSettings.lng)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => handleLayoutToggle(false)}
            style={{
              padding: 4,
              borderRadius: 3,
              borderWidth: 1,
              backgroundColor: appSettings?.listView
                ? COLORS.white
                : COLORS.primary,
              marginRight: 10,
              borderColor: appSettings?.listView
                ? COLORS.white
                : COLORS.primary,
            }}
          >
            <Ionicons
              name='grid'
              size={15}
              color={appSettings?.listView ? COLORS.gray : COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleLayoutToggle(true)}
            style={{
              padding: 4,
              borderRadius: 3,
              borderWidth: 1,
              backgroundColor: appSettings?.listView
                ? COLORS.primary
                : COLORS.white,
              borderColor: appSettings?.listView
                ? COLORS.primary
                : COLORS.white,
            }}
          >
            <Ionicons
              name='list-sharp'
              size={15}
              color={appSettings?.listView ? COLORS.white : COLORS.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    )}
  </Animated.View>
)
