import React, { useEffect, useState } from "react";
import { Text, View, Button, ActivityIndicator, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Hardcoded list of quotes
const quotes = [
  "Believe in yourself and all that you are.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "The only way to do great work is to love what you do.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you."
];

export default function Index() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const storedDate = await AsyncStorage.getItem("storedDate");
        const storedQuote = await AsyncStorage.getItem("storedQuote");
        const today = new Date().toISOString().split("T")[0]; // Format as "YYYY-MM-DD"

        if (storedDate === today) {
          setQuote(storedQuote); // Use the stored quote if date matches today
        } else {
          const dailyQuote = quotes[new Date(today).getDate() % quotes.length]; // Get quote based on the day
          
          // Store the new quote and today's date in AsyncStorage
          await AsyncStorage.setItem("storedQuote", dailyQuote);
          await AsyncStorage.setItem("storedDate", today);
          
          setQuote(dailyQuote);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load the daily quote.");
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, []);

  // Save the quote to favorites
  const saveToFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      
      // Avoid duplicates
      if (!favorites.includes(quote)) {
        favorites.push(quote);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        Alert.alert("Success", "Quote saved to Favorites!");
      } else {
        Alert.alert("Already Saved", "This quote is already in your favorites.");
      }
    } catch (error) {
      console.error("Error saving quote to favorites:", error);
      Alert.alert("Error", "Failed to save the quote to favorites.");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {/* Display quote inside a Text component with a fallback */}
          <Text style={styles.text}>{quote ? `"${quote}"` : "No quote available"}</Text>
          <Button
            title="Save to Favorites"
            onPress={saveToFavorites} // Save the current quote to favorites
          />
        </>
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

