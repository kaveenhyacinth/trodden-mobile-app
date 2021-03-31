import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api/";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const InboxScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [incomingBonds, setIncomingBonds] = useState([]);

  useEffect(() => {
    fetchIncomingBonds();
  }, [fetchIncomingBonds]);

  const fetchIncomingBonds = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      const response = await api.get.getIncomingBonds(nomadId);
      if (!response.data.success)
        throw new Error("Something went wrong! Please try again later...");
      setIncomingBonds(response.data.result);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleNavigation = () => {
    props.navigation.navigate("Profile");
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={handleNavigation}
      onRefresh={fetchIncomingBonds}
      type="confirm"
      data={item}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={incomingBonds}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => fetchIncomingBonds()}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;
