//#region Imports
import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Save } from "../../services/deviceStorage";
import { storeUser } from "../../store/actions/storeUser";
import { storeToken } from "../../store/actions/storeToken";
import api from "../../api/api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ScreenView";
import BodyText from "../../components/BodyText";
import InputBox from "../../components/InputBox";
import BigButton from "../../components/BigButton";
import LoadingButton from "../../components/LoadingButton";
import FormContainer from "../../components/FormContainer";
//#endregion

const ConfirmationScreen = (props) => {
  // Store loading state
  const [loading, setLoading] = useState(false);
  // Store navigation params
  const [paramData, setParamData] = useState({
    otp: props.route.params.otp,
    signupToken: props.route.params.signupToken,
  });
  // Store OTP InputBox array input
  const [otpInput, setOtpInput] = useState({
    e1: "",
    e2: "",
    e3: "",
    e4: "",
    e5: "",
    e6: "",
  });

  //#region Refs
  const E1 = useRef();
  const E2 = useRef();
  const E3 = useRef();
  const E4 = useRef();
  const E5 = useRef();
  const E6 = useRef();
  //#endregion

  /**
   * Handle InputBox array based on index
   * @param {String} inputText Input field value
   * @param {Number} index Input field index
   */
  const handleInput = (inputText, index) => {
    switch (index) {
      case 1:
        setOtpInput((prevState) => ({ ...prevState, e1: inputText }));
        E2.current.focus();
        break;
      case 2:
        setOtpInput((prevState) => ({ ...prevState, e2: inputText }));
        E3.current.focus();
        break;
      case 3:
        setOtpInput((prevState) => ({ ...prevState, e3: inputText }));
        E4.current.focus();
        break;
      case 4:
        setOtpInput((prevState) => ({ ...prevState, e4: inputText }));
        E5.current.focus();
        break;
      case 5:
        setOtpInput((prevState) => ({ ...prevState, e5: inputText }));
        E6.current.focus();
        break;
      case 6:
        setOtpInput((prevState) => ({ ...prevState, e6: inputText }));
        E6.current.blur();
        break;
      default:
        break;
    }
  };

  /**
   * Clear OTP field inputs
   */
  const handleOtpInputClear = () => {
    setOtpInput((prevState) => ({
      ...prevState,
      e1: "",
      e2: "",
      e3: "",
      e4: "",
      e5: "",
      e6: "",
    }));
    setLoading(false);
  };

  /**
   * Match OTP with the system generated OTP
   * @param {String} otpEntered User entered OTP
   * @param {String} otpGenerated System Generated OTP
   * @returns Boolean
   */
  const isMatchOtp = (otpEntered, otpGenerated) =>
    otpGenerated === otpEntered ? true : false;

  const dispatch = useDispatch();
  const handleUserStoreUpdate = (userData) => {
    dispatch(storeUser(userData));
  };
  const handleTokenStoreUpdate = (signToken, refToken) => {
    dispatch(storeToken(signToken, refToken));
  };

  const handleError = (error) => {
    if (!error.response) {
      return Alert.alert(
        "Something Went Wrong!",
        "Don't worry, that was us! Please try again later",
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }

    if (error.response.status == 400)
      return Alert.alert(
        "Something Went Wrong!",
        error.response.data.msg,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );

    if (error.response.status == 500)
      return Alert.alert(
        "Something Went Wrong!",
        error.response.data.msg,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
  };

  /**
   * Confirm OTP and send activate account request
   * @param {Object} otpInput InputBox array data
   * @param {String} otpOriginal System generated OTP
   * @param {String} signupToken System generated signup token
   */
  const handleConfirm = async (otpInput, otpOriginal, signupToken) => {
    const otpEntered = `${otpInput.e1}${otpInput.e2}${otpInput.e3}${otpInput.e4}${otpInput.e5}${otpInput.e6}`;

    // Validate OTP
    if (!isMatchOtp(otpEntered, otpOriginal)) {
      return Alert.alert(
        "Varification Failed",
        "Please enter a valid OTP",
        [
          {
            text: "Re-enter",
            style: "destructive",
            onPress: () => handleOtpInputClear(),
          },
        ],
        { cancelable: false }
      );
    }

    try {
      setLoading(true);

      // POST activation request
      const activateProfileBody = { signupToken };
      const response = await api.activateProfile(activateProfileBody);

      if (!response.data.result)
        throw new Error(
          "Something went wrong while activating profile! Please try again later..."
        );

      const signToken = response.data.result.signToken;
      const refToken = response.data.result.refToken;

      // Update redux stores
      handleUserStoreUpdate({ id: response.data.result.id });
      handleTokenStoreUpdate(signToken, refToken);

      Save("signToken", signToken); // Save sign token in secure store
      Save("refToken", refToken); // Save refresh token in secure store
      Save("userRole", response.data.result.role.toString()); // Save user signup state

      console.log(`role ${response.data.result.role.toString()}`);

      // Navigate to Interest selection
      props.navigation.replace("signupInfoOne");
    } catch (error) {
      if (!error.response) {
        console.log("Error @confirmation:", error);
        return Alert.alert(
          "Something went wrong",
          error.message ?? "Sorry, it's our fault! Please try again later...",
          [
            {
              text: "Okay",
              style: "destructive",
            },
          ],
          { cancelable: false }
        );
      }
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <BodyText style={styles.bodyText}>
          Please enter the 6 digit OTP that you have received in your user email
        </BodyText>
        <View style={styles.inputContainer}>
          <BodyText style={styles.inputLabel}>T - </BodyText>
          <InputBox
            ref={E1}
            placeholder="X"
            message=""
            autoFocus={true}
            value={otpInput.e1}
            maxLength={1}
            keyboardType="number-pad"
            containerStyle={styles.input}
            style={styles.inputBox}
            onChangeText={(inputText) => handleInput(inputText, 1)}
          />
          <InputBox
            ref={E2}
            placeholder="X"
            message=""
            value={otpInput.e2}
            maxLength={1}
            keyboardType="number-pad"
            containerStyle={styles.input}
            style={styles.inputBox}
            onChangeText={(inputText) => handleInput(inputText, 2)}
          />
          <InputBox
            placeholder="X"
            ref={E3}
            message=""
            value={otpInput.e3}
            maxLength={1}
            keyboardType="number-pad"
            containerStyle={styles.input}
            style={styles.inputBox}
            onChangeText={(inputText) => handleInput(inputText, 3)}
          />
          <InputBox
            placeholder="X"
            ref={E4}
            message=""
            value={otpInput.e4}
            maxLength={1}
            keyboardType="number-pad"
            containerStyle={styles.input}
            style={styles.inputBox}
            onChangeText={(inputText) => handleInput(inputText, 4)}
          />
          <InputBox
            placeholder="X"
            ref={E5}
            message=""
            value={otpInput.e5}
            maxLength={1}
            keyboardType="number-pad"
            containerStyle={styles.input}
            style={styles.inputBox}
            onChangeText={(inputText) => handleInput(inputText, 5)}
          />
          <InputBox
            placeholder="X"
            ref={E6}
            message=""
            value={otpInput.e6}
            maxLength={1}
            keyboardType="number-pad"
            containerStyle={styles.input}
            style={styles.inputBox}
            onChangeText={(inputText) => handleInput(inputText, 6)}
          />
        </View>
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton
            style={styles.button}
            onPress={() =>
              handleConfirm(otpInput, paramData.otp, paramData.signupToken)
            }
          >
            Confirm
          </BigButton>
        )}
        <Pressable onPress={() => {}}>
          <BodyText style={styles.bodyText}>
            If you don’t recieve the OTP
            <Text style={styles.link}> RESEND</Text>
          </BodyText>
        </Pressable>
      </FormContainer>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  bodyText: {
    ...Typography.bodyText,
    alignItems: "flex-start",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    overflow: "scroll",
  },
  inputLabel: {
    ...Typography.title,
    color: Colors.text,
    width: "10%",
    height: 40,
    alignItems: "center",
    textAlign: "center",
    marginVertical: 5,
  },
  input: {
    width: "10%",
  },
  inputBox: {
    textAlign: "center",
    height: 40,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  link: {
    ...Typography.bodyTextBold,
    color: Colors.primary,
  },
});

export default ConfirmationScreen;
