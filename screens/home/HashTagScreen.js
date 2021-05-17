import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";
import LoadingScreen from "../info/LoadingScreen";
import MemoryModal from "../../components/modals/MemoryModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import api from "../../api";
import FlatlistFooter from "../../components/ui/FlatlistFooter";

const HashTagScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [memories, setMemories] = useState([]);
  const isComponentMounted = useRef(true);

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, [isComponentMounted]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.tag,
    });
  }, [route.params.tag]);

  const fetchFeedByHashTag = useCallback(async () => {
    try {
      setLoading(true);
      if (isComponentMounted) {
        const hashtag = route.params.tag.replace("#", "");
        const { data } = await api.get.getMemoriesByHashtag(hashtag);
        if (!data.success) throw new Error(data.msg);
        setMemories([...data.result]);
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [route.params.tag, isComponentMounted]);

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
    <MemoryModal type="feed" data={item} navigation={navigation} />
  );

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={memories}
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

export default HashTagScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
