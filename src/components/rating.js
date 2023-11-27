import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

const Rating = ({ rating, type }) => {
  const totalStars = 5;
  const gainStars = rating ? Math.floor(rating) : 0;
  return (
    <View style={type === "business" ? styles.stars : styles.reviewStars}>
      {
        Array.from({length: gainStars}, (x, i) => {
          return(
            <MaterialIcons key={i} name="star" size={20} color="#FFA000"/>
          )
        })
      }
      {
        Array.from({length: totalStars-gainStars}, (x, i) => {
          return(
            <MaterialIcons key={i} name="star-border" size={20} color="#FFA000" />
          )
          })
      }
    </View>
  )
};

const styles = StyleSheet.create({
  stars: {
    position: "absolute",
    top: 150,
    flex: 1,
    margin: 20,
    flexDirection : "row",
    justifyContent: 'center',
    alignItems : "center",
    padding: 8,
  },
  reviewStars: {
    flexDirection : "row",
    justifyContent: 'flex-start',
    alignItems : "flex-start",
  },
});

export default Rating;
