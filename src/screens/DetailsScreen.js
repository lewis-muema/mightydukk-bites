import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, ScrollView, RefreshControl, TouchableOpacity, Linking, SafeAreaView } from "react-native";
import useResults from "../hooks/useResults";
import LoadingScreen from "../components/loadingScreen";
import { MaterialIcons } from '@expo/vector-icons'; 
import Rating from "../components/rating";

const HomeScreen = ({ route }) => {
  const [results, error, searchApi, loading, setRefreshing, refreshing, searchBusiness, business, getReviews, reviews] = useResults();
  const hours = business.hours && business.hours.length > 0 ? business.hours[0].open : [];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    searchBusiness(route.params.id);
    getReviews(route.params.id);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    searchBusiness(route.params.id);
    getReviews(route.params.id);
  };

  const convertHours = (hours) => {
    const hr = hours.substr(0, 2);
    const min = hours.substr(2, 2)
    return `${(hr % 12) || 12}:${min}${hr >= 12 ? 'pm' : 'am'}`;
  };

  return (
    <View style={{flex: 1}}>
      <LoadingScreen loading={loading} refreshing={refreshing} />
      <TouchableOpacity style={styles.messageBubble} onPress={() => Linking.openURL(business.url)}>
        <Image style={styles.messageIcon} source={require("../../assets/message.png")} />
      </TouchableOpacity>
      {
        business.alias ?
        <ScrollView style={styles.container} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <Image style={styles.Img} source={{uri: business.image_url ? business.image_url : 'https://imgur.com/R7mqXKL'}} />
          <Text style={styles.restaurantName}>{ business.name }</Text>
          <Rating rating={business.rating} type={"business"} />
          <Text style={styles.restaurantLocation}>{ business.location.address1 ? business.location.address1 : "N/A" }</Text>
          <Text style={styles.restaurantCity}>{ business.location.city ? business.location.city : "N/A" }</Text>
          <View style={ business?.transactions.length > 0 ? styles.photoGrid : styles.noDisplay }>
            <Text style={styles.title}>Services</Text>
              <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={business.transactions} 
              renderItem={({item}) =>
                <View style={styles.transactionsOuter}>
                    <Text style={styles.transactions}>{ item }</Text>
                </View>
              }
            />
            </View>
          <View style={ business?.photos.length > 0 ? styles.photoGrid : styles.noDisplay }>
            <Text style={styles.title}>Photos</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={business.photos} 
              renderItem={({item}) =>
                <View>
                  <Image style={styles.photo} source={{uri: item}} />
                </View>
              }
            />
          </View>
          <View style={ business?.categories.length > 0 ? styles.photoGrid : styles.noDisplay }>
            <Text style={styles.title}>Categories</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={business.categories} 
              renderItem={({item}) =>
                <View style={styles.transactionsOuter}>
                    <Text style={styles.transactions}>{ item.title }</Text>
                </View>
              }
            />
          </View>
          <View style={ business.hours && business.hours.length > 0 ? styles.photoGrid : styles.noDisplay }>
            <Text style={styles.title}>Hours</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={hours} 
              renderItem={({item}) =>
                <View style={styles.hoursOuter}>
                    <Text style={styles.hours}>Day: { days[item.day] }</Text>
                    <Text style={styles.hours}>Opening time: { convertHours(item.start) }</Text>
                    <Text style={styles.hours}>Closing time: { convertHours(item.end) }</Text>
                </View>
              }
            />
          </View>
          <View style={ business?.phone ? styles.photoGrid : styles.noDisplay }>
            <Text style={styles.title}>Contact</Text>
            <View style={styles.categories}>
                <Text style={styles.transactions}>{ business.phone }</Text>
            </View>
          </View>
          <View style={ business?.review_count > 0 && reviews.length > 0 ? styles.photoGrid : styles.noDisplay }>
            <Text style={styles.title}>Reviews</Text>
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={reviews} 
              style={{ marginBottom: 50 }}
              renderItem={({item}) =>
                <View>
                    <View style={styles.reviewPhotoGrid}>
                      <Image style={styles.reviewPhoto} source={{uri: item.user.image_url}} />
                      <View>
                        <Text style={styles.hours}>{ item.user.name }</Text>
                        <Rating rating={item.rating} type={"reviews"} />
                      </View>
                    </View>
                    <Text style={styles.hours}>{ item.text }</Text>
                </View>
              }
            />
          </View>
        </ScrollView> :
        <View></View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center"
  },
  noDisplay: {
    display: "none"
  },
  title: {
    fontSize: 30,
    color: "black",
    fontWeight: "800",
    marginVertical: 10
  },
  description: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    overflow: "scroll"
  },
  Img: {
    resizeMode: "cover",
    width: "100%",
    height: 250
  },
  photo: {
    resizeMode: "cover",
    width: 250,
    height: 150,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
  reviewPhoto: {
    resizeMode: "cover",
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
  reviewPhotoGrid: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20
  },
  photoGrid: {
    marginHorizontal: 20
  },
  messageBubble: {
    position: "absolute",
    zIndex: 50,
    bottom: 20,
    right: 20,
  },
  messageIcon: {
    resizeMode: "cover",
    width: 80,
    height: 80,
  },
  restaurantName: {
    position: "absolute",
    fontSize: 40,
    color: "white",
    margin: 20,
    fontWeight: "900",
    textShadowColor: '#171717',
    textShadowOffset: {width: -2, height: 4},
    textShadowRadius: 3,
    paddingHorizontal: 5
  },
  restaurantLocation: {
    position: "absolute",
    top: 175,
    fontSize: 25,
    color: "white",
    margin: 20,
    fontWeight: "800",
    textShadowColor: '#171717',
    textShadowOffset: {width: -2, height: 4},
    textShadowRadius: 3,
    paddingHorizontal: 5
  },
  restaurantCity: {
    position: "absolute",
    top: 200,
    fontSize: 18,
    color: "white",
    margin: 20,
    fontWeight: "800",
    textShadowColor: '#171717',
    textShadowOffset: {width: -2, height: 4},
    textShadowRadius: 3,
    paddingHorizontal: 5
  },
  details: {
    fontSize: 20,
    fontWeight: "400"
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
  categories: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
    marginRight: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgrey",
    alignSelf: "flex-start"
  },
  transactions: {
    fontSize: 15,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
  hoursOuter: {
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: "lightgrey",
    marginRight: 20,
    marginVertical: 10,
    backgroundColor: "lightgrey"
  },
  hours: {
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "italic"
  }
});

export default HomeScreen;
