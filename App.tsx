import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchScreen from './screen/SearchScreen'; 
import MovieDetails from './screen/MovieDetails'; 
import CompareScreen from './screen/CompareScreen'; 

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="CompareScreen" component={CompareScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}