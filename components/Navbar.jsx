import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import StdBtn from "./StdBtn";

const Navbar = ({ fetchData, searchQuery, setSearchQuery }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.navbar}>
      <Text style={styles.navBarText}>Notes</Text>
      {showSearchBar ? (
        <TextInput
          autoFocus
          style={styles.searchBar}
          placeholder={"Search"}
          selectionColor={"black"}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            fetchData(text);
          }}
          onBlur={() => {
            setShowSearchBar(false);
          }}
        />
      ) : (
        <StdBtn
          icon={<FontAwesome name="search" size={22} color={"white"} />}
          text={searchQuery}
          onPressHandler={() => {
            setShowSearchBar(true);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    padding: 25,
    paddingTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBarText: {
    color: "white",
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  search: {
    backgroundColor: "#3B3B3B",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  searchBar: {
    backgroundColor: "white",
    width: 200,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Navbar;
