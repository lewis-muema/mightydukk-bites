import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 

const SearchScreen = ({ term, onTermChange, onSubmit, reset }) => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" style={styles.searchIcon} />
      <TextInput 
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchInput} 
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onSubmit}
      />
      {
        term.length > 0 ? 
        <TouchableOpacity style={styles.searchIcon} onPress={reset}>
          <AntDesign name="closecircle" size={24} color="grey" />
        </TouchableOpacity> : 
        <View></View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 20,
    flex: 1
  },
  searchContainer: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    marginBottom: 10
  },
  searchIcon: {
    fontSize: 20,
    alignSelf: "center",
    marginHorizontal: 20
  }
});

export default SearchScreen;
