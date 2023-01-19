import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const StdBtn = ({ icon, text, style, onPressHandler }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPressHandler}>
      {icon}
      {text && (
        <Text style={[styles.text, { marginLeft: icon && 10 }]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3B3B3B",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 15,
    padding: 15,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StdBtn;
