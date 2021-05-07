import React, { useState, useEffect, useCallback } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native";
import api from "../../api";
import BlazeModal from "../../components/modals/BlazeModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import { Fetch } from "../../helpers/deviceStorageHandler";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";

const BlazesScreen = (props) => {
  const [blazeData, setBlazeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJoinedBlazes = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await Fetch("nomadId");
      const { data } = await api.get.getJoinedBlazes(userId);
      if (!data.success) throw new Error(data.msg);
      setBlazeData([...data.result]);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoinedBlazes();
  }, [fetchJoinedBlazes]);

  const renderItem = ({ item }) => (
    <View>
      <BlazeModal
        data={item}
        onNavigate={() =>
          props.navigation.navigate("Blaze", {
            id: item._id,
            title: item.title,
          })
        }
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={blazeData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <EmptyScreen />}
        onRefresh={fetchJoinedBlazes}
        refreshing={loading}
      />
    </SafeAreaView>
  );
};

export default BlazesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
});
