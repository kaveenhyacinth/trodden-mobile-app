import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Pressable,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import regexifyString from "regexify-string";
import { useDispatch } from "react-redux";
import { fetchNomadMemories, fetchNomadLookup, fetchFeed } from "../../redux";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api/index";
import { downloadImage, downloadVideo } from "../../helpers/mediaHandler";
import { timeDifference } from "../../helpers/timeStampEngine";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";
import ImageGallary from "../ui/ImageGallary";
import CommentsModal from "./CommentsModal";
import ErrorAlertModal from "./ErrorAlertModal";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const MemoryModal = (props) => {
  const [data, setData] = useState(props.data);
  const [heatCount, setHeatCount] = useState(props.data.heats.length);
  const [isReadMore, setIsReadMore] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isOpenComments, setisOpenComments] = useState(false);
  const [isHeated, setIsHeated] = useState(false);
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setData({ ...props.data });
    setHeatCount(props.data.heats.length);
  }, [props.data, props.data.heats.length]);

  // Paint like button
  useEffect(() => {
    (async () => {
      try {
        const userId = await Fetch("nomadId");
        const heated = data.heats.find((heat) => heat._id === userId);
        if (heated) return setIsHeated(true);
        setIsHeated(false);
        setHeatCount(data.heats.length);
        return;
      } catch (error) {
        ErrorAlertModal(error.message, error);
      }
    })();
  }, [data.heats]);

  const handleTagNavigator = (tag) => {
    props.navigation.navigate("tagFeed", { tag });
  };

  const handleLocationNavigator = (location) => {
    props.navigation.navigate("locationBlazes", {
      locationId: location._id,
      locationName: location.des_name,
    });
  };

  const handleProfileNavigator = async (id) => {
    try {
      const nomadId = await Fetch("nomadId");
      if (data.owner._id === nomadId) {
        props.navigation.navigate("Profile");
      } else {
        props.navigation.navigate("profile", { id });
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  const renderHashTags = (content) => {
    const regexp = new RegExp(/(^|\s)#[a-zA-Z0-9][\w-]*\b/g);
    const result = regexifyString({
      pattern: regexp,
      decorator: (match, index) => {
        return (
          <BodyText
            onPress={() => handleTagNavigator(match)}
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

  const renderContent = (content) => {
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
                uri: downloadImage(item.uri),
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
                uri: downloadVideo(item.uri),
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
      const userId = await Fetch("nomadId");
      const heatBody = {
        userId,
        postId: data._id,
      };
      const response = await api.patch.postHeat(heatBody);
      if (!response.data.success)
        throw new Error("Something went wrong! Please try again!");

      console.log("new heat", response.data.result);

      const newHeats = response.data.result.heats;
      setIsHeated((prevState) => !prevState);
      setHeatCount(newHeats.length);

      if (props.type === "self" || props.type === "feed")
        await fetchNomadMemories(userId)(dispatch);
      if (props.type === "non-self")
        await fetchNomadLookup(data.owner._id)(dispatch);
      await fetchFeed(userId)(dispatch);
      return;
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment || newComment.length === 0) return;
    try {
      const nomadId = await Fetch("nomadId");
      const commentBody = {
        userId: nomadId,
        content: newComment,
        postId: data._id,
      };
      const response = await api.patch.postComment(commentBody);
      if (!response.data.success)
        throw new Error("Something went wrong! Please try again!");
      setNewComment("");

      if (props.type === "self" || props.type === "feed")
        await fetchNomadMemories(nomadId)(dispatch);
      if (props.type === "non-self")
        await fetchNomadLookup(data.owner._id)(dispatch);
      await fetchFeed(nomadId)(dispatch);
      return;
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  if (data === {}) return <></>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Pressable onPress={() => handleProfileNavigator(data.owner._id)}>
            <View style={styles.headerImageWrapper}>
              <Image
                style={styles.headerImage}
                source={{ uri: downloadImage(data.owner.prof_img) }}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.midSection}>
          <BodyText
            style={styles.headerName}
            onPress={() => handleProfileNavigator(data.owner._id)}
          >{`${data.owner.first_name} ${data.owner.last_name}`}</BodyText>
          <Pressable onPress={() => handleLocationNavigator(data.destination)}>
            <BodyText style={styles.headerLocation}>
              <Ionicons name="location" color={Colors.primary} />
              {data.destination
                ? " " + data.destination.des_name
                : " Somewhere on Earth"}
            </BodyText>
          </Pressable>
        </View>
        <View style={styles.rightSection}>
          <Pressable
            onPress={() => setIsOpenSettings((prevState) => !prevState)}
          >
            <Ionicons name="ellipsis-vertical" size={15} color={Colors.info} />
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>{renderContent(data.content)}</View>
      {renderGalary(data.media)}
      <View style={styles.statusBar}>
        <View style={styles.statusIconContainer}>
          <Pressable onPress={handleLike}>
            {isHeated ? (
              <Ionicons
                style={styles.statusIcon}
                size={30}
                color={Colors.pink}
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
            <BodyText style={styles.statusText}>
              {heatCount}
              {heatCount === 1 ? ` heart` : ` hearts`}
            </BodyText>
            <BodyText style={styles.statusText}>{" · "}</BodyText>
            <BodyText
              onPress={() => setisOpenComments(true)}
              style={styles.statusText}
            >
              {data.comments.length}
              {data.comments.length === 1 ? ` comment` : ` comments`}
            </BodyText>
            <BodyText style={styles.statusText}>{" · "}</BodyText>
            <BodyText style={styles.statusText}>
              {timeDifference(data.createdAt)}
            </BodyText>
          </BodyText>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={isOpenComments}
        onRequestClose={() => setisOpenComments(false)}
      >
        <CommentsModal
          inputValue={newComment}
          onInputChangeText={(value) => setNewComment(value)}
          onSubmit={() => handlePostComment()}
          onClose={() => setisOpenComments(false)}
          comments={data.comments}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    width: WINDOW_WIDTH,
    marginVertical: 5,
    //#region IOS Elevation
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.12,
    // shadowRadius: 60,
    //#endregion
    // elevation: 2,
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  leftSection: {
    height: 50,
    width: WINDOW_WIDTH * 0.2,
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
    width: WINDOW_WIDTH * 0.7,
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
    width: WINDOW_WIDTH * 0.1,
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
    height: WINDOW_WIDTH,
    width: WINDOW_WIDTH,
  },
  videoWrapper: {
    height: WINDOW_WIDTH,
    width: WINDOW_WIDTH,
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

export default MemoryModal;
