import React, { useEffect, useCallback, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../api";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import BigButtonLight from "../../components/ui/BigButtonLight";
import BigButton from "../../components/ui/BigButton";
import BodyText from "../../components/ui/BodyText";
import ScreenView from "../../components/ui/ScreenView";
import TitleText from "../../components/ui/TitleText";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import LoadingScreen from "../info/LoadingScreen";
import Typography from "../../theme/Typography";
import { Fetch } from "../../helpers/deviceStorageHandler";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const BlazeScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [blazeData, setBlazeData] = useState({});
  const [isJoined, setIsJoined] = useState(false);

  const isComponentMounted = useRef(true);

  const fetchBlaze = useCallback(
    async (isSubscribed) => {
      try {
        setLoading(true);
        if (!isSubscribed) return;
        const { data } = await api.get.getBlazeById(route.params.id);
        if (!data.success) throw new Error(data.msg);
        setBlazeData((prevState) => ({ ...prevState, ...data.result }));
        const userId = await Fetch("nomadId");
        const isSeemJoined = data.result.participants.findIndex(
          (participant) => participant._id === userId
        );
        if (isSeemJoined !== -1) setIsJoined(true);
      } catch (error) {
        ErrorAlertModal(error.message, error);
      } finally {
        setLoading(false);
      }
    },
    [route.params.id]
  );

  useEffect(() => {
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [route]);

  useEffect(() => {
    fetchBlaze(isComponentMounted);
  }, [fetchBlaze]);

  if (loading) return <LoadingScreen />;

  return (
    <ScreenView>
      <View style={styles.imageWrapper}>
        <Image
          style={{ flex: 1 }}
          source={{ uri: downloadImage(blazeData.image) }}
        />
      </View>
      <View style={styles.infoWrapper}>
        <BodyText style={styles.date}>
          {new Date(blazeData.date).toDateString()}
        </BodyText>
        <TitleText style={styles.title}>{blazeData.title}</TitleText>
        <BodyText style={styles.location}>
          {blazeData.location && blazeData.location.des_name}
        </BodyText>
      </View>
      <View style={styles.buttonWrapper}>
        {isJoined ? (
          <BigButton disabled={true} style={styles.button}>
            Joined
          </BigButton>
        ) : (
          <BigButtonLight style={styles.button}>Join Blaze</BigButtonLight>
        )}
      </View>
      <View style={styles.infoWrapper}>
        <View style={styles.info}>
          <Ionicons name="people" size={20} color={Colors.info} />
          <BodyText style={styles.text}>{`${
            blazeData.participants && blazeData.participants.length
          } Joined`}</BodyText>
        </View>
        <View style={styles.info}>
          <Ionicons name="bonfire" size={20} color={Colors.info} />
          <BodyText style={styles.text}>{`Blaze by ${
            blazeData.caravan && blazeData.caravan.caravan_name
          }`}</BodyText>
        </View>
        <View style={styles.info}>
          <Ionicons name="location" size={20} color={Colors.info} />
          <BodyText style={styles.text}>
            {blazeData.location && blazeData.location.des_name}
          </BodyText>
        </View>
        <View style={styles.descWrapper}>
          <BodyText style={styles.details}>Details</BodyText>
          <BodyText style={styles.desc}>{blazeData.desc}</BodyText>
        </View>
      </View>
    </ScreenView>
  );
};

export default BlazeScreen;

const styles = StyleSheet.create({
  screen: {},
  imageWrapper: {
    width: WINDOW_WIDTH,
    height: (WINDOW_WIDTH / 16) * 9,
  },
  infoWrapper: {
    width: WINDOW_WIDTH,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    marginVertical: 0,
    fontSize: 28,
  },
  date: {
    color: Colors.red,
    fontSize: 16,
    textTransform: "uppercase",
  },
  location: {
    fontWeight: "bold",
    color: Colors.info,
    fontSize: 16,
  },
  going: {
    color: Colors.info,
    fontSize: 13,
  },
  buttonWrapper: {
    width: WINDOW_WIDTH - 20,
    marginVertical: 10,
  },
  button: {},
  info: {
    flexDirection: "row",
    width: WINDOW_WIDTH,
    marginVertical: 5,
  },
  text: {
    marginLeft: 15,
    ...Typography.bodyTextBold,
    color: Colors.info,
    width: "80%",
  },
  descWrapper: {
    paddingHorizontal: 5,
    marginTop: 15,
    paddingTop: 15,
    borderColor: Colors.outline,
    borderTopWidth: 1,
  },
  details: {
    ...Typography.bodyTextBold,
    fontSize: 20,
    marginBottom: 10,
  },
  desc: {},
});
