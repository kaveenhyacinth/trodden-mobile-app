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
import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import FloatingButton from "../../components/ui/FloatingButton";
import BlazeModal from "../../components/modals/BlazeModal";

const Caravan = (props) => {
  const [loading, setloading] = useState(false);
  const [blazesData, setBlazesData] = useState([]);
  const [caravanData, setcaravanData] = useState({
    nomads: [],
    blazes: [],
  });

  const nomadStore = useSelector((state) => state.nomadStore);

  const fetchCaravanAndBlazes = useCallback(async () => {
    try {
      setloading(true);
      const { params } = props.route;
      const { data } = await api.get.getcaravanById(params.id);
      setcaravanData((prevState) => ({ ...prevState, ...data.result }));
      const response = await api.get.getBlazesbyCaravan(data.result._id);
      console.log("blazes", response.data.result);
      setBlazesData([...response.data.result]);
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
                onPress={() =>
                  alert(
                    "This screen is provisioned to make the changes that are related to the Caravan such as changing interests, kick Nomads, delete Blazes, etc. But due to the time limitation, Developer did not allocate much time for this advance feature. But this feature will be available from the version 2.0, the next social release of the application. Thank you and sorry for the inconvenience!"
                  )
                }
              />
            ) : null}
          </HeaderButtons>
        ),
    });
  }, [props.route, props.navigation, caravanData]);

  useEffect(() => {
    fetchCaravanAndBlazes();
  }, [fetchCaravanAndBlazes]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchCaravanAndBlazes();
    });
    return unsubscribe;
  }, [props.navigation, fetchCaravanAndBlazes]);

  const renderHeader = (caravanData) => (
    <View style={[styles.screen, { marginBottom: 20 }]}>
      <View style={styles.styleSection}>
        <View style={styles.infoTextWrapper}>
          <BodyText style={styles.infoText}>{`${
            caravanData.nomads.length ?? 0
          } ${caravanData.nomads.length === 1 ? "Nomad" : "Nomads"}`}</BodyText>
          <BodyText style={styles.infoText}>{`${
            caravanData.blazes.length ?? 0
          } ${caravanData.blazes.length === 1 ? "Blaze" : "Blazes"}`}</BodyText>
        </View>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: downloadImage(caravanData.display_img) }}
          />
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.blazesContainer}>
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
        data={blazesData}
        renderItem={renderItem}
        ListHeaderComponent={() => renderHeader(caravanData)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <EmptyScreen />}
        refreshing={loading}
        onRefresh={fetchCaravanAndBlazes}
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
    marginTop: -80,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
  infoTextWrapper: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  infoText: {
    marginRight: 20,
    color: Colors.accent,
    fontSize: 16,
    fontWeight: "bold",
  },
  blazesContainer: {
    alignItems: "center",
  },
});
