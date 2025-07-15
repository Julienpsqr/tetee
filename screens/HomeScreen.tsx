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
      <Text style={styles.text}>Prochain sein à donner :</Text>
      <Text style={styles.nextSide}>
        {nextSide ? `👉 ${nextSide.toUpperCase()}` : 'Aucune tétée enregistrée'}
      </Text>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Sein gauche"
            onPress={() => navigation.navigate('Time', { side: 'gauche' })}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Sein droit"
            onPress={() => navigation.navigate('Time', { side: 'droite' })}
          />
        </View>
      </View>

      <View style={styles.historyButton}>
        <Button title="Voir l'historique" onPress={() => navigation.navigate('History')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  nextSide: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  buttonWrapper: {
    marginHorizontal: 10,
  },
  historyButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
