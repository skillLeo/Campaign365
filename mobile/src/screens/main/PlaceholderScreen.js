import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen({ route }) {
  return (
    <View style={styles.c}>
      <Text style={styles.icon}>🚧</Text>
      <Text style={styles.title}>{route.name}</Text>
      <Text style={styles.sub}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  c:     { flex: 1, backgroundColor: '#080E1C', alignItems: 'center', justifyContent: 'center' },
  icon:  { fontSize: 48, marginBottom: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: '800', marginBottom: 8 },
  sub:   { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
});
