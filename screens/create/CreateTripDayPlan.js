import React, { useEffect, useState, useReducer, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenView from "../../components/ui/ScreenView";
import BodyText from "../../components/ui/BodyText";
import InputBox from "../../components/ui/InputBox";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    updatedInputValues = {
      ...state.inputValues,
      [action.payload.key]: action.payload.value,
    };

    return {
      ...state,
      inputValues: updatedInputValues,
    };
  }
  return state;
};

const TripDayPlannerScreen = (props) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      note: undefined,
    },
  });

  useEffect(() => {
    let clean = false;
    if (!clean) setHeaderTitle();
    return () => {
      clean = true;
    };
  }, [setHeaderTitle]);

  const setHeaderTitle = useCallback(() => {
    props.route.params.title
      ? props.navigation.setOptions({
          title: `Day ${props.route.params.day} of ${props.route.params.title}`,
        })
      : props.navigation.setOptions({
          title: `Day ${props.route.params.day}`,
        });
  }, [props.route.params.day, props.route.params.title]);

  const handleInput = (value) => (key) => {
    dispatchFormState({
      type: FORM_UPDATE,
      payload: {
        key,
        value,
      },
    });
  };

  return (
    <ScreenView style={styles.screen}>
      <BodyText>Let's plan day {props.route.params.day} of the trip</BodyText>
      <InputBox
        style={styles.noteInput}
        value={formState.inputValues.note}
        placeholder={`Notes for day ${props.route.params.day}`}
        onChangeText={(text) => handleInput(text)("note")}
      />
    </ScreenView>
  );
};

export default TripDayPlannerScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  noteInput: {},
});
