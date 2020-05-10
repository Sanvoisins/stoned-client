import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Appbar, Title, TextInput } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as axios from 'axios';

class TakeInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userId: '',
      takeId: '',
      longitude: '',
      latitude: '',
      adress: '',
      date: '',
      time: '',
      quantity: '',
      drug: ''
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
  _getTake = () => {
    const link = 'https://startupweek-stoned.herokuapp.com/takes/' + this.state.takeId;
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      }
    }; 
    axios.get(link, axiosConfig)
    .then((response) => {
      console.log(response.data)
      this.setState({
          longitude: response.data.take.longitude,
          latitude: response.data.take.latitude,
          adress: response.data.take.adress,
          date: response.data.take.date,
          quantity: response.data.take.quantity + " " + response.data.take.unit,
          drug: response.data.take.drug_name,
      })
    })
    .catch((error) => {
        console.log("🚫" + error);
        this.setState({
            errorMessage: 'Problèmes d\'affichage des données'
        });
    });
  };
  componentDidMount = () => {
    this.setState({
      takeId: this.props.route.params.takeId
    });
    this._retrieveData();
    setTimeout(() => {
      this._getTake();
    }, 1000);
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
          <View  style={styles.insideContainer}>
            <TextInput
              style={{heigth: '80%'}}
              mode='outlined'
              label='Date et heure'
              value={this.state.date}
              disabled={true}
            />
          </View>
        </View>
        <View style={styles.allContainer}>
          <View  style={styles.insideContainer}>
            <TextInput
              style={{heigth: '80%'}}
              mode='outlined'
              label='Adresse'
              value={this.state.adress}
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
    maxHeight: '90%'
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
