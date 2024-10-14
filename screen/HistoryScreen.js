import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('history');
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    };

    fetchHistory();
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{item.date}</Text>
      <FlatList
        data={item.movies}
        horizontal
        renderItem={({ item: movie }) => (
          <View style={styles.movieContainer}>
            <Image source={{ uri: movie.poster }} style={styles.poster} />
            <Text style={styles.movieTitle}>{movie.title} ({movie.year})</Text>
          </View>
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );

  return (
    <FlatList
      data={history}
      renderItem={renderHistoryItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    padding: 10,
    backgroundColor: '#333',
  },
  movieContainer: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  movieTitle: {
    color: '#fff',
  }
});

export default HistoryScreen;
