const ListingListEmptyComponent = () => (
  <>
    {/* No Listing Found */}
    {!listingsData?.length && !timedOut && !networkError && (
      <View style={styles.noListingsWrap}>
        <Fontisto name='frowning' size={100} color={COLORS.primary_soft} />
        <Text style={styles.noListingsMessage}>
          {__('homeScreenTexts.noListingsMessage', appSettings.lng)}
        </Text>
        <View style={styles.retryButton}>
          <AppButton
            title={__('homeScreenTexts.refreshBtn', appSettings.lng)}
            onPress={onRefresh}
          />
        </View>
      </View>
    )}
    {/* Timeout & Network Error notice */}
    {!listingsData?.length && (!!timedOut || !!networkError) && (
      <View style={styles.noListingsWrap}>
        <Fontisto name='frowning' size={100} color={COLORS.primary_soft} />
        {!!timedOut && (
          <Text style={styles.noListingsMessage}>
            {__('homeScreenTexts.requestTimedOut', appSettings.lng)}
          </Text>
        )}

        <View style={styles.retryButton}>
          <AppButton
            title={__('homeScreenTexts.retryBtn', appSettings.lng)}
            onPress={handleRetry}
          />
        </View>
      </View>
    )}
  </>
)

export default ListingListEmptyComponent
