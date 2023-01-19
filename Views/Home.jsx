import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddButton";
import NotesList from "../components/NotesList";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDB");

const Home = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = () => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Notes", [], (_, { rows }) => {
          if (rows.length > 0) setNotes(rows._array);
        });
      });
    };

    navigation.addListener("focus", loadData);

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Notes (ID INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), content TEXT, createdOn VARCHAR(12), color VARCHAR(255));"
      );

      tx.executeSql("SELECT * FROM Notes", [], (_, { rows }) => {
        if (rows.length > 0) setNotes(rows._array);
      });
    });

    return () => {
      navigation.removeListener("focus", loadData);
    };
  }, []);

  const fetchData = (searchQuery) => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Notes WHERE title LIKE ? OR content LIKE ?",
          [`%${searchQuery}%`, `%${searchQuery}%`],
          (_, { rows }) => {
            setNotes(rows._array || []);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        fetchData={fetchData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <NotesList
        notes={notes}
        navigation={navigation}
        searchQuery={searchQuery}
      />
      <AddButton navigation={navigation} noOfNotes={notes.length || 0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    paddingBottom: 30,
  },
});

export default Home;
