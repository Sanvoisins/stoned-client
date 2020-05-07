import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Title, TextInput } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class TakeInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toke: '',
      userId: '',
      longitude: 2.403718,
      latitude: 48.770888,
      street: "11 rue de l'insurrection parisienne",
      postcode: '94600',
      city: 'Choisy le Roi',
      date: '7/05/2020',
      time: '23:45',
      quantity: '1 roulé',
      drug: 'Cannabis'
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
            <TextInput
              style={{heigth: '70%'}}
              mode='outlined'
              label='Drogue'
              value={this.state.drug}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <TextInput
              style={{heigth: '70%'}}
              mode='outlined'
              label='Nombre de prises'
              value={this.state.quantity}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideCenterContainer}>
            <TextInput
              style={{width: '40%', margin: 10}}
              mode='outlined'
              label='Date'
              value={this.state.date}
              disabled={true}
            />
            <TextInput
              style={{width: '40%', margin: 10}}
              mode='outlined'
              label='Heure'
              value={this.state.time}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <TextInput
              style={{heigth: '70%'}}
              mode='outlined'
              label='Adresse'
              value={this.state.street}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.allContainer}>
          <View style={styles.insideCenterContainer}>
          <TextInput
              style={{width: '40%', margin: 10}}
              mode='outlined'
              label='Code Postal'
              value={this.state.postcode}
              disabled={true}
            />
            <TextInput
              style={{width: '40%', margin: 10}}
              mode='outlined'
              label='Ville'
              value={this.state.city}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.lastContainer}>
            <MapView      
              provider={PROVIDER_GOOGLE} 
              style={styles.lastInsideContainer}       
              region={{          
                latitude: this.state.latitude,          
                longitude: this.state.longitude,          
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,   
              }} 
            >
              <MapView.Marker
              coordinate={{ longitude: this.state.longitude, latitude: this.state.latitude}}
              title={this.state.markerTitle}
              pinColor = {"#6200ee"}
            />
            </MapView>
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
    borderTopWidth: 3,
    borderTopColor: '#6200ee'
  },
  insideContainer: {
    flex: 1,
    width: '90%',
    maxHeight: '80%'
  },
  insideCenterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxHeight: '80%'
  },
  lastInsideContainer: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default TakeInfoComponent;
