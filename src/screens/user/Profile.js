import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../db/firebaseConfig';
import { ref, get, update } from 'firebase/database';
import { theme } from '../../core/theme';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import Header from '../../components/header';


const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;

        const userSnapshot = await get(ref(db, `users/${uid}`));

        if (userSnapshot.exists()) {
          setUserInfo({
            name: userSnapshot.val().name,
            email,
            job: userSnapshot.val().job,
            tel: userSnapshot.val().tel || "",
          });
        } else {
          alert('Conta não encontrada.');
        }
      } catch (error) {
        console.error('Erro ao obter dados:', error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditPhone = async () => {
    try {
      const uid = auth.currentUser.uid;

      await update(ref(db, `users/${uid}`), {
        tel: newPhone,
      });

      setUserInfo({
        ...userInfo,
        tel: newPhone,
      });

      setEditingPhone(false);
    } catch (error) {
      console.error('Erro ao editar:', error.message);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Header title="Perfil" drawer logout />

      <View style={styles.content}>

        <Text style={styles.titleHeader}>Meu Perfil</Text>
        {userInfo && (
          <View style={styles.userContainer}>
            <Avatar
              rounded
              source={require('../../components/assets/male.png')} 
              size="large"
              containerStyle={styles.avatar}
            />
            <Text style={styles.text}>Nome: {userInfo.name}</Text>
            <Text style={styles.text}>Email: {userInfo.email}</Text>
            <Text style={styles.text}>Cargo: {userInfo.job}</Text>
            <View style={styles.telContainer}>
              {/* editar */}
              {editingPhone ? (
                <>
                  <TextInput
                    style={styles.telInput}
                    placeholder="Adicionar número"
                    onChangeText={(text) => setNewPhone(text)}
                  />
                  <TouchableOpacity onPress={handleEditPhone}>
                    <Text style={styles.editButton}>Salvar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.text}>
                    Telefone: {userInfo.tel || "Adicione seu número"}
                  </Text>
                  <TouchableOpacity onPress={() => setEditingPhone(true)}>
                    <Text style={styles.editButton}>Editar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  content: {
    padding: 10,
  },
  titleHeader: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginBottom: 10,
  },
  userContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  telContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  telInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  editButton: {
    color: theme.colors.secondary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
