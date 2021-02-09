import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BigButton from "../components/BigButton";
import ImageUploader from "../components/ImageUploader";
import InputBox from "../components/InputBox";
import FormContainer from "../components/FormContainer";

const DetailsScreen = (props) => {
  return (
    <ScreenView>
      <FormContainer>
        <ImageUploader style={styles.imageUploader} />
        <InputBox style={styles.inputArea} placeholder="Bio" message="" />
        <InputBox
          style={styles.input}
          placeholder="Currently work as ..."
          message=""
        />
        <BigButton
          style={styles.button}
          onPress={() => {
            {
              props.navigation.navigate("selectInterests");
            }
          }}
        >
          Next
        </BigButton>
      </FormContainer>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    height: 200,
  },
  imageUploader: {
    marginBottom: 20,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
});

export default DetailsScreen;
