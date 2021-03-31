import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Alert, BackHandler } from "react-native";
import { Fetch } from "../../services/deviceStorage";
import api from "../../api/api";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/NomadRequestTile";

const InboxScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [bondsList, setBondsList] = useState([]);

  useEffect(() => {
    loadBondList();
  }, []);

  useEffect(() => {
    console.log("Bond List", bondsList);
  }, [bondsList]);

  const loadBondList = async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      const response = await api.getBondsList(nomadId);
      if (!response.data.success)
        throw new Error("Something went wrong! Please try again later...");
      setBondsList((prevState) => response.data.result);
    } catch (error) {
      Alert.alert(
        "Oh My trod!",
        error.message ?? "Something went wrong. Please try again later",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      console.log("Error Happen", error);
    } finally {
      setLoading(false);
    }
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={handleNavigation}
      onRefresh={loadBondList}
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
        onRefresh={() => loadBondList()}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;
