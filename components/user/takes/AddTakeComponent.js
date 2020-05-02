import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { View, StyleSheet, Picker } from 'react-native';
import { Appbar, Subheading, Button, Title } from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner';

class AddTakeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myNumber: 0,
      selectedDrogue: 0,
      date: new Date(),
      data: 'hello',
      street: '',
      city: '',
      postcode: '',
      take: {
        userId: 2,
        drugId: 0,
        date: '',
        longitude: '',
        latitude: '',
        adress: 'adress',
        quantity: 0,
        unit: ''
      },
      errorMessage: ''
    };
  }

  _getGeocode = (longitude, latitude) => {
    fetch('https://api-adresse.data.gouv.fr/reverse/?lon=' + longitude + '&lat=' + latitude, {
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
      if(responseJson.features[0] !== undefined) {
        // console.log(JSON.stringify(responseJson.features[0].properties));
        let dataLocalisation = JSON.stringify(responseJson.features[0].properties);
        this.setState({
          data: dataLocalisation,
          street: dataLocalisation.normalize,
          city: dataLocalisation.city,
          postcode: dataLocalisation.postcode,
          take: {
            'longitude': responseJson.features[0].properties.x,
            'latitude': responseJson.features[0].properties.y,
            'adress': responseJson.features[0].properties.label
          }
       })
      } else {
        this.setState({
          data: 'Problèmes avec la localisation'
        });
      }
   })
   .catch((error) => {
      console.error(error);
   });
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted') {
      console.errorMessage('PERMISSION NOT GRANTED');
      this.setState({errorMessage: 'PERMISSION NOT GRANTED!'});
    }
    const location = await Location.getCurrentPositionAsync();
    this._getGeocode(location.coords.longitude, location.coords.latitude);
  }
  _handlePress = () => this.setState({ expanded: !this.state.expanded });
  _getDate = () => {
    let todayDate = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };;
    todayDate = todayDate.toLocaleDateString('fr-FR', options);
    this.setState({
      date: todayDate
    });
  }
  componentDidMount() {
    this._getLocation();
    this._getDate();
  }
  render() {
    const dataDrugs = this.state.testData
    return (
      <View style={styles.container}>
        <Appbar.Header>
            <Appbar.BackAction
                onPress={() => this.props.navigation.navigate('UserMenu')}
            />
            <Appbar.Content
                title="STONED"
                subtitle="Ajout d'une prise"
            />
        </Appbar.Header>
        <View style={styles.top}>
          <Subheading style={styles.titleLigne} >Drogue</Subheading>
          <Picker
            selectedValue={this.state.selectedDrogue}  
            style={{ width: '50%', marginTop: -85, marginBottom: -50}}
            onValueChange={(itemValue, itemPosition) => this.setState({selectedDrogue: itemValue})} 
          >
            <Picker.Item label="Cannabis" value="3" />
            <Picker.Item label="Coca" value="5" />
          </Picker>
        </View>
        <View style={styles.top}>
          <Subheading style={styles.titleLigne}>Quantité</Subheading>
          <InputSpinner
            max={10}
            min={0}
            step={1}
            colorMax={"black"}
            colorMin={"#6200EE"}
            value={this.state.take.quantity}
            onChange={(num)=>{this.setState({take: {quantity: num}})}}
          />
        </View>
        <View style={styles.center}>

        </View>
        <View style={styles.bottom}>
          <Title>{ this.state.date.toString() }</Title>
          <Title>{ this.state.take.adress }</Title>
          <Button mode="outlined" onPress={() => console.log('Enregistrer')} >Enregistrer</Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column', 
      justifyContent: 'space-between'
    },
    top: {
      width: '100%',
      // height: '25%', 
      backgroundColor: 'green',
      alignItems: 'center',
      flexDirection: 'row'
    },
    center: {
      width: '100%', 
      // height: '37.5%', 
      backgroundColor: 'yellow', 
      alignItems: 'center'
    },
    bottom: {
      width: '100%',
      // height: '37.5%', 
      alignItems: 'center',
      backgroundColor: 'pink'
    },
    titleLigne: {
      marginRight: '10%',
      marginLeft: '10%'
    }
});
export default AddTakeComponent;
