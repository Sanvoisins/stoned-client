import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from './components/auth/LoginComponent';
import SigninComponent from './components/auth/SigninComponent';
import HomeComponent from './components/HomeComponent';
import MenuComponent from './components/user/MenuComponent';
import DrugsInfoComponent from './components/drugs/DrugsInfoComponent'
import TestFile from './components/drugs/TestFile'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginComponent} 
        />
        <Stack.Screen 
          name="Signin" 
          component={SigninComponent} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeComponent} 
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuComponent} 
        />
        <Stack.Screen 
          name="DrugsInfo" 
          component={DrugsInfoComponent} 
        />
        <Stack.Screen 
          name="TestFile" 
          component={TestFile} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
