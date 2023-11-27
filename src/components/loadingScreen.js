import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

const loadingScreen = ({ loading, refreshing }) => {
  return (
    <View style={loading && !refreshing ? styles.loadingContainer : styles.NoloadingContainer}>
      <Image style={styles.loadingImage} source={require("../../assets/mightydukkBites.png")} />
      <Text style={styles.loadingTitle}>Fetching Restaurants...</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  NoloadingContainer: {
    display: "none"
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#000000ad"
  },
  loadingTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginBottom: 10
  },
  loadingImage: {
    width: 250,
    height: 250,
    resizeMode: "contain"
  }
});

export default loadingScreen;
