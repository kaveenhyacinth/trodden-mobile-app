import React from "react";
import { StyleSheet } from "react-native";

const FeedView = (props) => {
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
            {isLiked ? (
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
                {heats.length}
                {heats.length === 1 ? ` heart` : ` hearts`}
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

export default FeedView;
