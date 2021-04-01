import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchNomadsTribe } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const InboxScreen = (props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const tribeStore = useSelector((state) => state.tribeStore);

  useEffect(() => {
    fetchBondList();
  }, [fetchBondList]);

  const fetchBondList = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await fetchNomadsTribe(nomadId)(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={handleNavigation}
      onRefresh={fetchBondList}
      data={item}
    />
  );

  const handleNavigation = () => {
    props.navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={tribeStore.nomads.data.tribe}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => fetchBondList()}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;
