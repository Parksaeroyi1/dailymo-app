import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// The component will receive the quote text as a prop
const QuoteCard = ({ quote }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.quote}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default QuoteCard;
