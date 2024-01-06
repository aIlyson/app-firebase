import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../../db/firebaseConfig';
import { theme } from '../../core/theme'

import Header from '../../components/header';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [job, setJob] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await set(ref(db, `users/${newUser.uid}`), {
        name,
        job,
      });

      setEmail('');
      setPassword('');
      setJob('');
      setName('');
      Alert.alert('Concluído', 'Funcionário cadastrado.');
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      Alert.alert('Erro', 'Erro ao adicionar. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Administrador" logout />

      <View style={styles.content}>
        <Text style={styles.title}>Cadatrar um novo funcionário</Text>
        <TextInput
          placeholder="Nome do funcionário"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email do funcionário"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha do funcionário"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Cargo do funcionário"
          value={job}
          onChangeText={(text) => setJob(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.textBtn}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Admin
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
    marginBottom: 30,
  },
  input: {
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderColor: theme.colors.btnSecondary,
    borderWidth: 2,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: theme.colors.btnPrimary,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  textBtn: {
    color: theme.colors.btnText,
    fontSize: 18,
    textAlign: 'center',
  },
});