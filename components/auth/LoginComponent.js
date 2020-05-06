import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import base64 from 'react-native-base64';
import { Appbar, Button, TextInput, Title } from 'react-native-paper';
import * as axios from 'axios';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      email: '',
      password: '',
      userId: '2'
    };
  }

  _storeData = (token, userId) => {
    try {
      AsyncStorage.multiSet([['@token', token], ['@userId', userId]])
    } catch (error) {
     console.error("🚫" + error);
    }
  }
  login() {
    let encoded = base64.encode(this.state.email.toLowerCase() + ':' + this.state.password.toLowerCase());
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + encoded
      }
    };
    axios.get('https://startupweek-stoned.herokuapp.com/users/login', axiosConfig)
    .then((response) => {
      // console.log(response.data.token);
      this._storeData(response.data.token.token, response.data.token.user_id.toString());
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      console.log("🚫" + error);
      this.setState({
        errorMessage: 'Problèmes de connexion'
      });
    });
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
              <Title style={styles.errorMessage}>{ this.state.errorMessage }</Title>
              <TextInput
                style={styles.text}
                label='Email'
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <TextInput
                style={styles.text}
                label='Mot de passe'
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry={true}
              />
        </View>
        <View style={styles.center}>
          <Button mode="contained" onPress={() => this.login()}>
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
  },
  errorMessage: {
    color: 'red'
  }
});

export default LoginComponent;
