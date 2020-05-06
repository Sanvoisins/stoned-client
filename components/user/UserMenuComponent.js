import React, { Component } from 'react';
import {  View, StyleSheet, AsyncStorage } from 'react-native';
import { Appbar, Avatar, Title, Button, Subheading } from 'react-native-paper';
import * as axios from 'axios';

class UserMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      token: '',
      userId: 0
    };
  }

  _retrieveData = async () => {
    try {
        const token = await AsyncStorage.getItem('@token');
        const userId = await AsyncStorage.getItem('@userId');
        if (userId !== null) {
          // console.log("Home : " + token);
          this.setState({ userId })
        }
        if (token !== null) {
            // console.log("Home : " + token);
            this.setState({ token })
        }
    } catch (error) {
        console.error("🚫" + error);
    }
  };

  _getUser = () => {
    const userId = this.state.userId;
    const link = `https://startupweek-stoned.herokuapp.com/users/${userId}`;
    // console.log(link)
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.state.token
      }
    };
    axios.get(link, axiosConfig)
    .then((response) => {
        // console.log(response.data);
        this.setState({
            user: response.data.user
        })
    })
    .catch((error) => {
        console.error("🚫" + error);
        this.setState({
            errorMessage: 'Problèmes d\'affichage des données'
        });
    });
  }

  componentDidMount = () => {
    this._retrieveData();
    setTimeout(() => {
      this._getUser();
    }, 2000);
  }

  render() {
    return (
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Appbar.Content
                title="STONED"
                // subtitle="Subtitle"
            />
            <Appbar.Action 
                icon="settings"
                onPress={() => console.log('User settings')}
            />
          </Appbar.Header>
          <View style={styles.top} >
            <Avatar.Icon size={150} icon="account" style={styles.avatar} />
            <Title style={styles.title}>{ this.state.user.last_name }</Title>
            <Subheading style={styles.title}>{ this.state.user.email }</Subheading>
            <Subheading style={styles.title}>{ this.state.user.age }</Subheading>
          </View>
          <View style={styles.center} >
            <Button mode="contained" onPress={() => this.props.navigation.navigate('TakesList')} style={styles.button}>
              Mes prises
            </Button>
            <Button dark={true} mode="contained" onPress={() => this.props.navigation.navigate('AddTake')} style={styles.button}>
              Ajouter une prise
            </Button>
          </View>
          <View style={styles.bottom}>
            <Title style={styles.telephone}>Drogues info service : 0 800 23 13 13</Title>
            <Title style={styles.telephone}>Fil santé jeunes : 0 800 235 236</Title>
          </View>
        </View>
    );
  }
}

export default UserMenuComponent;

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
  },
  avatar: {
    margin: 10
  },
  title: {
    margin: 10
  },
  button: {
    margin: 10
  },
  telephone: {
    color: 'green'
  }
});
