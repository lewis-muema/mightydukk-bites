import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import SearchScreen from "../components/search";
import useResults from "../hooks/useResults";
import ResultsList from "../components/results";
import LoadingScreen from "../components/loadingScreen";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, error, searchApi, loading, setRefreshing, refreshing] = useResults();

  const onRefresh = () => {
    setRefreshing(true);
    searchTerm ? searchApi(searchTerm): searchApi("restaurants");
  };
  const filterPrices = (rating) => {
    return results.filter(result => {
      return result.rating === rating || result.rating === (rating + 0.5)
    })
  };
  
  return (
    <View style={{flex: 1}}>
      <SearchScreen 
        term={searchTerm} 
        onTermChange={(val) => {setSearchTerm(val)}} 
        onSubmit={() => {
          searchApi(searchTerm);
        }}
        reset={() => {
          setSearchTerm("");
          searchApi("restaurants");
        }}
      />
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
  }
});

export default HomeScreen;
