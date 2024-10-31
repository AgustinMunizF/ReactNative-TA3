import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Movie {
  Title: string;
  Plot: string;
  Poster: string;
}

export default function App() {
  const [movieTitle, setmovieTitle] = useState<string>("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string>("");

  const fetchMovie = async () => {
    setError("");
    setMovie(null);

    if (!movieTitle) {
      setError("Ingrese el nombre de una película de nuestro catálogo.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${movieTitle}&apikey=d39fa7fc`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovie({
          Poster: data.Poster,
          Title: data.Title,
          Plot: data.Plot,
        });
      } else {
        setError("Película no encontrada");
      }
    } catch (err) {
      setError("Error en la conexión");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Buscador de Películas</Text>
        <TextInput
          placeholder="Busca tu película"
          value={movieTitle}
          onChangeText={setmovieTitle}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={fetchMovie}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {movie && (
          <View style={styles.movieContainer}>
            <Image source={{ uri: movie.Poster }} style={styles.poster} />
            <Text style={styles.movieTitle}>{movie.Title}</Text>
            <Text style={styles.plot}>{movie.Plot}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginVertical: 30,
  },
  input: {
    height: 45,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },
  movieContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
  poster: {
    width: 325,
    height: 500,
    resizeMode: "cover",
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
    color: "black",
  },
  plot: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
    color: "gray",
  },
});
