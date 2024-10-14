import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultsScreen = ({ route, navigation }) => {
  const { selectedMovies } = route.params;

  const saveHistory = async () => {
    const historyItem = {
      date: new Date().toISOString().split('T')[0], // store only the date
      movies: selectedMovies,
    };

    try {
      const existingHistory = await AsyncStorage.getItem('history');
      const newHistory = existingHistory ? [...JSON.parse(existingHistory), historyItem] : [historyItem];
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
      alert('Saved to history!');
    } catch (error) {
      console.error('Failed to save history', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {selectedMovies.map(movie => (
        <View key={movie.id} style={styles.movieContainer}>
          <Text style={styles.score}>{movie.score}</Text>
          <Text style={styles.title}>{movie.title} ({movie.year})</Text>
          {/* Display more movie details */}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={saveHistory}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Add StyleSheet here

export default ResultsScreen;
