const featuredListFooter = () => {
  if (pagination && pagination.total_pages > pagination.current_page) {
    return (
      <View style={styles.loadMoreWrap}>
        <ActivityIndicator size='small' color={COLORS.primary} />
      </View>
    )
  } else {
    return null
  }
}
