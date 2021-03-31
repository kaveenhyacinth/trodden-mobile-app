import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Alert, Dimensions, Animated } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import { resetMomeries } from "../../store/actions/getMemories";
import { Delete } from "../../helpers/deviceStorageHandler";
import TimelineScreen from "./TimelineScreen";
import TripsScreen from "./TripsScreen";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ProfileHeader from "../../components/headers/ProfileHeader";
import BodyText from "../../components/ui/BodyText";
import HeaderButton from "../../components/ui/CustomHeaderButton";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

const OwnerProfileView = (props) => {
  const [loading, setLoading] = useState(true);
  const [tabIndex, setIndex] = useState(0);
  const [tabBarHeight] = useState(50);
  const [headerHeight] = useState(WINDOW_HEIGHT * 0.4);
  const [routes] = useState([
    { key: "tab1", title: "Memories" },
    { key: "tab2", title: "Trips" },
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const navigatorProps = useNavigation();
  const nomadStore = useSelector((state) => state.nomadStore);

  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    console.log("WIndows Height", WINDOW_HEIGHT);
    console.log("Header Height", headerHeight);
    console.log("Tab Height", tabBarHeight);
  }, [WINDOW_HEIGHT, headerHeight, tabBarHeight]);

  useEffect(() => {
    repaintHeaderButtons();
    repaintHeaderTitle();
  }, [repaintHeaderButtons, repaintHeaderTitle]);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const repaintHeaderButtons = useCallback(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Settings"
            IconComponent={Ionicons}
            iconName="settings-outline"
            color={Colors.primary}
            onPress={() => {}}
          />
          <Item
            title="Log Out"
            IconComponent={Ionicons}
            iconName="log-out-outline"
            color={Colors.primary}
            onPress={handleConfirmSignOut}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const repaintHeaderTitle = useCallback(() => {
    props.navigation.setOptions({
      title: `@${nomadStore.username ?? "..."}`,
    });
  }, [nomadStore.username]);

  const handleConfirmSignOut = () => {
    Alert.alert(
      "Do you want to log-out?",
      `We are going to miss you ${nomadStore.first_name}!`,
      [
        {
          text: "Yes",
          style: "default",
          onPress: () => handleSignOut(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleSignOut = async () => {
    try {
      await Delete("refToken");
      await Delete("signToken");
      await Delete("nomadId");
      dispatch(resetMomeries());
      navigatorProps.dangerouslyGetParent().replace("auth");
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < headerHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= headerHeight) {
          if (
            listOffset.current[item.key] < headerHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                animated: false,
              });
              listOffset.current[item.key] = headerHeight;
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
      inputRange: [0, headerHeight],
      outputRange: [0, -headerHeight],
      extrapolateRight: "clamp",
    });
    return (
      <Animated.View
        style={[styles.header, { transform: [{ translateY: y }] }]}
      >
        <ProfileHeader nomad={nomadStore} />
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
            authType="self"
            headerHeight={headerHeight}
            tabBarHeight={tabBarHeight}
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
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
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
    height: WINDOW_HEIGHT * 0.4,
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

export default OwnerProfileView;
