import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Fetch } from "../../services/deviceStorage";
import { downloadImage } from "../../services/mediaService";
import api from "../../api/api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../../components/BodyText";
import ScreenView from "../../components/ScreenView";
import LoadingScreen from "../../screens/extra/LoadingScreen";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

/**
 * @requires navigation
 * @requires type ["self", "non-self"]
 */
const NomadAboutProfileView = (props) => {
  const [loading, setLoading] = useState(true);
  const [nomad, setNomad] = useState({
    trips: [],
    memories: [],
    tribe: [],
  });
  const [isOwner, setIsOwner] = useState(false);

  const tempNomadStore = useSelector((state) => state.tempNomadStore);
  const nomadStore = useSelector((state) => state.nomadStore);

  useEffect(() => {
    if (props.type === "self") {
      handleGetSelfNomad();
    }

    if (!props.type || props.type === "non-self") {
      handleGetNonSelfNomad();
    }

    console.log("Called in NomadProfAboutView");
  }, [nomadStore]);

  const handleGetSelfNomad = async () => {
    try {
      setLoading(true);
      // Set navigation header to username
      props.navigation.setOptions({
        title: `@${nomadStore.username}`,
      });

      // Set isOwner if owner
      const nomadId = await Fetch("nomadId");
      if (nomadId === nomadStore._id) {
        setIsOwner(true);
      }

      // Set temp nomad
      setNomad((prevState) => ({ ...prevState, ...nomadStore }));
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

  const handleGetNonSelfNomad = async () => {
    try {
      setLoading(true);
      const response = await api.getNomad(tempNomadStore.nomadId);
      if (!response.data.success) throw new Error(response.data.msg);

      // Set navigation header to username
      props.navigation.setOptions({
        title: `@${response.data.result.username}`,
      });

      // Set isOwner if owner
      const nomadId = await Fetch("nomadId");
      if (nomadId == response.data.result._id) {
        setIsOwner(true);
      }

      // Set temp nomad
      setNomad((prevState) => ({ ...prevState, ...response.data.result }));
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

  if (loading) return <LoadingScreen />;

  return (
    <ScreenView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: downloadImage(nomad.prof_img),
              }}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <BodyText style={styles.name} numberOfLines={2}>
            {`${nomad.first_name} ${nomad.last_name}`}
          </BodyText>
          <BodyText style={styles.username}>{`@${nomad.username}`}</BodyText>
          <BodyText style={styles.country}>
            <FontAwesome5 name="map-marker-alt" />{" "}
            {`${nomad.city}, ${nomad.country}`}
          </BodyText>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>
              {nomad.memories.length < 10
                ? `0${nomad.memories.length}`
                : nomad.memories.length}
            </BodyText>
            <BodyText style={styles.infoText}>
              {nomad.memories.length === 1 ? "Memo" : "Memos"}
            </BodyText>
          </View>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>
              {nomad.trips.length < 10
                ? `0${nomad.trips.length}`
                : nomad.trips.length}
            </BodyText>
            <BodyText style={styles.infoText}>
              {nomad.trips.length === 1 ? "Trip" : "Trips"}
            </BodyText>
          </View>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>
              {nomad.tribe.length < 10
                ? `0${nomad.tribe.length}`
                : nomad.tribe.length}
            </BodyText>
            <BodyText style={styles.infoText}>
              {nomad.tribe.length === 1 ? "Bond" : "Bonds"}
            </BodyText>
          </View>
        </View>
        <View style={styles.bio}>
          <BodyText style={styles.bioText}>{nomad.prof_bio}</BodyText>
        </View>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  topSection: {
    height: SCREEN_HEIGHT * 0.2,
    flexDirection: "row",
  },
  bottomSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftSection: {
    width: SCREEN_WIDTH * 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SCREEN_WIDTH * 0.05,
  },
  rightSection: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  imageWrapper: {
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    borderWidth: 4,
    borderColor: Colors.primary,
    borderRadius: SCREEN_WIDTH * 0.15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.background,
    paddingVertical: 10,
  },
  info: {
    marginRight: SCREEN_WIDTH * 0.05,
    marginBottom: 10,
  },
  infoText: {
    ...Typography.bodyTextBold,
    color: Colors.info,
    textAlign: "center",
    fontSize: 18,
  },
  name: {
    ...Typography.bodyTextBold,
    fontSize: 20,
  },
  username: {
    color: Colors.primary,
    fontSize: 16,
  },
  country: {
    color: Colors.info,
  },
  bio: {
    width: SCREEN_WIDTH,
    paddingVertical: 15,
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  bioText: {
    color: Colors.info,
    textAlign: "center",
  },
});

export default NomadAboutProfileView;
