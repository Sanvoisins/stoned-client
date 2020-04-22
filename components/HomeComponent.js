import React, { PureComponent } from 'react';
import {  View, Text } from 'react-native';
import { Header } from 'react-native-paper';

export default class HomeComponent extends PureComponent {
    static navigationOptions = {
        headerMode: null
    }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> HomeComponent </Text>
      </View>
    );
  }
}
