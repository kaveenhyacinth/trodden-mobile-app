import React, { useState, useEffect, useCallback, useRef } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useSelector, useDispatch } from "react-redux";
import { fetchCaravanSuggestions } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import CaravanListTile from "../../components/modals/CaravanListTileModal";
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
    fetchSuggestions(isComponentMounted);
  }, [fetchSuggestions]);

  const fetchSuggestions = useCallback(
    async (isSubscribed) => {
      try {
        if (isSubscribed) {
          setLoading(true);
          const nomadId = await Fetch("nomadId");
          await fetchCaravanSuggestions(nomadId)(dispatch);
        }
      } catch (error) {
        ErrorAlertModal(error.message, error);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    },
    [dispatch]
  );

  const renderCaravans = ({ item }) => (
    <CaravanListTile
      type="explore"
      caravan={item}
      navigation={props.navigation}
      onRefresh={() => fetchSuggestions(isComponentMounted)}
      onNavigate={() => {
        props.navigation.navigate("Caravan", {
          name: item.caravan_name,
          id: item._id,
        });
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={suggestionsStore.caravans.data}
        renderItem={renderCaravans}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => fetchSuggestions()}
      />
    </SafeAreaView>
  );
};

export default NomadsExploreScreen;
