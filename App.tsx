import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TimeScreen from './screens/TimeScreen';
import HistoryScreen from './screens/HistoryScreen';

export type RootStackParamList = {
  Home: undefined;
  Time: { side: 'gauche' | 'droite' };
  History: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Tétée" }} />
        <Stack.Screen name="Time" component={TimeScreen} options={{ title: "Heure de tétée" }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Historique" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
