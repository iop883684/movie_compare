import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const MovieDetails = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: 'YOUR_TMDB_API_KEY',
        },
      });
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001144',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  overview: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 16,
  },
});

export default MovieDetails;
