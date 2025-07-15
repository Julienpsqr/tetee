import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type TimeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Time'>;
  route: RouteProp<RootStackParamList, 'Time'>;
};

export default function TimeScreen({ navigation, route }: TimeProps) {
  const { side } = route.params;
  const [date, setDate] = useState(new Date());

  const handleSave = async () => {
    const newEntry = { side, time: date.toISOString() };
    const existing = await AsyncStorage.getItem('history');
    const history = existing ? JSON.parse(existing) : [];
    history.push(newEntry);
    await AsyncStorage.setItem('history', JSON.stringify(history));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modifier l’heure si nécessaire :</Text>
      <DateTimePicker
        value={date}
        mode="time"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={(event, selectedDate) => selectedDate && setDate(selectedDate)}
      />
      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { fontSize: 16, marginBottom: 10 },
});
