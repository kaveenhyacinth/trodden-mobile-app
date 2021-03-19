import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Fetch } from "../../services/deviceStorage";
import { nomadSuggestions } from "../../store/actions/getSuggestions";
import ScreenView from "../../components/ScreenView";
import EmptyScreen from "../extra/EmptyScreen";
import LoadingScreen from "../extra/LoadingScreen";
import EmptyLoadingScreen from "../extra/EmptyLoadingScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/NomadRequestTile";

const NomadsExploreScreen = (props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    loadSuggestions();
  }, []);

  const suggestionsStore = useSelector((state) => state.suggestionsStore);

  useEffect(() => {
    console.log("Nomad Suggestions", suggestionsStore.nomads);
  }, [suggestionsStore]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await nomadSuggestions(nomadId)(dispatch);
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
      onRefresh={loadSuggestions}
      type="suggestion"
      data={item}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={suggestionsStore.nomads}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => loadSuggestions()}
      />
    </SafeAreaView>
  );
};

export default NomadsExploreScreen;
