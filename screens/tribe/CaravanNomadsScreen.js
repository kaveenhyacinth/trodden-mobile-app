import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import BodyText from "../../components/ui/BodyText";
import Colors from "../../theme/Colors";

const CaravanNomadsScreen = ({ navigation, route }) => {
  const [nomads, setnomads] = useState(route.params.nomads);
  const [owner, setowner] = useState(route.params.owner);
  const [refresh, setRefresh] = useState(0);

  const nomadStore = useSelector((state) => state.nomadStore);

  useEffect(() => {
    setnomads([...route.params.nomads]);
    setowner((prevState) => ({ ...prevState, ...route.params.owner }));
  }, [route.params, refresh]);

  const handleRequestTileNavigation = (id) => {
    navigation.navigate("Profile", { id });
  };

  const handleOnRefresh = () => {
    console.log("Refreshing...");
    setRefresh((prevState) => prevState + 1);
  };

  const renderHeader = () => {
    const isBonded = nomadStore.data.tribe.findIndex(
      (nomad) => nomad._id === owner._id
    );
    let tileType = "suggestion";

    if (isBonded !== -1) tileType = "regular";

    if (nomadStore.data._id === owner._id) tileType = "own";

    return (
      <View>
        <BodyText style={styles.text}>Admin</BodyText>
        <NomadRequestTile
          onNavigate={() => handleRequestTileNavigation(owner._id)}
          onRefresh={handleOnRefresh}
          type={tileType}
          data={owner}
        />
        <BodyText style={styles.text}>Nomads</BodyText>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isBonded = nomadStore.data.tribe.findIndex(
      (nomad) => nomad._id === item._id
    );
    if (nomadStore.data._id === item._id) return;
    if (owner._id === item._id) return;

    let tileType = "suggestion";

    if (isBonded !== -1) tileType = "regular";

    console.log("isBonded", isBonded);
    return (
      <NomadRequestTile
        onNavigate={() => handleRequestTileNavigation(item._id)}
        onRefresh={handleOnRefresh}
        type={tileType}
        data={item}
      />
    );
  };
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={nomads}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default CaravanNomadsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  text: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.info,
    fontWeight: "bold",
  },
});
