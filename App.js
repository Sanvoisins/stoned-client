import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './components/HomeComponent';
import MenuComponent from './components/user/MenuComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeComponent} 
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuComponent} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
