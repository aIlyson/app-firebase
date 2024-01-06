import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { db, ref, onValue } from '../../db/firebaseConfig';
import { auth } from '../../db/firebaseConfig';
import { theme } from '../../core/theme';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import Header from '../../components/header';


const Sync = () => {
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeout] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        const userUID = auth.currentUser?.uid;
        const occurrencesRef = ref(db, 'occurrences');
        const unsubscribe = onValue(occurrencesRef, (snapshot) => {
          const occurrencesArray = Object.values(snapshot.val() || {});
          
          const filteredOccurrences = occurrencesArray
            .filter(occurrence => occurrence.userId === userUID)
            .filter(occurrence => occurrence.title.toLowerCase().includes(query.toLowerCase()));
  
          setOccurrences(filteredOccurrences);
          setLoading(false);
        });
  
        const timeout = setTimeout(() => setLoading(false), 5000);
  
        return () => {
          clearTimeout(timeout);
          unsubscribe();
        };
      } catch (error) {
        console.error('Erro ao carregar:', error.message);
        setLoading(false);
      }
    };
  
    fetchOccurrences();
  }, [query]);  

  
  return (
    <ScrollView style={styles.container}>
      <Header title="Ocorrências" drawer logout />

      <View style={styles.searchBar}>
        <AntDesign name="search1" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ocorrências"
          onChangeText={(text) => setQuery(text)}
          value={query}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#007bff" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.titleHeader}>Minhas Ocorrências</Text>

          {occurrences.length === 0 ? (
            <Text style={styles.loading}>Nenhuma ocorrência cadastrada.</Text>
          ) : (
            occurrences.map((occurrence) => (
              <View key={occurrence.date} style={styles.cardContainer}>
                <View style={styles.cardContent}>
                  <Text style={styles.title}>Titulo: {occurrence.title}</Text>
                  <Text style={styles.subtitle}>Descrição: {occurrence.description}</Text>
                </View>
                <View style={styles.status}>
                  <Text style={{
                    fontSize: 16,
                    color: (occurrence.status === 'Pendente' ? theme.colors.pending :
                      (occurrence.status === 'Aprovada' ? theme.colors.success :
                        (occurrence.status === 'Reprovada' ? theme.colors.error :
                          theme.colors.default))), ...styles.titleText
                  }}>{occurrence.status}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Sync
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  content: {
    padding: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  titleHeader: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.containerPrimary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 3,
  },
  searchInput: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
    fontSize: 22,
    color: theme.colors.textSecondary,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  status: {
    backgroundColor: theme.colors.btnSecondary,
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
