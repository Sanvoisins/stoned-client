import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import base64 from 'react-native-base64';
import { Appbar, Button, TextInput } from 'react-native-paper';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      login: 'toinou',
      password: 'toinou'
    };
  }

  _login = () => {
    fetch('https://startupweek-stoned.herokuapp.com/auth/users/login', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(this.state.login + ":" + this.state.password).toString('base64')
      },
    }).then(response => {
      console.log(response);
    })
  }

  componentWillMount() {
    // this._login();
    console.log(`Basic ${base64.encode(`${this.state.login}:${this.state.password}`)}`)
  }

  render() {
    return (
      <View style={styles.container}>
      <Appbar.Header>
            <Appbar.Content
                title="STONED"
                // subtitle="Subtitle"
            />
      </Appbar.Header>
        <View style={styles.top}>
          <TextInput 
            style={styles.text}
            label='Pseudo'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput 
            style={styles.text}
            label='Mot de passe'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
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
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  top: {
    marginTop: 100,
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
  },
  text: {
    marginTop: 20,
    width: 300, 
    height: 50, 
  }
});

export default LoginComponent;
