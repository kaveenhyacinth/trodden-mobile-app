import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import io from "socket.io-client";
import Colors from "../../theme/Colors";
import BodyText from "../../components/ui/BodyText";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const FIELD_WIDTH = WINDOW_WIDTH - 20;

const ChatBubble = ({ item, type }) => {
  if (type === "admin")
    return (
      <View>
        <BodyText style={chatStyles.info}>{item.content}</BodyText>
      </View>
    );
  if (type === "own")
    return (
      <View>
        <BodyText style={chatStyles.content}>{item.content}</BodyText>
      </View>
    );
  if (type === "normal")
    return (
      <View>
        <BodyText style={{ ...chatStyles.content, ...chatStyles.normalize }}>
          {item.content}
        </BodyText>
        <BodyText style={chatStyles.user}>{item.user}</BodyText>
      </View>
    );
};

const ChatScreen = ({ navigation, route }) => {
  const ENDPOINT = Constants.manifest.extra.CHAT_URL;
  const socket = io(ENDPOINT);
  const [updateChat, setUpdateChat] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatData, setChatData] = useState({
    roomId: "",
    roomName: "",
    nomadId: "",
    nomadName: "",
  });

  const handleSendMessage = () => {
    socket.emit(
      "sendMessage",
      { message: newMessage, nomadId: chatData.nomadId },
      () => {
        setNewMessage("");
        setUpdateChat((prevState) => prevState + 1);
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: route.params.roomName,
    });
  }, [route]);

  useEffect(() => {
    const { params } = route;
    setChatData((prevState) => ({ ...prevState, ...params }));
    socket.emit("join", params, () => {});
    return () => {
      socket.emit("left", params.nomadId);
      socket.off();
    };
  }, [route, setChatData]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("in msg", message ?? "null");
      setMessages((prevState) => [...prevState, message]);
    });
  }, [setMessages]);

  useEffect(() => {
    console.log("Messages", messages);
  }, [messages, updateChat]);

  const renderChatBubble = (item) => {
    const type =
      item.user === "Trodden"
        ? "admin"
        : item.user === chatData.nomadName
        ? "own"
        : "normal";

    return <ChatBubble item={item} type={type} />;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={messages}
        renderItem={({ item }) => renderChatBubble(item)}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputBoxWrapper}>
        <TextInput
          style={styles.inputBox}
          value={newMessage}
          placeholder="Start typing new message..."
          returnKeyType="send"
          onChangeText={(input) => setNewMessage(input)}
          onSubmitEditing={() => handleSendMessage()}
          blurOnSubmit
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
  },
  inputBoxWrapper: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
  },
  inputBox: {
    height: 50,
    width: FIELD_WIDTH,
  },
});

const chatStyles = StyleSheet.create({
  info: {
    alignSelf: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: Colors.outline,
  },
  content: {
    alignSelf: "flex-end",
    maxWidth: FIELD_WIDTH - 100,
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.outline,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    marginBottom: 10,
  },
  normalize: {
    alignSelf: "flex-start",
    marginBottom: 2,
    color: Colors.white,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 15,
  },
  user: {
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 20,
    color: Colors.info,
  },
});
