import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomingReqs } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const IncommingScreen = (props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const requestsStore = useSelector((state) => state.requestsStore);

  useEffect(() => {
    fetchIncomingBonds();
  }, [fetchIncomingBonds]);

  const fetchIncomingBonds = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await fetchIncomingReqs(nomadId)(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchIncomingBonds();
    });

    return unsubscribe;
  }, [props.navigation, fetchIncomingBonds]);

  const handleNavigation = (id) => {
    props.navigation.navigate("Profile", { id });
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={() => handleNavigation(item.owner._id)}
      onRefresh={fetchIncomingBonds}
      type="confirm"
      data={item}
      requestId={item._id}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={requestsStore.incoming.data}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => <EmptyScreen />}
        refreshing={loading}
        onRefresh={fetchIncomingBonds}
      />
    </SafeAreaView>
  );
};

export default IncommingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
});
