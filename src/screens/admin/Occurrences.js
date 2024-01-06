import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db, ref, onValue } from '../../db/firebaseConfig';
import { theme } from '../../core/theme'

import Header from '../../components/header';


const Occurrences = () => {
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    const occurrencesRef = ref(db, 'occurrences');

    const unsubscribe = onValue(occurrencesRef, (snapshot) => {
      if (snapshot.exists()) {
        const occurrencesData = snapshot.val();
        const occurrencesList = Object.keys(occurrencesData).map((key) => ({
          id: key,
          ...occurrencesData[key],
        }));
        setOccurrences(occurrencesList);
      } else {
        setOccurrences([]);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <View style={styles.container}>
      <Header title="Ocorrências" logout />

      <View style={styles.content}>
        <Text style={styles.title}>Resumo de Ocorrências</Text>

        {occurrences.length > 0 ? (
          occurrences.map((occurrence) => (
            <View key={occurrence.id} style={styles.card}>
              <Text style={styles.text}>{occurrence.description}</Text>
              <Text style={styles.status}>{occurrence.status}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.altText}>O campo está vazio.</Text>
        )}
      </View>

    </View>
  );
};

export default Occurrences
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  content: {
    padding: 10,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.colors.primaryContainer,
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#555',
  },
  altText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});