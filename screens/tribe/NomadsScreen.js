import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList, Alert } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const InboxScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [bondsList, setBondsList] = useState([]);

  useEffect(() => {
    fetchBondList();
  }, [fetchBondList]);

  const fetchBondList = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      const response = await api.get.getBondsList(nomadId);
      if (!response.data.success)
        throw new Error("Something went wrong! Please try again later...");
      setBondsList(response.data.result);
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
        data={bondsList.tribe}
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
