import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}
        >
        </View>
        <View style={styles.center}>
          <Button mode="contained" onPress={() => this.props.navigation.navigate('Home')}>
            Se connecter
          </Button>
        </View>
        <View style={styles.bottom}>
          <Button mode="outlined" onPress={() => this.props.navigation.navigate('Signin')}>
            S'inscrire
          </Button>
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

export default LoginComponent;
