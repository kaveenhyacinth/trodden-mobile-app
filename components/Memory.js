//#region Imports
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import Constants from "expo-constants";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import regexifyString from "regexify-string";
import { getOwnMemories, getNomadMemories } from "../store/actions/getMemories";
import { getFeed } from "../store/actions/userFeed";
import { Fetch } from "../services/deviceStorage";
import api from "../api/api";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "./BodyText";
import ImageGallary from "./ImageGallary";
import CommentsView from "../screens/views/CommentView";
//#endregion

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const imageUrl = (uri) => `${Constants.manifest.extra.BASE_URL}/image/${uri}`;
const videoUrl = (uri) => `${Constants.manifest.extra.BASE_URL}/video/${uri}`;

/**
 *
 * @param {Object} props
 * @requires type prop
 * @requires data prop
 */
const Memory = (props) => {
  const [postId] = useState(props.data._id);
  const [content] = useState(props.data.content);
  const [media] = useState(props.data.media);
  const [user] = useState(props.data.owner);
  const [destination] = useState(props.data.destination);
  const [comments] = useState(props.data.comments);
  const [heats] = useState(props.data.heats);
  const [heatCount, setHeatCount] = useState(heats.length);
  const [isReadMore, setIsReadMore] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isOpenComments, setisOpenComments] = useState(false);
  const [isHeated, setIsHeated] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleMarkLike = useCallback(async () => {
    try {
      const userId = await Fetch("nomadId");
      console.log("heats state", heats);
      const isHeated = heats.find((heat) => heat._id === userId);
      if (isHeated) return setIsHeated(true);
      return setIsHeated(false);
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
      console.log("Error Happen @handleLike", error);
    }
  }, [props.data.heats]);

  useEffect(() => {
    console.log("Call for likes", postId);
    handleMarkLike();
    setHeatCount(props.data.heats.length);
  }, [handleMarkLike, props.data.heats]);

  const dispatch = useDispatch();
  const tempNomadStore = useSelector((state) => state.tempNomadStore);

  const renderHashTags = (content) => {
    const regexp = new RegExp(/(^|\s)#[a-zA-Z0-9][\w-]*\b/g);
    const result = regexifyString({
      pattern: regexp,
      decorator: (match, index) => {
        return (
          <BodyText
            onPress={() => {
              alert(`This is ${match}`);
            }}
            key={index}
            style={{ color: Colors.primary }}
          >
            {match}
          </BodyText>
        );
      },
      input: content,
    });

    let textList = result.map((item) => {
      if (typeof item !== "string") {
        return item;
      } else {
        return (
          <BodyText key={result.indexOf(item) + Math.random()}>{item}</BodyText>
        );
      }
    });

    return textList;
  };

  const renderContent = () => {
    if (content.length < 100) {
      return <BodyText>{renderHashTags(content)}</BodyText>;
    }

    if (!isReadMore) {
      return (
        <>
          <BodyText>
            {renderHashTags(content.substr(0, 100))}
            {"..."}
          </BodyText>
          <Pressable onPress={() => setIsReadMore(true)}>
            <BodyText style={styles.colExpLink}>{"Read More >>"}</BodyText>
          </Pressable>
        </>
      );
    }

    return (
      <>
        <BodyText>{renderHashTags(content)}</BodyText>
        <Pressable onPress={() => setIsReadMore(false)}>
          <BodyText style={styles.colExpLink}>{"Collapse <<"}</BodyText>
        </Pressable>
      </>
    );
  };

  const renderGalary = (media) => {
    const type = media[0].type;
    if (type.includes("image")) {
      if (media.length > 1) return <ImageGallary media={media} />;
      return (
        <View style={styles.imagesWrapper}>
          {media.map((item) => (
            <Image
              style={styles.image}
              key={item._id}
              source={{
                uri: imageUrl(item.uri),
              }}
            />
          ))}
        </View>
      );
    }

    if (type.includes("video")) {
      return (
        <View style={styles.videoWrapper}>
          {media.map((item) => (
            <Video
              key={item._id}
              style={styles.image}
              source={{
                uri: videoUrl(item.uri),
              }}
              useNativeControls
              resizeMode="cover"
              isLooping={true}
            />
          ))}
        </View>
      );
    }
  };

  const handleLike = async () => {
    try {
      // Start mocking like dislike before real function to reduce delay
      isHeated
        ? setHeatCount((prevState) => prevState - 1)
        : setHeatCount((prevState) => prevState + 1);
      setIsHeated((prevState) => !prevState);
      // End mocking

      const userId = await Fetch("nomadId");
      const heatBody = {
        userId,
        postId,
      };
      const response = await api.postHeat(heatBody);
      if (!response.data.result)
        throw new Error("Something went wrong! Please try again!");

      console.log("new heat", response.data.result);

      // if (props.type === "self") await getOwnMemories(userId)(dispatch);
      // if (props.type === "feed") await getFeed(userId)(dispatch);
      // if (!props.type || props.type === "non-self")
      //   await getNomadMemories(tempNomadStore.nomadId)(dispatch);
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
      console.log("Error Happen @handleLike", error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment || newComment.length === 0) return;
    try {
      const nomadId = await Fetch("nomadId");
      const commentBody = {
        userId: nomadId,
        content: newComment,
        postId,
      };
      const response = await api.postComment(commentBody);
      if (!response.data.result)
        throw new Error("Something went wrong! Please try again!");
      setNewComment("");

      if (props.type === "self") await getOwnMemories(nomadId)(dispatch);
      if (props.type === "feed") await getFeed(nomadId)(dispatch);
      if (!props.type || props.type === "non-self")
        await getNomadMemories(tempNomadStore.nomadId)(dispatch);
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
      console.log("Error Happen @handlePostComment", error);
    }
  };

  return (
    <View style={styles.container} removeClippedSubviews>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Pressable onPress={() => {}}>
            <View style={styles.headerImageWrapper}>
              <Image
                style={styles.headerImage}
                source={{ uri: imageUrl(user.prof_img) }}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.midSection}>
          <BodyText
            style={styles.headerName}
          >{`${user.first_name} ${user.last_name}`}</BodyText>
          <Pressable onPress={() => {}}>
            <BodyText style={styles.headerLocation}>
              <FontAwesome5 name="map-marker-alt" color={Colors.primary} />
              {destination ? " " + destination.des_name : " Somewhere on Earth"}
            </BodyText>
          </Pressable>
        </View>
        <View style={styles.rightSection}>
          <Pressable
            onPress={() => setIsOpenSettings((prevState) => !prevState)}
          >
            <FontAwesome5 name="ellipsis-v" size={15} color={Colors.info} />
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>{renderContent()}</View>
      {renderGalary(media)}
      <View style={styles.statusBar}>
        <View style={styles.statusIconContainer}>
          <Pressable onPress={handleLike}>
            {isHeated ? (
              <Ionicons
                style={styles.statusIcon}
                size={30}
                color={Colors.primary}
                name="heart"
              />
            ) : (
              <Ionicons
                style={styles.statusIcon}
                size={30}
                color={Colors.outline}
                name="heart-outline"
              />
            )}
          </Pressable>
          <Pressable onPress={() => setisOpenComments(true)}>
            <Ionicons
              style={styles.statusIcon}
              size={25}
              color={Colors.outline}
              name="chatbubble-outline"
            />
          </Pressable>
        </View>
        <View style={styles.statusTextContainer}>
          <BodyText style={styles.statusText}>
            <Pressable>
              <BodyText style={styles.statusText}>
                {heatCount}
                {heatCount === 1 ? ` heart` : ` hearts`}
              </BodyText>
            </Pressable>
            {"  "}
            <Pressable onPress={() => setisOpenComments(true)}>
              <BodyText style={styles.statusText}>
                {comments.length}
                {comments.length === 1 ? ` comment` : ` comments`}
              </BodyText>
            </Pressable>
          </BodyText>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={isOpenComments}
        onRequestClose={() => setisOpenComments(false)}
      >
        <CommentsView
          inputValue={newComment}
          onInputChangeText={(value) => setNewComment(value)}
          onSubmit={() => handlePostComment()}
          onClose={() => setisOpenComments(false)}
          comments={comments}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    width: SCREEN_WIDTH,
    marginVertical: 6,
    //#region IOS Elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    //#endregion
    elevation: 2,
  },
  header: {
    // backgroundColor: "#fcc",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  leftSection: {
    height: 50,
    width: SCREEN_WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImageWrapper: {
    height: "100%",
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  headerImage: {
    width: 50,
    height: "100%",
  },
  midSection: {
    width: SCREEN_WIDTH * 0.7,
  },
  headerName: {
    ...Typography.bodyTextBold,
    fontSize: 18,
  },
  headerLocation: {
    fontSize: 14,
    color: Colors.info,
  },
  rightSection: {
    width: SCREEN_WIDTH * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 10,
  },
  colExpLink: {
    ...Typography.bodyTextBold,
    color: Colors.primary,
    fontSize: 14,
  },
  imagesWrapper: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  videoWrapper: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  image: {
    flex: 1,
  },
  statusBar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statusIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 10,
  },
  statusText: {
    color: Colors.info,
    fontSize: 14,
  },
});

export default Memory;
