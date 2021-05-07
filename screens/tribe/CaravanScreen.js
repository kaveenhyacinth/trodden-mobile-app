import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import api from "../../api";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import BodyText from "../../components/ui/BodyText";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";
import LoadingScreen from "../info/LoadingScreen";
import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import FloatingButton from "../../components/ui/FloatingButton";

const Caravan = (props) => {
  const [loading, setloading] = useState(false);
  const [caravanData, setcaravanData] = useState({
    nomads: [],
  });

  const nomadStore = useSelector((state) => state.nomadStore);

  const fetchCaravan = useCallback(async () => {
    try {
      setloading(true);
      const { params } = props.route;
      const { data } = await api.get.getcaravanById(params.id);
      console.log("Caravan Data", data);
      setcaravanData((prevState) => ({ ...prevState, ...data.result }));
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setloading(false);
    }
  }, [props.route]);

  const handleCreateBlazeNavigation = () => {
    props.navigation.navigate("NewBlaze", { id: caravanData._id });
  };

  useEffect(() => {
    const isOwner =
      caravanData.owner && caravanData.owner._id === nomadStore.data._id
        ? true
        : false;
    const { params } = props.route;
    props.navigation.setOptions({
      title: `${params.name ?? "Caravan"}`,
      headerRight: () =>
        caravanData.owner && (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Nomads"
              IconComponent={Ionicons}
              iconName="people-outline"
              color={Colors.primary}
              onPress={() =>
                props.navigation.navigate("CaravanNomads", {
                  nomads: caravanData.nomads,
                  owner: caravanData.owner,
                })
              }
            />
            {isOwner ? (
              <Item
                title="Settings"
                IconComponent={Ionicons}
                iconName="settings-outline"
                color={Colors.primary}
                onPress={() => {}}
              />
            ) : null}
          </HeaderButtons>
        ),
    });
  }, [props.route, props.navigation, caravanData]);

  useEffect(() => {
    fetchCaravan();
  }, [fetchCaravan]);

  const renderHeader = (caravanData) => (
    <View style={styles.screen}>
      <View style={styles.styleSection}></View>
      <View style={styles.infoSection}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: downloadImage(caravanData.display_img) }}
          />
        </View>
        <View style={styles.infoTextWrapper}>
          <BodyText style={styles.infoText}>{`${
            caravanData.nomads.length ?? 0
          } ${caravanData.nomads.length === 1 ? "Nomad" : "Nomads"}`}</BodyText>
          <BodyText style={styles.infoText}>{`${
            caravanData.nomads.length ?? 0
          } ${caravanData.nomads.length === 1 ? "Blaze" : "Blazes"}`}</BodyText>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => console.log("Rendering");

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={caravanData.nomads}
        renderItem={renderItem}
        ListHeaderComponent={() => renderHeader(caravanData)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <EmptyScreen />}
      />
      {caravanData.owner && caravanData.owner._id === nomadStore.data._id ? (
        <FloatingButton onPress={handleCreateBlazeNavigation} />
      ) : null}
    </SafeAreaView>
  );
};

export default Caravan;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  styleSection: {
    height: 80,
    backgroundColor: Colors.textOverlay,
  },
  infoSection: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  imageWrapper: {
    height: 100,
    width: 100,
    marginTop: -50,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  infoTextWrapper: {
    flexDirection: "row",
  },
  infoText: {
    marginRight: 20,
    color: Colors.info,
  },
});
