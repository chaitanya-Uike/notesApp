import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Notes from "./Notes";

const NotesList = ({ notes, navigation, searchQuery }) => {
  const renderItem = ({ item }) => {
    return (
      <Notes
        title={item.title}
        createdOn={item.createdOn}
        color={item.color}
        onPressHandler={() => {
          navigation.navigate("Details", { ID: item.ID });
        }}
        searchQuery={searchQuery}
      />
    );
  };

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.ID}
      contentContainerStyle={styles.notesList}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  notesList: {
    paddingHorizontal: 15,
  },
});

export default NotesList;
