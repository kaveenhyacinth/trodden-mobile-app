import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";
import LoadingScreen from "../info/LoadingScreen";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import api from "../../api";
import FlatlistFooter from "../../components/ui/FlatlistFooter";
import BlazeModal from "../../components/modals/BlazeModal";

const LocationBlazeScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [blazes, setBlazes] = useState([]);
  const isComponentMounted = useRef(true);

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, [isComponentMounted]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.locationName,
    });
  }, [route.params.locationName]);

  const fetchFeedByHashTag = useCallback(async () => {
    try {
      setLoading(true);
      if (isComponentMounted) {
        const location = route.params.locationId;
        const { data } = await api.get.getBlazesByLocation(location);
        if (!data.success) throw new Error(data.msg);
        setBlazes([...data.result]);
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [route.params.locationId, isComponentMounted]);

  useEffect(() => {
    fetchFeedByHashTag();
  }, [fetchFeedByHashTag]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFeedByHashTag();
    });
    return unsubscribe;
  }, [navigation, fetchFeedByHashTag]);

  const renderItem = ({ item }) => (
    <BlazeModal
      data={item}
      onNavigate={() =>
        navigation.navigate("Blaze", {
          id: item._id,
          title: item.title,
        })
      }
    />
  );

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={blazes}
        ListEmptyComponent={() => <EmptyScreen />}
        ListFooterComponent={() => <FlatlistFooter />}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchFeedByHashTag}
      />
    </SafeAreaView>
  );
};

export default LocationBlazeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
    alignItems: "center",
  },
});
