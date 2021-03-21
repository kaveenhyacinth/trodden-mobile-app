import React, { useRef } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const H_MAX_HEIGHT = 400;
const H_MIN_HEIGHT = 0;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const ProfilePage = (props) => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_MAX_HEIGHT],
    outputRange: [0, -H_MAX_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={10}
      >
        <View style={{ paddingTop: H_MAX_HEIGHT }}>
          <View style={{ padding: 20 }}>
            <Text>React Native Collapsible Header</Text>
          </View>

          <View style={{ padding: 20, height: 200, backgroundColor: "red" }}>
            <Text>View 1</Text>
          </View>

          <View style={{ padding: 20, height: 200, backgroundColor: "yellow" }}>
            <Text>View 1</Text>
          </View>

          <View style={{ padding: 20, height: 200, backgroundColor: "green" }}>
            <Text>View 1</Text>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: H_MAX_HEIGHT,
          transform: [{translateY: headerScrollHeight}],
          width: "100%",
          overflow: "hidden",
          // zIndex: 999,
          // STYLE
          borderBottomColor: "#EFEFF4",
          backgroundColor: "blue",
        }}
      >
        {/* <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={{ flex: 1 }}
          resizeMode={"contain"}
        /> */}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfilePage;
