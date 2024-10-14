import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Your TMDB API key
const API_KEY = '943210442cd2bfc0a19ecfe907ebdc5d';
const BASE_URL = 'https://api.themoviedb.org/3';

// Image base URL
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SearchScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movies from TMDB API
  const fetchMovies = async (searchTerm = '') => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    fetchMovies(text);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem} onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}>
      <Image source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }} style={styles.poster} />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.date}>{item.release_date ? item.release_date.split('-')[0] : 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001144', // Match the background color
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  grid: {
    paddingBottom: 20,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    color: '#BBB',
    fontSize: 14,
  },
});

export default SearchScreen;
