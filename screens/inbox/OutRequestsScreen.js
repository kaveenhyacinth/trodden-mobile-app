import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchOutgoingReqs } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const OutgoingScreen = (props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const requestsStore = useSelector((state) => state.requestsStore);

  useEffect(() => {
    console.log("requestStore in comp", requestsStore);
  }, [requestsStore]);

  useEffect(() => {
    fetchOutgoingBonds();
  }, [fetchOutgoingBonds]);

  const fetchOutgoingBonds = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await fetchOutgoingReqs(nomadId)(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchOutgoingBonds();
    });

    return unsubscribe;
  }, [props.navigation, fetchOutgoingBonds]);

  const handleNavigation = () => {
    props.navigation.navigate("Profile");
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={handleNavigation}
      onRefresh={fetchOutgoingBonds}
      type="none"
      data={{ requestee: item }}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={requestsStore.outgoing.data}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => <EmptyScreen />}
        refreshing={loading}
        onRefresh={() => fetchOutgoingBonds()}
      />
    </SafeAreaView>
  );
};

export default OutgoingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
});
