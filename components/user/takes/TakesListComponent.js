import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

class TakesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('UserMenu')}
          />
          <Appbar.Content
              title="STONED"
              subtitle="Liste de mes prises"
          />
        </Appbar.Header>
        <View style={styles.top}>
          <Button onPress={() => {this.props.navigation.navigate('TakeInfo')}} mode='contained'>Information TAKE</Button>
        </View>
        <View style={styles.center}>

        </View>
        <View style={styles.bottom}>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between'
  },
  top: {
    width: '100%', 
    height: '33.33%', 
    backgroundColor: 'white', 
    alignItems: 'center', 
    padding: 20
  },
  center: {
    width: '100%', 
    height: '33.33%', 
    backgroundColor: 'white', 
    alignItems: 'center', 
    padding: 20
  },
  bottom: {
    width: '100%', 
    height: '33.33%', 
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default TakesListComponent;
