import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Alert } from "react-native";
import { Fetch } from "../../services/deviceStorage";
import api from "../../api/api";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/NomadRequestTile";

const InboxScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [incomingBonds, setIncomingBonds] = useState([]);

  useEffect(() => {
    loadIncomingBonds();
  }, []);

  const loadIncomingBonds = async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      const response = await api.getIncomingBonds(nomadId);
      if (!response.data.success)
        throw new Error("Something went wrong! Please try again later...");
      setIncomingBonds((prevState) => response.data.result);
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

  const handleNavigation = () => {
    props.navigation.navigate("Profile");
  };

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={handleNavigation}
      onRefresh={loadIncomingBonds}
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
        onRefresh={() => loadIncomingBonds()}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;
