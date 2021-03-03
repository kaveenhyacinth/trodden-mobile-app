import React from "react";
import Picker from "react-native-country-picker-modal";
import InputBox from "./InputBox"

const CountryPicker = (props) => {
  const value = props.value;
  return (
    <Picker
      withFilter
      withFlag
      onSelect={props.onSelect}
      renderFlagButton={(props) => (
        <InputBox
          onFocus={props.onOpen}
          placeholder="--select country--"
          value={value}
        />
      )}
    />
  );
};

export default CountryPicker;
