import React, { useState, useEffect, useCallback, useReducer } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { resetTripPlan } from "../../redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DatePickerModel from "react-native-modal-datetime-picker";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api/";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";
import BodyText from "../../components/ui/BodyText";
import InputBox from "../../components/ui/InputBox";
import HeaderButton from "../../components/ui/CustomHeaderButton";
import PlaceSearch from "../../components/modals/PlaceSearchBottomSheet";
import BigButton from "../../components/ui/BigButton";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _MAXIMUM_DAYS_ALLOWED_TO_PLAN = 3;
const FIELD_WIDTH = WINDOW_WIDTH - 20;
const FORM_UPDATE_INPUT = "FORM_UPDATE_INPUT";
const FORM_UPDATE_OUTPUT = "FORM_UPDATE_OUTPUT";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE_INPUT) {
    updatedInputValues = {
      ...state.inputValues,
      [action.payload.key]: action.payload.value,
    };

    return {
      ...state,
      inputValues: updatedInputValues,
    };
  }

  if (action.type === FORM_UPDATE_OUTPUT) {
    updatedOutputValues = {
      ...state.outputValues,
      [action.payload.key]: action.payload.value,
    };

    return {
      ...state,
      outputValues: updatedOutputValues,
    };
  }
  return state;
};

const NewTripScreen = (props) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [tripDuration, setTripDuration] = useState(0);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      tripTitle: undefined,
      startDate: undefined,
      endDate: undefined,
      content: undefined,
    },
    outputValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const dispatch = useDispatch();
  const tripPlanStore = useSelector((state) => state.tripPlanStore);

  useEffect(() => {
    handleSetTripDuration(
      formState.inputValues.startDate,
      formState.inputValues.endDate
    );
  }, [formState.inputValues.startDate, formState.inputValues.endDate]);

  const handleGoBack = () => {
    dispatch(resetTripPlan());
    props.navigation.goBack();
  };

  const handleSaveTrip = async (formState, tripPlanStore) => {
    try {
      const { tripTitle, startDate, endDate, content } = formState.inputValues;
      const userId = await Fetch("nomadId");

      if (!tripTitle || !startDate || !endDate || !content) {
        alert("Please fill all the fields to save the trip plan...");
        return;
      }

      const saveObj = {
        userId,
        ...formState.inputValues,
        dayPlans: tripPlanStore.dayPlans,
      };

      if (saveObj.dayPlans.length === 0) {
        alert("Please add at least one day plan...");
        return;
      }

      console.log("Trip Save Final", saveObj);
      const { data } = await api.post.createTrip(saveObj);
      if (!data.success) throw new Error(data.msg);
      handleGoBack();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            color={Colors.primary}
            onPress={() => handleSaveTrip(formState, tripPlanStore)}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="goBack"
            IconComponent={Ionicons}
            iconName="arrow-back"
            color={Colors.info}
            onPress={handleGoBack}
          />
        </HeaderButtons>
      ),
    });
  }, [formState, tripPlanStore]);

  const renderDayPlanners = (days) => {
    if (days > _MAXIMUM_DAYS_ALLOWED_TO_PLAN)
      days = _MAXIMUM_DAYS_ALLOWED_TO_PLAN;
    let list = [];
    for (let i = 0; i < days; i++) {
      list.push(
        <View key={i.toString()} style={styles.container}>
          <View style={styles.row}>
            <View style={styles.colLeft}>
              <Ionicons
                onPress={() => handleDayPlannerNavigation(i + 1)}
                name="add-outline"
                size={23}
                color={Colors.primary}
              />
            </View>
            <View style={styles.colMid}>
              <BodyText
                onPress={() => handleDayPlannerNavigation(i + 1)}
                style={styles.postText}
              >
                {`Plan day ${i + 1} of your trip...`}
              </BodyText>
            </View>
            <View style={styles.colRight}>
              <Ionicons
                onPress={() => handleDayPlannerNavigation(i + 1)}
                name="chevron-forward-outline"
                size={20}
                color={Colors.primary}
              />
            </View>
          </View>
        </View>
      );
    }

    return list;
  };

  const handleSetTripDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return;
    const utcStart = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const utcEnd = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    const tripDuration = Math.floor((utcEnd - utcStart) / _MS_PER_DAY) + 1;
    setTripDuration(tripDuration);
  };

  const handleInput = (value) => (key) => {
    if (key === "startDate" || key === "endDate") {
      const stringDate = `${value.getDate()}/${
        value.getMonth() + 1
      }/${value.getFullYear()}`;

      dispatchFormState({
        type: FORM_UPDATE_OUTPUT,
        payload: {
          key,
          value: stringDate,
        },
      });
      handleHideEndDate();
      handleHideStartDate();
    }

    dispatchFormState({
      type: FORM_UPDATE_INPUT,
      payload: {
        key,
        value,
      },
    });
  };

  const handleDayPlannerNavigation = (day) =>
    props.navigation.navigate("DayTrip", {
      day,
      title: formState.inputValues.tripTitle,
    });

  const handleShowStartDate = () => setIsStartDateVisible(true);

  const handleHideStartDate = () => setIsStartDateVisible(false);

  const handleShowEndDate = () => setIsEndDateVisible(true);

  const handleHideEndDate = () => setIsEndDateVisible(false);

  return (
    <ScreenView style={styles.screen}>
      <InputBox
        style={styles.tripTitleInput}
        value={formState.inputValues.tripTitle}
        placeholder="Trip title"
        onChangeText={(text) => handleInput(text)("tripTitle")}
      />
      <InputBox
        multiline={true}
        style={styles.contentInput}
        placeholder="Tell us about your trip..."
        value={formState.inputValues.content}
        returnKeyType="none"
        onChangeText={(inputText) => handleInput(inputText)("content")}
      />
      <View style={styles.dateContainer}>
        <BigButton
          style={styles.dateInputContainer}
          textStyle={styles.dateInput}
          onPress={handleShowStartDate}
        >
          {formState.outputValues.startDate
            ? `Start Date: ${formState.outputValues.startDate}`
            : "Start Date"}
        </BigButton>
        <DatePickerModel
          isVisible={isStartDateVisible}
          mode="date"
          onConfirm={(date) => handleInput(date)("startDate")}
          onCancel={handleHideStartDate}
        />
        <BigButton
          style={styles.dateInputContainer}
          textStyle={styles.dateInput}
          onPress={handleShowEndDate}
        >
          {formState.outputValues.endDate
            ? `End Date: ${formState.outputValues.endDate}`
            : "End Date"}
        </BigButton>
        <DatePickerModel
          isVisible={isEndDateVisible}
          mode="date"
          onConfirm={(date) => handleInput(date)("endDate")}
          onCancel={handleHideEndDate}
        />
      </View>
      {renderDayPlanners(tripDuration)}
    </ScreenView>
  );
};

export default NewTripScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.accent,
    paddingTop: 30,
    paddingHorizontal: 10,
  },

  tripTitleInput: {
    width: FIELD_WIDTH,
  },
  contentInput: {
    width: FIELD_WIDTH,
    height: 200,
    textAlignVertical: "top",
    paddingVertical: 10,
  },

  dateContainer: {
    flexDirection: "row",
    width: FIELD_WIDTH,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInputContainer: {
    width: (FIELD_WIDTH - 10) / 2,
    height: 50,
    backgroundColor: Colors.accent,
    borderColor: Colors.outline,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateInput: {
    ...Typography.placeholderText,
    textAlign: "left",
  },

  container: {
    width: FIELD_WIDTH,
    height: 50,
    backgroundColor: Colors.accent,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.outline,
    marginVertical: 5,
    borderRadius: 5,
  },
  colLeft: {
    flex: 1,
    alignItems: "center",
  },
  colMid: {
    flex: 5,
  },
  colRight: {
    flex: 1,
    alignItems: "center",
  },
  postText: {
    ...Typography.bodyText,
    paddingVertical: 10,
  },
});
