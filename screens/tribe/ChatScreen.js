import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import io from "socket.io-client";

const ChatScreen = (props) => {
  const ENDPOINT = Constants.manifest.extra.CHAT_URL;
  const socket = io(ENDPOINT);
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState({
    roomId: "",
    roomName: "",
    nomadId: "",
    nomadName: "",
  });

  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.roomName,
    });
  }, [props]);

  useEffect(() => {
    const { params } = props.route;

    setChatData((prevState) => ({ ...prevState, ...params }));
    socket.emit("join", params, () => {});
    return () => {
      socket.emit("left");
      socket.off();
    };
  }, [props, ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("in msg", message);
      setMessages((prevState) => [...prevState, message]);
    });
  }, [ENDPOINT, messages]);

  useEffect(() => {
    console.log("Messages", messages);
  }, [messages]);

  return (
    <View>
      <Text>{messages !== [] ? messages[0].user : "..."}</Text>
      <Text>{messages !== [] ? messages[0].content : "..."}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
