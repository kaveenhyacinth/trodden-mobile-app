import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Animated, Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../../components/ui/FloatingButton";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import Colors from "../../theme/Colors";
import api from "../../api";
import TripModal from "../../components/modals/TripModal";
import EmptyScreen from "../info/EmptyScreen";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const TripsScreenUser = ({
  UserId,
  HeaderHeight,
  TabBarHeight,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const [loading, setLoading] = useState(false);
  const [tripsArray, setTripsArray] = useState([]);

  const isComponentMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, [isComponentMounted]);

  const fetchTrips = useCallback(async () => {
    try {
      if (!isComponentMounted) return;
      setLoading(true);
      const { data } = await api.get.getTripsByUserId(UserId);
      if (!data.success) throw new Error(data.msg);
      console.log("Trips", data.result);
      setTripsArray([...data.result]);
    } catch (error) {
      ErrorAlertModal(error.response.data.msg || error.message, error);
    } finally {
      setLoading(false);
    }
  }, [isComponentMounted]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const renderTrips = ({ item }) => (
    <View style={{ alignItems: "center" }}>
      <TripModal data={item} navigation={navigation} />
    </View>
  );

  return (
    <Animated.View style={styles.screen}>
      <Animated.FlatList
        style={{ flex: 1 }}
        data={tripsArray}
        renderItem={renderTrips}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => fetchTrips(isComponentMounted)}
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
    </Animated.View>
  );
};

export default TripsScreenUser;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 3,
    backgroundColor: Colors.accent,
  },
});
