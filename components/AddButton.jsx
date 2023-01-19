import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

const AddButton = ({ navigation, noOfNotes }) => {
  return (
    <Pressable
      style={styles.addBtn}
      onPress={() => {
        navigation.navigate("Create", { noOfNotes });
      }}
    >
      <Entypo name="plus" size={45} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#3B3B3B",
    position: "absolute",
    width: 70,
    height: 70,
    bottom: 50,
    right: 25,
    borderRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,

    elevation: 6,
  },
});

export default AddButton;
