import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useSelector, useDispatch } from "react-redux";
import { fetchNomadSuggestions } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const NomadsExploreScreen = (props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const suggestionsStore = useSelector((state) => state.suggestionsStore);

  useEffect(() => {
    let isSubscribed = true;
    fetchSuggestions(isSubscribed);
    return () => (isSubscribed = false);
  }, [fetchSuggestions]);

  const fetchSuggestions = useCallback(
    async (isSubscribed) => {
      try {
        if (isSubscribed) {
          setLoading(true);
          const nomadId = await Fetch("nomadId");
          await fetchNomadSuggestions(nomadId)(dispatch);
        }
      } catch (error) {
        ErrorAlertModal(error.message, error);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    },
    [dispatch]
  );

  const handleNavigation = (id) => {
    props.navigation.navigate("Profile", { id });
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={() => handleNavigation(item._id)}
      onRefresh={fetchSuggestions}
      type="suggestion"
      data={item}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={suggestionsStore.nomads.data}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => fetchSuggestions()}
      />
    </SafeAreaView>
  );
};

export default NomadsExploreScreen;
