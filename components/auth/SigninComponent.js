import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

class SigninComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
          <TextInput 
            style={styles.text}
            label='E-mail'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput 
            style={styles.text}
            label='Mot de passe'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput 
            style={styles.text}
            label='Confirmer mot de passe'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput 
            style={styles.text}
            label='Prénom'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput 
            style={styles.text}
            label='Nom'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
          <TextInput 
            style={styles.text}
            label='Age'
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
        <View style={styles.bottom}>
          <Button style={styles.button} mode="contained" onPress={() => this.props.navigation.navigate('Home')}>
            Enregistrer mon inscription
          </Button>
        </View>
      </View>
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
  }
});
export default SigninComponent;
