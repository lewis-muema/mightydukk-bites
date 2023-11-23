import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  const user = "Lewis";
  return (
    <View>
      <Text style={styles.text}>Hi there {user}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center"
  }
});

export default HomeScreen;
