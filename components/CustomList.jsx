import React from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import Notes from "./Notes";

const COLORS = [
  "#FFAB91",
  "#FFCC80",
  "#E6EE9B",
  "#80DEEA",
  "#CF93D9",
  "#F48FB1",
  "#80CBC4",
];

const CustomList = ({ data }) => {
  return (
    <ScrollView contentContainerStyle={styles.customList}>
      <View style={styles.column}>
        {data.map((item, index) => {
          if (index % 2 !== 0) return null;

          const colorIdx = index % COLORS.length;
          return (
            <Notes
              title={item.title}
              createdOn={item.createdOn}
              key={item.id}
              color={COLORS[colorIdx]}
            />
          );
        })}
      </View>
      <View style={styles.column}>
        {data.map((item, index) => {
          if (index % 2 === 0) return null;

          const colorIdx = index % COLORS.length;
          return (
            <Notes
              title={item.title}
              createdOn={item.createdOn}
              key={item.id}
              color={COLORS[colorIdx]}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  customList: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  column: {
    width: Dimensions.get("window").width / 2 - 20,
    display: "flex",
    marginHorizontal: 5,
  },
});

export default CustomList;
