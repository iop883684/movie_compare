import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CompareScreen = ({ navigation }) => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const toggleMovie = (movie) => {
    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter(m => m.id !== movie.id));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => toggleMovie(item)}
    >
      <Text style={styles.title}>{item.title} ({item.year})</Text>
      <Text style={styles.more}>...</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}  // Assume 'movies' is passed as a prop or managed globally
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Results', { selectedMovies })}
      >
        <Text style={styles.buttonText}>Compare</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  title: {
    color: '#fff',
  },
  more: {
    color: '#fff',
  },
  button: {
    backgroundColor: 'cyan',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  }
});

export default CompareScreen;
