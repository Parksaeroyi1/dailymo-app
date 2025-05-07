import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        const favoritesList = savedFavorites ? JSON.parse(savedFavorites) : [];
        setFavorites(favoritesList);
      } catch (error) {
        console.error("Error loading favorites:", error);
        Alert.alert("Error", "Unable to load your favorites.");
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favourite Quotes</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <Text style={styles.quote}>"{item}"</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorite quotes yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  noFavorites: {
    fontSize: 18,
    fontStyle: "italic",
    color: "gray",
  },
});
