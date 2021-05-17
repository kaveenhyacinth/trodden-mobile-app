import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Animated, Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FloatingButton from "../../components/ui/FloatingButton";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import Colors from "../../theme/Colors";
import api from "../../api";
import { Fetch } from "../../helpers/deviceStorageHandler";
import TripModal from "../../components/modals/TripModal";
import EmptyScreen from "../info/EmptyScreen";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const TripsScreenOwn = ({
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTrips();
    });

    return unsubscribe;
  }, [navigation, fetchTrips]);

  const fetchTrips = useCallback(async (isComponentMounted) => {
    try {
      if (!isComponentMounted) return;
      setLoading(true);
      const userId = await Fetch("nomadId");
      const { data } = await api.get.getTripsByUserId(userId);
      if (!data.success) throw new Error(data.msg);
      console.log("Trips", data.result);
      setTripsArray([...data.result]);
    } catch (error) {
      ErrorAlertModal(error.response.data.msg || error.message, error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips(isComponentMounted);
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
      <FloatingButton
        onPress={() => {
          navigation.navigate("NewTrip");
        }}
      />
    </Animated.View>
  );
};

export default TripsScreenOwn;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 3,
    backgroundColor: Colors.accent,
  },
});
