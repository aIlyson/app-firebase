// lembrar de fazer, ultima tela
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../core/theme';

import Header from '../../components/header';


const Support = () => {
  return (
    <View style={styles.container}>

      <Header title="Suporte" drawer logout />

      <View style={styles.content}>
        {/* contéudo */}
      </View>

    </View>
  );
};

export default Support;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  content: {
    padding: 10,
  },
});
