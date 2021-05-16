import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const isComponentMounted = useRef(true);
  const dispatch = useDispatch();
  const suggestionsStore = useSelector((state) => state.suggestionsStore);

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, [isComponentMounted]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const fetchSuggestions = useCallback(async () => {
    try {
      if (isComponentMounted) {
        setLoading(true);
        const nomadId = await Fetch("nomadId");
        await fetchNomadSuggestions(nomadId)(dispatch);
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      if (isComponentMounted) setLoading(false);
    }
  }, [dispatch, isComponentMounted]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchSuggestions();
    });
    return unsubscribe;
  }, [props.navigation, fetchSuggestions]);

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
