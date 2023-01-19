import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import StdBtn from "../components/StdBtn";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDB");

const Details = ({ navigation, route }) => {
  const { ID } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdOn, setCreatedOn] = useState("");

  useEffect(() => {
    if (!ID) return;

    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Notes WHERE ID=?", [ID], (_, { rows }) => {
        if (rows.length <= 0) return;

        const data = rows._array[0];

        setTitle(data.title);
        setContent(data.content || "");
        setCreatedOn(data.createdOn);
      });
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <StdBtn
          icon={<Ionicons name="chevron-back" size={24} color="white" />}
          onPressHandler={() => navigation.goBack()}
        />
        <StdBtn
          icon={
            <MaterialCommunityIcons
              name="note-edit-outline"
              size={24}
              color="white"
            />
          }
          onPressHandler={() => {
            navigation.navigate("Create", { ID });
          }}
        />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.createdOn}>{createdOn}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </ScrollView>
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
  title: {
    marginHorizontal: 30,
    paddingVertical: 10,
    fontSize: 35,
    color: "white",
    fontWeight: "600",
  },
  content: {
    marginHorizontal: 30,
    paddingVertical: 10,
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  createdOn: {
    marginHorizontal: 30,
    paddingVertical: 10,
    fontSize: 18,
    color: "gray",
    fontWeight: "500",
  },
});

export default Details;
