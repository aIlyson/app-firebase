import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { theme } from '../../core/theme'

import Header from '../../components/header';


const Maps = () => {
  return (
    <View style={styles.container}>
      <Header title="Mapeamento" drawer logout />

      <View style={styles.mapContainer}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <View style={styles.overlay}>
        <Text style={styles.text}>Mapa</Text>
        <Text style={styles.text}>Opção indisponível no momento</Text>
      </View>
    </View>
  );
};

export default Maps
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  text: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 10,
  },
});
