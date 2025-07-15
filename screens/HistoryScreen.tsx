import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HistoryEntry = {
  side: 'gauche' | 'droite';
  time: string;
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('history').then(data => {
      if (data) setHistory(JSON.parse(data).reverse());
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.side === 'gauche' ? 'Sein gauche' : 'Sein droit'} à {new Date(item.time).toLocaleTimeString()}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { fontSize: 16, marginVertical: 4 },
});
