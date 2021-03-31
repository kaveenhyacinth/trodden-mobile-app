import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Alert, Dimensions, Animated } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useSelector } from "react-redux";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api";
import TimelineScreen from "./TimelineScreen";
import TripsScreen from "./TripsScreen";
import LoadingScreen from "../info/LoadingScreen";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../../components/ui/BodyText";
import ProfileHeader from "../../components/headers/ProfileHeader";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 50;
const HEADER_HEIGHT = WINDOW_HEIGHT * 0.4;

const NomadProfileView = (props) => {
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [nomadState, setNomadState] = useState({
    memories: [],
    trips: [],
    tribe: [],
  });
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "Memories" },
    { key: "tab2", title: "Trips" },
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const tempNomadStore = useSelector((state) => state.tempNomadStore);

  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    fetchNomad();
  }, [fetchNomad]);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const fetchNomad = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get.getNomad(tempNomadStore.nomadId);
      if (!response.data.success) throw new Error(response.data.msg);

      props.navigation.setOptions({
        title: `@${response.data.result.username}`,
      });

      const nomadId = await Fetch("nomadId");
      if (nomadId == response.data.result._id) {
        setIsOwner(true);
      }

      setNomadState((prevState) => ({ ...prevState, ...response.data.result }));
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [tempNomadStore.nomadId]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HEADER_HEIGHT && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HEADER_HEIGHT) {
          if (
            listOffset.current[item.key] < HEADER_HEIGHT ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HEADER_HEIGHT,
                animated: false,
              });
              listOffset.current[item.key] = HEADER_HEIGHT;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolateRight: "clamp",
    });
    return (
      <Animated.View
        style={[styles.header, { transform: [{ translateY: y }] }]}
      >
        <ProfileHeader nomad={nomadState} />
      </Animated.View>
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <BodyText
        style={{
          ...styles.label,
          color: focused ? Colors.primary : Colors.outline,
        }}
      >
        {route.title}
      </BodyText>
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "tab1":
        return (
          <TimelineScreen
            authType="non-self"
            HeaderHeight={HEADER_HEIGHT}
            TabBarHeight={TAB_BAR_HEIGHT}
            scrollY={scrollY}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onGetRef={(ref) => {
              if (ref) {
                const found = listRefArr.current.find(
                  (e) => e.key === route.key
                );
                if (!found) {
                  listRefArr.current.push({
                    key: route.key,
                    value: ref,
                  });
                }
              }
            }}
          />
        );
      case "tab2":
        return <TripsScreen />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT, 0],
      extrapolateRight: "clamp",
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: "absolute",
          transform: [{ translateY: y }],
          width: "100%",
        }}
      >
        <TabBar
          {...props}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={(index) => setIndex(index)}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
        initialLayout={{
          height: 0,
          width: Dimensions.get("window").width,
        }}
      />
    );
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={{ flex: 1 }}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  label: { ...Typography.bodyText, color: Colors.primary },
  tab: { elevation: 2, shadowOpacity: 2, backgroundColor: Colors.accent },
  indicator: { backgroundColor: Colors.primary },
});

export default NomadProfileView;
