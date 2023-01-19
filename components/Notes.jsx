import React from "react";
import { StyleSheet, Text, Dimensions, Pressable } from "react-native";
import { useFonts } from "expo-font";
import TextHighlighter from "./TextHighlighter";

const Notes = ({ title, createdOn, color, onPressHandler, searchQuery }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  const size = Dimensions.get("window").width / 2 - 25;

  return (
    <Pressable
      style={[styles.note, { width: size, backgroundColor: color }]}
      onPress={onPressHandler}
      onLongPress={() => {
        console.log("longPressed");
      }}
    >
      <TextHighlighter
        sourceText={title}
        highlightedText={searchQuery}
        style={styles.title}
      >
        {title}
      </TextHighlighter>
      <Text style={styles.createdOn}>{createdOn}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: "#FFAB91",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  createdOn: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "black",
    opacity: 0.4,
    marginTop: 8,
  },
});

export default Notes;
