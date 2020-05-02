import React, { Component } from 'react';
import {  View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Title, Button, Subheading } from 'react-native-paper';

class MenuComponent extends Component {
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
            <Title style={styles.title}>Nom</Title>
            <Subheading style={styles.title}>Prenom</Subheading>
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

export default MenuComponent;

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
