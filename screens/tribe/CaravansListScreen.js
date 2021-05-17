import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  View,
} from "react-native";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import FloatingButton from "../../components/ui/FloatingButton";
import ScreenView from "../../components/ui/ScreenView";
import TitleText from "../../components/ui/TitleText";
import { Fetch } from "../../helpers/deviceStorageHandler";
import EmptyScreen from "../info/EmptyScreen";
import api from "../../api";
import Colors from "../../theme/Colors";
import CaravanListTileModal from "../../components/modals/CaravanListTileModal";
import Typography from "../../theme/Typography";

const CaravanScreen = (props) => {
  const [loading, setloading] = useState(false);
  const [caravans, setcaravans] = useState([]);

  const componentIsMounted = useRef(true);

  const fetchCaravans = useCallback(async () => {
    try {
      setloading(true);
      const userId = await Fetch("nomadId");
      const { data } = await api.get.getUserCaravans(userId);
      if (!data.success) throw new Error(data.msg);
      const ownCaravans = data.result.filter(
        (caravan) => caravan.owner._id === userId
      );
      const memberCaravans = data.result.filter(
        (caravan) => caravan.owner._id !== userId
      );
      const sections = [
        {
          title: "Own Caravans",
          data: ownCaravans,
        },
        {
          title: "Joined Caravans",
          data: memberCaravans,
        },
      ];
      setcaravans((prevState) => sections);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setloading(false);
    }
  }, []);

  const handleNavigation = () => {
    props.navigation.navigate("NewCaravan");
  };

  const renderTiles = ({ item }) => (
    <CaravanListTileModal
      caravan={item}
      onNavigate={() => {
        props.navigation.navigate("Caravan", {
          name: item.caravan_name,
          id: item._id,
        });
      }}
      onRefresh={fetchCaravans}
      navigation={props.navigation}
    />
  );

  const renderHeaders = (title) => (
    <TitleText style={styles.header}>{title}</TitleText>
  );

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchCaravans();
    });
    return unsubscribe;
  }, [props.navigation, fetchCaravans]);

  useEffect(() => {
    if (componentIsMounted) {
      fetchCaravans();
    }
  }, [fetchCaravans]);

  return (
    <SafeAreaView style={styles.screen}>
      <SectionList
        style={styles.sectionList}
        sections={caravans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTiles}
        renderSectionHeader={({ section: { title } }) => renderHeaders(title)}
      />
      <FloatingButton onPress={handleNavigation} />
    </SafeAreaView>
  );
};

export default CaravanScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.accent,
  },
  sectionList: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    color: Colors.info,
    backgroundColor: Colors.background,
    padding: 10,
  },
});
