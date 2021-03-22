import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useSelector } from "react-redux";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../../components/BodyText";
import ProfileHeader from "../../components/ProfileHeader";
import TimelineScreen from "./TimelineScreen";
import BlazesScreen from "./BlazesScreen";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const TabBarHeight = 50;
const HeaderHeight = WINDOW_HEIGHT * 0.4;

const OwnerProfileView = (props) => {
  const [loading, setLoading] = useState(true);
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "Memories" },
    { key: "tab2", title: "Trips" },
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  const nomadStore = useSelector((state) => state.nomadStore);

  const updateHeaderTitle = useCallback(() => {
    props.navigation.setOptions({
      title: `@${nomadStore.username ?? "..."}`,
    });
  }, [props.navigation, nomadStore.username]);

  useEffect(() => {
    updateHeaderTitle();
  }, [updateHeaderTitle]);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
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
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
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
            HeaderHeight={HeaderHeight}
            TabBarHeight={TabBarHeight}
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
        return <BlazesScreen />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
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
    height: HeaderHeight,
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
