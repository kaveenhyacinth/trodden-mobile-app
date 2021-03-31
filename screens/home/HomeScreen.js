import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Fetch } from "../../services/deviceStorage";
import { getNomads } from "../../store/actions/storeNomad";
import { getFeed } from "../../store/actions/getFeed";
import Colors from "../../theme/Colors";
import NewPost from "../../components/NewPostHome";
import HeaderButton from "../../components/HeaderButton";
import EmptyScreen from "../extra/EmptyScreen";
import LoadingScreen from "../extra/LoadingScreen";
import Memory from "../../components/Memory";

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const renderHeaderButton = useCallback(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Map"
            IconComponent={Ionicons}
            iconName="map-outline"
            color={Colors.primary}
            onPress={() => {}}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    renderHeaderButton();
  }, [renderHeaderButton]);

  const fetchOwner = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await getNomads(nomadId)(dispatch);
    } catch (error) {
      Alert.alert(
        "Oh My trod!",
        error.message ?? "Something went wrong. Please try again later",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      console.log("Error Happen", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await getFeed(nomadId)(dispatch);
      console.log("Fetching feed");
    } catch (error) {
      Alert.alert(
        "Oh My trod!",
        error.message ?? "Something went wrong. Please try again later",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      console.log("Error Happen", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOwner();
  }, [fetchOwner]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // const nomadStore = useSelector((state) => state.nomadStore);
  const feedStore = useSelector((state) => state.feedStore);

  // useEffect(() => console.log("Current user Data: " + nomadStore), []);

  const renderListHeader = () => (
    <NewPost onPress={() => props.navigation.navigate("newMemo")} />
  );

  const renderFeed = ({ item }) => <Memory type="feed" data={item} />;

  const handleRefresh = () => fetchFeed();

  if (loading) return <LoadingScreen />;

  return (
    <FlatList
      data={feedStore}
      renderItem={renderFeed}
      ListHeaderComponent={renderListHeader}
      ListEmptyComponent={() => <EmptyScreen />}
      style={styles.screen}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      refreshing={loading}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
