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
    fetchSuggestions();
  }, [fetchSuggestions]);

  const fetchSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await fetchNomadSuggestions(nomadId)(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleNavigation = () => {
    props.navigation.navigate("Profile");
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={handleNavigation}
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
