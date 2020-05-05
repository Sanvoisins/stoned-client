import React, { Component } from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Button, TextInput, Appbar, Title } from 'react-native-paper';
import * as axios from 'axios';

class SigninComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      email:'',
      password: '',
      confirmedPassword:'',
      first_name:'',
      last_name:'',
      age:'',
    };
  }
  htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  _registerUser = () => {
    const data = this.state;
    console.log(data);
    if(data.email !== "" && data.password !== "" && data.confirmedPassword !== "" && data.first_name !== "" && data.last_name !== "" && data.age !== "") {
      console.log('Passwords : ' + this.state.password + ' / ' + this.state.confirmedPassword)
      if(this.state.password !== this.state.confirmedPassword) {
        this.setState({ errorMessage: 'Password are not the same'})
      } else {
        const newUser = {
          "email": this.htmlEntities(data.email),
          "password": this.htmlEntities(data.password),
          "first_name": this.htmlEntities(data.first_name),
          "last_name": this.htmlEntities(data.last_name),
          "age": this.htmlEntities(data.age),
        };
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
          }
        };
        console.log(newUser);
        axios.post('https://startupweek-stoned.herokuapp.com/users/', newUser, axiosConfig)
        .then((response) => {
          this.props.navigation.navigate('Login');
        })
        .catch(function (error) {
          console.log("🚫" + error);
          console.error(error);
        });
      }
    } else (
      this.setState({ errorMessage: 'Vous n\'avez pas tous rempli'})
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => this.props.navigation.navigate('Login')}
          /> 
          <Appbar.Content
                title="STONED"
                // subtitle="Subtitle"
          />       
        </Appbar.Header>
      {/* <View style={styles.top}>
      </View> */}
        <View style={styles.center}>
          <Title style={styles.errorMessage}>{ this.state.errorMessage }</Title>
          <TextInput 
            style={styles.text}
            label='Email'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            autoCompleteType="email"
            textContentType="emailAddress"
          />
          <TextInput 
            style={styles.text}
            label='Mot de passe'
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry={true}
          />
          <TextInput 
            style={styles.text}
            label='Confirmer mot de passe'
            value={this.state.confirmedPassword}
            onChangeText={text => this.setState({confirmedPassword: text })}
            autoCompleteType="password"
            textContentType="password"
            secureTextEntry={true}
          />
          <TextInput 
            style={styles.text}
            label='Prénom'
            value={this.state.first_name}
            onChangeText={text => this.setState({ first_name: text })}
            autoCompleteType="name"
            textContentType="name"
          />
          <TextInput 
            style={styles.text}
            label='Nom'
            value={this.state.last_name}
            onChangeText={text => this.setState({ last_name: text })}
            autoCompleteType="name"
            textContentType="name"
          />
          <TextInput 
            style={styles.text}
            label='Age'
            value={this.state.age}
            mode='numeric'
            onChangeText={text => this.setState({ age: text })}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.bottom}>
          <Button style={styles.button} mode="contained" onPress={() => this._registerUser()}>
            Enregistrer mon inscription
          </Button>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: 40
  },
  container: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  top: {
    width: '100%', 
    height: '20%', 
    backgroundColor: 'white', 
    alignItems: 'center', 
    padding: 20
  },
  center: {
    width: '100%', 
    height: '55%', 
    backgroundColor: 'white', 
    alignItems: 'center', 
    padding: 20
  },
  bottom: {
    width: '100%', 
    height: '25%', 
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    marginTop: 20,
    width: 300, 
    height: 50
  },
  errorMessage: {
    color: 'red'
  }
});
export default SigninComponent;
