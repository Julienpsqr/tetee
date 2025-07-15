import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeProps) {
  const [lastSide, setLastSide] = useState<'gauche' | 'droite' | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('history').then(data => {
      if (data) {
        const parsed = JSON.parse(data);
        const last = parsed[parsed.length - 1];
        setLastSide(last.side);
      }
    });
  }, []);

  const nextSide = lastSide === 'gauche' ? 'droite' : 'gauche';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Prochain sein à donner : <Text style={styles.bold}>{nextSide ?? 'gauche'}</Text>
      </Text>
      <View style={styles.buttonRow}>
        <Button title="Sein gauche" onPress={() => navigation.navigate('Time', { side: 'gauche' })} />
        <Button title="Sein droit" onPress={() => navigation.navigate('Time', { side: 'droite' })} />
      </View>
      <View style={styles.historyButton}>
        <Button title="Voir l'historique" onPress={() => navigation.navigate('History')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  bold: { fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  historyButton: { marginTop: 20 },
});
