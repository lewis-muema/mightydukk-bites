import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, FlatList } from "react-native";
import SearchScreen from "../components/search";
import useResults from "../hooks/useResults";
import ResultsList from "../components/results";
import LoadingScreen from "../components/loadingScreen";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, error, searchApi, loading, setRefreshing, refreshing, searchBusiness, business, getReviews, reviews, countries, country, setCountry] = useResults();

  const onRefresh = () => {
    setRefreshing(true);
    searchTerm ? searchApi(searchTerm, country): searchApi("restaurants", country);
  };
  const filterPrices = (rating) => {
    return results.filter(result => {
      return result.rating === rating || result.rating === (rating + 0.5)
    })
  };
  const changeCountry = (item) => {
    setCountry(item);
    searchTerm ? searchApi(searchTerm, item): searchApi("restaurants", item);
  };
  
  return (
    <View style={{flex: 1}}>
      <SearchScreen 
        term={searchTerm} 
        onTermChange={(val) => {setSearchTerm(val)}} 
        onSubmit={() => {
          searchApi(searchTerm, country);
        }}
        reset={() => {
          setSearchTerm("");
          searchApi("restaurants", country);
        }}
      />
      <View style={{marginHorizontal: 20}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={countries} 
          renderItem={({item}) =>
          <TouchableOpacity onPress={() => changeCountry(item)}>
            <View style={country === item ? styles.activeCountry : styles.transactionsOuter}>
              <Text style={country === item ? styles.activeCountryInner : styles.transactions}>{ item }</Text>
            </View>
          </TouchableOpacity>
          }
        />
      </View>
      <LoadingScreen loading={loading} refreshing={refreshing} />
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        { filterPrices(5).length ? <ResultsList header="Awesome" results={filterPrices(5)} /> : <View></View>}
        { filterPrices(4).length ? <ResultsList header="Impressive" results={filterPrices(4)} /> : <View></View>}
        { filterPrices(3).length ? <ResultsList header="Good" results={filterPrices(3)} /> : <View></View>}
        </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  container: {
    overflow: "scroll"
  },
  transactionsOuter: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    marginRight: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgrey"
  },
  activeCountry: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0292f5",
    marginRight: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#0292f5"
  },
  activeCountryInner: {
    fontSize: 15,
    backgroundColor: "#0292f5",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0292f5",
    color: "white"
  },
  transactions: {
    fontSize: 15,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
  }
});

export default HomeScreen;
