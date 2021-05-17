import React, { useState, useEffect, useCallback, useRef } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import api from "../../api";

const InboxScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [tribeData, setTribeData] = useState([]);
  const isComponentMounted = useRef(true);

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, [isComponentMounted]);

  useEffect(() => {
    fetchBondList();
  }, [fetchBondList]);

  const fetchBondList = useCallback(async () => {
    try {
      if (isComponentMounted) {
        setLoading(true);
        const nomadId = await Fetch("nomadId");
        const { data } = await api.get.getBondsList(nomadId);
        if (!data.success) throw new Error(data.msg);
        setTribeData([...data.result.tribe]);
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      if (isComponentMounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchBondList();
    });
    return unsubscribe;
  }, [props.navigation, fetchBondList]);

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={() => handleNavigation(item._id)}
      onRefresh={fetchBondList}
      data={item}
    />
  );

  const handleNavigation = (id) => {
    props.navigation.navigate("Profile", { id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={tribeData}
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
