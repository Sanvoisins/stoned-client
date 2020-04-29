import React, { Component } from 'react';
import {  View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Title } from 'react-native-paper';

class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <Appbar.Header>
            <Appbar.Content
                title="STONED"
                // subtitle="Subtitle"
            />
            <Appbar.Action 
                icon="account-circle"
                onPress={() => this.props.navigation.navigate('Menu')}
            />
          </Appbar.Header>
          <View style={{width: '100%', height: '33.33%', backgroundColor: 'red', alignItems: 'center'}} >
            <Avatar.Icon size={150} icon="account" style={styles.avatar} />
          </View>
          <View style={{width: '100%', height: '33.33%', backgroundColor: 'blue'}} ></View>
          <View style={{width: '100%', height: '33.33%', backgroundColor: 'yellow'}} ></View>
        </View>
    );
  }
}

export default MenuComponent;

const styles = StyleSheet.create({
  top: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      height: 100
  },
  center: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
  },
  avatar: {
    margin: 20
  }
});
