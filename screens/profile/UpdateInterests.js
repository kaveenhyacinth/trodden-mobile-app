import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchInterests, fetchNomadProfile } from "../../redux";
import InterestGridTile from "../../components/modals/InterestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import BigButton from "../../components/ui/BigButton";
import api from "../../api";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import Colors from "../../theme/Colors";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const UpdateInterests = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const nomadStore = useSelector((state) => state.nomadStore);
  const interetsStore = useSelector((state) => state.interestsStore);
  const dispatch = useDispatch();

  const fetchInterestsFromApi = useCallback(async () => {
    try {
      await fetchInterests()(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  }, []);

  const handleSelectInterests = (id) => {
    const prevSelectedInterest = selectedInterests.find(
      (interest) => interest === id
    );

    if (prevSelectedInterest !== undefined) {
      setSelectedInterests((prevState) =>
        prevState.filter((interest) => interest !== id)
      );
    } else {
      setSelectedInterests((prevState) => [...prevState, id]);
    }
  };

  const renderInterests = ({ item }) => {
    let isSelected = false;
    const index = nomadStore.data.interests.findIndex(
      (interest) => interest._id === item._id
    );

    if (index !== -1) isSelected = true;
    return (
      <InterestGridTile
        key={item._id.toString()}
        title={item.title}
        imageUrl={item.image}
        onSelect={() => handleSelectInterests(item._id)}
        isSelected={isSelected}
      />
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const body = {
        userId: nomadStore.data._id,
        interests: selectedInterests,
      };
      const { data } = await api.put.updateUserInterests(body);
      if (!data.success) throw new Error(data.msg);
      await fetchNomadProfile(nomadStore.data._id)(dispatch);
      props.navigation.goBack();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          {loading ? (
            <Item title="Updating..." color={Colors.primary} />
          ) : (
            <Item
              title="Update"
              color={Colors.primary}
              onPress={handleSubmit}
            />
          )}
        </HeaderButtons>
      ),
    });
  }, [props.navigation, handleSubmit, loading]);

  useEffect(() => {
    nomadStore.data.interests.map((interest) =>
      setSelectedInterests((prevState) => [...prevState, interest._id])
    );
  }, [nomadStore.data.interests]);

  useEffect(() => {
    console.log("Interests selected", selectedInterests);
  }, [selectedInterests]);

  useEffect(() => {
    fetchInterestsFromApi();
  }, [fetchInterestsFromApi]);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={interetsStore.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderInterests}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default UpdateInterests;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
