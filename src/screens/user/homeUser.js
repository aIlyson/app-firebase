import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';
import { auth, db } from '../../db/firebaseConfig';
import { ref, get, push } from 'firebase/database';
import { theme } from '../../core/theme'

import Header from '../../components/header';


const HomeUser = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setdescription] = useState('');
  const [title, setTitle] = useState('');

  const handleReport = async () => {
    const occurrencesRef = ref(db, 'occurrences');

    try {
      setLoading(true);

      if (!description.trim() || !title.trim()) {
        Alert.alert('Campos Vazios', 'Os campos não podem estar vazios.');
        return;
      }

      await push(occurrencesRef, {
        title: title,
        description: description,
        status: 'Pendente',
        userName: userName,
        date: new Date().toISOString(),
        userId: auth.currentUser.uid,
      });

      setModalVisible(false);
      setdescription('');
      setTitle('');

      Alert.alert('Sucesso', 'Ocorrência adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar:', error.message);
      Alert.alert('Erro', 'Erro ao adicionar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          const userSnapshot = await get(ref(db, `users/${uid}`));

          if (userSnapshot.exists()) {
            setUserName(userSnapshot.val().name);
          } else {
            alert('Conta não encontrada');
          }
        } else {
          console.warn('Desconectado.');
        }
      } catch (error) {
        console.error('Erro ao obter dados:', error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <Header title="Início" drawer logout />

      {loading ? (
        <ActivityIndicator size="small" color="#007bff" />
      ) : (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Bem-vindo, {userName || 'Usuário'}!</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textBtn}>Registrar Ocorrência</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Registrar Ocorrência</Text>
            <TextInput
              style={styles.input}
              placeholder="Título da ocorrência"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={{ ...styles.input, height: 100, }}
              placeholder="Descreva a ocorrência"
              value={description}
              onChangeText={(text) => setdescription(text)}
            />
            <TouchableOpacity
              style={{...styles.btn, marginBottom: 5, }}
              onPress={handleReport}
            >
              <Text style={styles.textBtn}>Enviar ocorrência</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ ...styles.textBtn, color: theme.colors.text }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeUser
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
  btn: {
    backgroundColor: theme.colors.btnPrimary,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  textBtn: {
    color: theme.colors.btnText,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderColor: theme.colors.btnSecondary,
    borderWidth: 2,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 20,
    width: '90%',
  },
  closeModal: {
    backgroundColor: theme.colors.btnSecondary,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 8,
  },
});

