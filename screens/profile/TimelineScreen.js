import React, { useEffect } from "react";
import { Dimensions, Animated } from "react-native";
import EmptyScreen from "../info/EmptyScreen";
import Memory from "../../components/modals/MemoryModal";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const TimelineScreen = ({
  data,
  authType,
  HeaderHeight,
  TabBarHeight,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  refreshing,
  onRefresh,
  navigation,
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onRefresh();
    });
    return unsubscribe;
  }, [navigation, onRefresh]);

  const renderProfileTimeline = ({ item }) =>
    authType === "self" ? (
      <Memory type="self" data={item} />
    ) : (
      <Memory type="non-self" data={item} />
    );

  return (
    <Animated.FlatList
      style={{ flex: 1 }}
      data={data}
      renderItem={renderProfileTimeline}
      ListEmptyComponent={<EmptyScreen />}
      refreshing={refreshing}
      onRefresh={() => onRefresh()}
      scrollToOverflowEnabled={true}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        minHeight: WINDOW_HEIGHT - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default TimelineScreen;
