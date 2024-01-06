import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'; import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../db/firebaseConfig';
import { theme } from '../core/theme';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const uid = user.uid;

        // admin page
        if (uid === 'CtOh24scCUQ48VOX3YPA8H6wHmv1') {
          console.log('logado como admin');
          navigation.navigate('AcessAdmin');
        } else {
          // user page
          console.log('logado como funcionário');
          navigation.navigate('AcessUser');
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      alert('Conta não encontrada');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -50 : 0}
      style={styles.container}
    >
      <View style={styles.containerHeader}>
        <Text style={styles.titleHeader}>Bem vindo de volta!</Text>
        <Text style={styles.subtitle}>Por favor, entre com suas informações para acessar.</Text>
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={handleShowPassword} style={styles.passwordIcon}>
          {showPassword ? (
            <MaterialIcons name="visibility-off" size={24} color={theme.colors.textSecondary} />
          ) : (
            <MaterialIcons name="visibility" size={24} color={theme.colors.textSecondary} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.recovery}>
        <Text style={styles.recoveryText}>Recuperar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.textBtn}>Login</Text>
      </TouchableOpacity>

      <View style={styles.separator}></View>
      <Text style={styles.continue}>Ou continuar com</Text>

      {/* cadastrar na cloud ainda */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.btnIcon}>
          {/* onPress={} */}
          <Image source={require('../components/assets/google-37.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          {/* onPress={} */}
          <Image source={require('../components/assets/twitter-113.png')} style={{ width: 60, height: 40 }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 20,
  },
  containerHeader: {
    position: 'relative',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderColor: theme.colors.btnSecondary,
    borderBottomWidth: 2,
    borderRadius: 8,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
    borderColor: theme.colors.btnSecondary,
    borderBottomWidth: 2,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  passwordIcon: {
    padding: 10,
  },
  recovery: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  recoveryText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  btn: {
    width: "90%",
    backgroundColor: theme.colors.btnPrimary,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  textBtn: {
    color: theme.colors.btnText,
    fontSize: 18,
    textAlign: 'center',
  },
  separator: {
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  continue: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 10,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btnIcon: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
  },
});
