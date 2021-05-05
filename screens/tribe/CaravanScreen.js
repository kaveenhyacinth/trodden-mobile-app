import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, SafeAreaView, View, Image, Text } from "react-native";
import api from "../../api";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import BodyText from "../../components/ui/BodyText";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";
import LoadingScreen from "../info/LoadingScreen";

const Caravan = (props) => {
  const [loading, setloading] = useState(false);
  const [caravanData, setcaravanData] = useState({
    nomads: [],
  });

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

  useEffect(() => {
    const { params } = props.route;
    props.navigation.setOptions({
      title: `${params.name ?? "Caravan"}`,
    });
  }, [props.route, props.navigation]);

  useEffect(() => {
    fetchCaravan();
  }, [fetchCaravan]);

  if (loading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.screen}>
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
