import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from './components/auth/LoginComponent';
import SigninComponent from './components/auth/SigninComponent';
import HomeComponent from './components/HomeComponent';
import UserMenuComponent from './components/user/UserMenuComponent';
import TakesListComponent from './components/user/takes/TakesListComponent';
import DrugsInfoComponent from './components/drugs/DrugsInfoComponent'
import TakeAddComponent from './components/user/takes/TakeAddComponent';
import TakeInfoComponent from './components/user/takes/TakeInfoComponent';

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
          name="DrugsInfo"
          component={DrugsInfoComponent}
        />
        <Stack.Screen
          name="TakesList"
          component={TakesListComponent}
        />
        <Stack.Screen
          name="TakeInfo"
          component={TakeInfoComponent}
        />
        <Stack.Screen
          name="AddTake"
          component={TakeAddComponent}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenuComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
