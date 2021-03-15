import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import EmptyScreen from "../extra/EmptyScreen";
import BodyText from "../../components/BodyText";
import InputBox from "../../components/InputBox";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const imageUrl = (uri) => `${Constants.manifest.extra.BASE_URL}/image/${uri}`;

const CommentsView = (props) => {
  const comments = props.comments;

  const renderCommentBubble = (comment) => {
    const commentor = comment.commentor;
    const content = comment.content;
    return (
      <View key={comment._id} style={styles.commentBubbleWrapper}>
        <View style={styles.commentImageContainer}>
          <Image
            style={styles.commentImage}
            source={{ uri: imageUrl(commentor.prof_img) }}
          />
        </View>
        <View style={styles.commentContentWrapper}>
          <BodyText
            style={styles.commentName}
          >{`${commentor.first_name} ${commentor.last_name}`}</BodyText>
          <BodyText style={styles.commentContent}>{content}</BodyText>
        </View>
      </View>
    );
  };

  const renderComments = () => {
    if (!comments || comments.length === 0) return <EmptyScreen />;

    return comments.map((comment) =>
      renderCommentBubble(comment)
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={props.onClose}>
          <Ionicons name="arrow-back-outline" size={25} color={Colors.info} />
        </Pressable>
        <View style={styles.titleWapper}>
          <BodyText style={styles.title}>Comments</BodyText>
        </View>
      </View>
      <ScrollView style={styles.commentsContainer}>
        {renderComments()}
      </ScrollView>
      <View style={styles.newCommentContainer}>
        <InputBox
          placeholder="Type a new comment"
          style={{ borderColor: Colors.accent }}
          containerStyle={{ width: SCREEN_WIDTH * 0.8 }}
          onChangeText={(value) => props.onInputChangeText(value)}
          value={props.inputValue}
          returnKeyType="send"
          onSubmitEditing={props.onSubmit}
        />
        <View style={styles.sendBtnWrapper}>
          <Pressable onPress={props.onSubmit}>
            <Ionicons name="send" size={30} color={Colors.primary} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  header: {
    height: 60,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: Colors.accent,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 5,
  },
  titleWapper: {
    marginHorizontal: 10,
  },
  title: {
    fontFamily: Typography.displayHeavy.fontFamily,
    letterSpacing: Typography.displayHeavy.letterSpacing,
    color: Colors.info,
    fontSize: 18,
  },
  commentsContainer: {
    flex: 1,
  },
  newCommentContainer: {
    height: 60,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderTopColor: Colors.outline,
    borderTopWidth: 1,
  },
  sendBtnWrapper: {
    height: "100%",
    justifyContent: "center",
  },
  commentBubbleWrapper: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.95,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  commentImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  commentImage: {
    width: "100%",
    height: "100%",
  },
  commentContentWrapper: {
    backgroundColor: Colors.backgroundOverlay,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  commentName: {
    ...Typography.bodyTextBold,
  },
  commentContent: {
    paddingVertical: 5,
  },
});

export default CommentsView;
