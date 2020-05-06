import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title } from 'react-native-paper'

class TakeInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.ownContainer}>
        <Appbar.Header>
        <Appbar.BackAction
            onPress={() => this.props.navigation.navigate('TakesList')}
        />
        <Appbar.Content
            title="STONED"
            subtitle="Liste de mes prises"
        />
        </Appbar.Header>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <Title>Drogue : Cannabis</Title>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <Title>Nombre de prise : 1 roulé</Title>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <Title>Date : 23/04/2020</Title>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <Title>Heure : 13:45</Title>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View style={styles.insideContainer}>
            <Title>Adresse : 11 rue de l'insurrection parisienne</Title>
          </View>
        </View>
        <View style={styles.lastContainer}>
          <View style={styles.lastInsideContainer}>
            <Title></Title>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ownContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  allContainer: {
    flex: 1,
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastContainer: {
    flex: 1,
    width: '100%',
    minHeight: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideContainer: {
    flex: 1,
    width: '90%',
    maxHeight: '80%'
  },
  lastInsideContainer: {
    flex: 1,
    width: '90%',
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
});
export default TakeInfoComponent;
