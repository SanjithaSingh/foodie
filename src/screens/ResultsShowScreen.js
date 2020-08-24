import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';
import { Feather } from '@expo/vector-icons';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }
  console.log(result);
  return (
    <View>
      <Text style={styles.heading}>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
    marginVertical: 3,
    alignSelf: "center",

  },
  heading: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    borderBottomColor: "black"

  },
  iconStyle: {
    color: 'pink',
    fontSize: 35
  }
});

export default ResultsShowScreen;
