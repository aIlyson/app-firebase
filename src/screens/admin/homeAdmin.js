import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db, ref, onValue, update } from '../../db/firebaseConfig';
import { theme } from '../../core/theme'

import Header from '../../components/header';


const HomeAdmin = () => {
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

  const handleApprove = (id) => {
    update(ref(db, `occurrences/${id}`), { status: 'Aprovada' });
  };

  const handleReject = (id) => {
    update(ref(db, `occurrences/${id}`), { status: 'Reprovada' });
  };

  const renderItemCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.text}>{item.title}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>{item.description}</Text>

      <Text style={styles.label}>Solicitante:</Text>
      <Text style={styles.text}>{item.userName}</Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={{...styles.btn, ...styles.approve}}
          onPress={() => {
            handleApprove(item.id);
            setOccurrences(occurrences.filter((occurrence) => occurrence.id !== item.id));
          }}
        >
          <Text style={styles.textBtn}>Aprovar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.btn, ...styles.reject}}
          onPress={() => {
            handleReject(item.id);
            setOccurrences(occurrences.filter((occurrence) => occurrence.id !== item.id));
          }}
        >
          <Text style={styles.textBtn}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const pendingOccurrences = occurrences.filter((occurrence) => occurrence.status === 'Pendente');


  return (
    <View style={styles.container}>
      <Header title="Administrador" logout />
      
      <View style={styles.content}>
        <Text style={styles.title}>Bem-Vindo!</Text>

        {pendingOccurrences.length > 0 ? (
          <FlatList
            data={pendingOccurrences}
            keyExtractor={(item) => item.id}
            renderItem={renderItemCard}
          />
        ) : (
          <Text style={styles.altText}>O campo está vazio.</Text>
        )}
      </View>
    </View>
  );
};

export default HomeAdmin
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
  label: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: 'bold',
  },
  text: {
    color: theme.colors.text,
    fontSize: 15,
    marginBottom: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textBtn: {
    color: theme.colors.btnText,
    fontSize: 17,
    textAlign: 'center',
  },
  approve: {
    backgroundColor: theme.colors.success,
  },
  reject: {
    backgroundColor: theme.colors.error,
  },
  altText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});