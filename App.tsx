/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import PDFViewer from './src/components/PDFViewer';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: { backgroundColor: '#121212' },
            headerTitleStyle: { color: '#E0E0E0' },
            headerTintColor: '#E0E0E0',
          }}
        />
        <Stack.Screen name="PDFViewer" component={PDFViewer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
