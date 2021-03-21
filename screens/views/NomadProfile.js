import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const TabBarHeight = 50;
const HeaderHeight = WINDOW_HEIGHT * 0.4;
// can ignore later
const tab1ItemSize = WINDOW_WIDTH - 30;
const tab2ItemSize = WINDOW_WIDTH - 30;

const TabScene = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const windowHeight = WINDOW_HEIGHT;

  return (
    <Animated.FlatList
      scrollToOverflowEnabled={true}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        paddingHorizontal: 10,
        minHeight: windowHeight - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const CollapsibleTabView = (props) => {
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "Timeline" },
    { key: "tab2", title: "Trips" },
  ]);
  const [tab1Data] = useState(Array(40).fill(0));
  const [tab2Data] = useState(Array(30).fill(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

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
        {/* TODO: Add header styles here */}
        <Text>{"Header"}</Text>
      </Animated.View>
    );
  };

  // TODO: Memory comes here
  const rednerTab1Item = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 16,
          marginLeft: index % 2 === 0 ? 0 : 10,
          width: tab1ItemSize,
          height: tab1ItemSize,
          backgroundColor: "#aaa",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{index}</Text>
      </View>
    );
  };

  // TODO: Trip comes here
  const rednerTab2Item = ({ item, index }) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 0 : 10,
          borderRadius: 16,
          width: tab2ItemSize,
          height: tab2ItemSize,
          backgroundColor: "#aaa",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{index}</Text>
      </View>
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case "tab1":
        numCols = 1;
        data = tab1Data;
        renderItem = rednerTab1Item;
        break;
      case "tab2":
        numCols = 1;
        data = tab2Data;
        renderItem = rednerTab2Item;
        break;
      default:
        return null;
    }
    return (
      <TabScene
        numCols={numCols}
        data={data}
        renderItem={renderItem}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
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
  label: { ...Typography.bodyText, fontSize: 16, color: Colors.primary },
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: Colors.accent },
  indicator: { backgroundColor: Colors.primary },
});

export default CollapsibleTabView;
