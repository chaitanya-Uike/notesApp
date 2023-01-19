import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StdBtn from "../components/StdBtn";
import * as SQLite from "expo-sqlite";
import { getDate } from "../utils";

const db = SQLite.openDatabase("MainDB");

const COLORS = [
  "#FFAB91",
  "#FFCC80",
  "#E6EE9B",
  "#80DEEA",
  "#CF93D9",
  "#F48FB1",
  "#80CBC4",
];

const insertNote = (title, content, noOfNotes) => {
  try {
    const colorIdx = noOfNotes % COLORS.length;
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Notes (title, content, createdOn, color) VALUES (?, ?, ?, ?)",
        [title, content, getDate(), COLORS[colorIdx]]
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const updateNote = (title, content, ID) => {
  try {
    db.transaction((tx) => {
      tx.executeSql("UPDATE Notes SET title = ?, content = ? WHERE ID= ?", [
        title,
        content,
        ID,
      ]);
    });
  } catch (error) {
    console.log(error);
  }
};

const Inputs = ({ title, setTitle, content, setContent }) => {
  return (
    <ScrollView>
      <TextInput
        multiline
        style={styles.titleInput}
        selectionColor={"white"}
        placeholder={"Title"}
        placeholderTextColor={"gray"}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        multiline
        style={styles.contentInput}
        selectionColor={"white"}
        placeholder={"Type something..."}
        placeholderTextColor={"gray"}
        value={content}
        onChangeText={(text) => {
          setContent(text);
        }}
      />
    </ScrollView>
  );
};

const CreateNote = ({ navigation, route }) => {
  const params = route.params;

  useEffect(() => {
    if (!params) return;

    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Notes WHERE ID=?",
          [params.ID],
          (_, { rows }) => {
            if (rows.length <= 0) return;

            const data = rows._array[0];

            setTitle(data.title);
            setContent(data.content || "");
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <StdBtn
          icon={<Ionicons name="chevron-back" size={24} color="white" />}
          onPressHandler={() => navigation.goBack()}
        />
        <StdBtn
          text={"Save"}
          onPressHandler={() => {
            if (!title) return;
            if (params.ID) updateNote(title, content, params.ID);
            else insertNote(title, content, params.noOfNotes);
            navigation.navigate("Home");
          }}
          style={{ paddingHorizontal: 20 }}
        />
      </View>
      {Platform.OS === "android" ? (
        <Inputs
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      ) : (
        <KeyboardAvoidingView>
          <Inputs />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    paddingBottom: 30,
  },
  navbar: {
    padding: 25,
    paddingTop: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleInput: {
    marginHorizontal: 30,
    paddingVertical: 10,
    fontSize: 35,
    color: "white",
    fontWeight: "600",
  },
  contentInput: {
    marginHorizontal: 30,
    paddingVertical: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});

export default CreateNote;
