import React from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const ResultsList = ({ header, results, navigation }) => {
  return (<View>
    <Text style={styles.text}>{ header }</Text>
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={results => results.alias}
      data={results} 
      style={styles.restaurantList}
      renderItem={({item, index}) =>
        <View style={styles.restaurants}>
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <Image style={styles.Img} source={{uri: item.image_url ? item.image_url : 'https://imgur.com/R7mqXKL'}} />
            <Text numberOfLines={1} style={styles.restaurantName}>{ `${item.name}` }</Text>
            <Text style={styles.restaurantDesc}>{ `${item.rating} stars` }, { `${item.review_count} reviews` }</Text>
          </TouchableOpacity>
        </View>
      }
    />
  </View>)
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    marginHorizontal: 20,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 10
  },
  restaurantList: {
    marginHorizontal: 20
  },
  restaurants: {
    marginRight: 20,
    marginTop: 20
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    width: 250,
    overflow: "hidden"
  },
  restaurantDesc: {
    fontSize: 16,
    color: "grey",
    marginTop: 3,
    marginBottom: 10,
    fontWeight: "500"
  },
  Img: {
    resizeMode: "cover",
    width: 250,
    height: 150,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "lightgrey",
  }
});

export default ResultsList;