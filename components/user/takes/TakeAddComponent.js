import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as axios from 'axios';
import { View, StyleSheet, Picker, AsyncStorage } from 'react-native';
import { Appbar, Subheading, Button, TextInput } from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner';
import DatePicker from 'react-native-datepicker';
import TimePicker from "react-native-24h-timepicker";

class TakeAddComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      token: '', 
      selectedDrogueId: 1,
      drug: [],
      unit: 'grammes',
      quantity: 0,
      quantityStep: 1,
      date: new Date(),
      time: new Date().getHours() + ":" + new Date().getMinutes,
      street: '',
      city: '',
      postcode: '',
      errorMessage: ''
    };
  }
  _setQuantityStep = () => {
    let number = 0;
    switch (this.state.quantityStep) {
      case 1:
        number = 10
        break;
      case 10:
        number = 50
        break; 
      case 50:
        number = 100
        break;
      case 100:
        number = 1
        break;
      default:
        number = 1
        break;
    }
    this.setState({ quantityStep: number});
  }
  _getDate = () => {
    let todayDate = new Date();
    const hour = todayDate.getHours();
    const minutes = todayDate.getMinutes();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };;
    todayDate = todayDate.toLocaleDateString('fr-FR', options);
    this.setState({
      date: todayDate,
      time: hour + ':' + minutes
    });
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
  _getDrugs = () => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      }
    };
    axios.get('https://startupweek-stoned.herokuapp.com/drugs/', axiosConfig)
    .then((response) => {
        // console.log(response.data.drug);
        this.setState({
            drug: response.data.drug
        })
    })
    .catch((error) => {
        console.log("🚫" + error);
        this.setState({
            errorMessage: 'Problèmes d\'affichage des données'
        });
    });
  };
  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted') {
      console.errorMessage('PERMISSION NOT GRANTED');
      this.setState({errorMessage: 'PERMISSION NOT GRANTED!'});
    }
    const location = await Location.getCurrentPositionAsync();
    // this._getGeocodeInverse(location.coords.longitude, location.coords.latitude);
    this._getGeocodeInverse('2.403718', '48.770888');
  }
  _getGeocodeInverse = (longitude, latitude) => {
    fetch('https://api-adresse.data.gouv.fr/reverse/?lon=' + longitude + '&lat=' + latitude, {
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
      if(responseJson.features[0] !== undefined) {
        let dataLocalisation = responseJson.features[0].properties;
        this.setState({
          street: dataLocalisation.housenumber + ' ' + dataLocalisation.street,
          city: dataLocalisation.city,
          postcode: dataLocalisation.postcode,
          longitude: responseJson.features[0].properties.x,
          latitude: responseJson.features[0].properties.y
       })
      } else {
        this.setState({
          errorMessage: 'Problèmes avec la localisation'
        });
      }
   })
   .catch((error) => {
      console.error(error);
   });
  }
  _getGeocodeVerse = () => {
    const localisation = this.state.street + ' ' + this.state.postcode + ' ' + this.state.city; 
    const encodedLocalisation = encodeURIComponent(localisation.trim());
    const link = "https://api-adresse.data.gouv.fr/search/?q=" + encodedLocalisation +"&type=street&autocomplete=1";
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json'
       }
      };
      axios.get(link, axiosConfig)
      .then((response) => {
          // console.log(response.data.features[0].properties.label);
          this.setState({
            longitude: response.data.features[0].geometry.coordinates[0],
            latitude: response.data.features[0].geometry.coordinates[1],
            adress: response.data.features[0].properties.housenumber + ' ' + response.data.features[0].properties.label
          });
      })
      .catch((error) => {
          console.log("🚫" + error);
          this.setState({
              errorMessage: 'Problèmes d\'affichage des données'
          });
      });
  }
  _register = () => {
    const data = this.state;
    if(data.date !== '' && data.time !== '' && data.quantity.toString() !== '' && data.unit !== '' && data.street !== '' && data.postcode !== '' && data.city !== '' && data.latitude !== '' && data.longitude !== '' && data.selectedDrogueId !== 0) {
      this._getGeocodeVerse();
      setTimeout(() => {
        const newTake = {
          date: this.state.date + ' ' + this.state.time,
          quantity: this.state.quantity.toString(),
          unit: this.state.unit,
          adress: this.state.street + " " + this.state.postcode + " " + this.state.city,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          drug_id: this.state.selectedDrogueId
        }
        this._postNewTake(newTake);
        this.props.navigation.navigate('TakesList');
      }, 1000);
    } else {
      this.setState({
        errorMessage: 'Tous les champs n\'ont pas été remplis'
    });
    } 
  }
  _postNewTake = (body) => {
    const link = "https://startupweek-stoned.herokuapp.com/takes/user/" + this.state.userId;
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      }
    };
    axios.post(link, body, axiosConfig)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error("🚫" + error);
    });
  };

  componentDidMount() {
    this._retrieveData();
    setTimeout(() => {
      this._getDrugs();
      this._getLocation();
      this._getDate();
    }, 1000);
  }
  render() {
    const step = this.state.quantityStep;
    const drugs = this.state.drugs;
    return (
      <View style={styles.ownContainer}>
        <Appbar.Header>
            <Appbar.BackAction
                onPress={() => this.props.navigation.navigate('UserMenu')}
            />
            <Appbar.Content
                title="STONED"
                subtitle="Ajout d'une prise"
            />
        </Appbar.Header>
        <View style={styles.middleContainer}>
          <View style={styles.twoInside}>
            <DatePicker
              mode="date"
              placeholder={this.state.date.toString()}
              format="DD/MM/YYYY"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              showIcon={false}
              style={{width: '100%'}}
              customStyles= {{
                placeholderText: {
                  fontSize: 18,
                  color: '#6200EE'
                },
                dateText:{
                  fontSize: 18,
                  color: '#6200EE'
                }
              }}
              onDateChange={(date) => {
                this.setState({date});
              }}
            />
          </View>
          <View style={styles.twoInside}>
            <DatePicker
              mode="time"
              placeholder={this.state.time.toString()}
              format="h:mm"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              showIcon={false}
              style={{width: '100%'}}
              customStyles= {{
                placeholderText: {
                  fontSize: 18,
                  color: '#6200EE'
                },
                dateText:{
                  fontSize: 18,
                  color: '#6200EE'
                }
              }}
              onDateChange={(time) => {
                this.setState({time});
              }}
            />
          </View>
        </View>
        <View style={styles.centerContainers}>
          <View style={styles.oneBottomInside}>
            <TextInput
              mode='outlined'
              label='Adresse'
              value={this.state.street}
              onChangeText={text => this.setState({ street: text })}
            />
          </View>
        </View>
        <View style={styles.centerContainers}>
          <View style={styles.twoInside}>
            <TextInput
              mode='outlined'
              label='Ville'
              value={this.state.city}
              onChangeText={text => this.setState({ city: text })}
            />
          </View>
          <View style={styles.twoInside}>
            <TextInput
              mode='outlined'
              label='Code Postal'
              value={this.state.postcode}
              onChangeText={text => this.setState({ postcode: text })}
            />
          </View>
        </View>
        <View style={styles.firstContainer}>
          <View style={styles.oneInside}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.selectedDrogue}  
              style={{ width: '50%', marginTop: -85, marginBottom: -50}}
              onValueChange={(itemValue, itemPosition) => this.setState({selectedDrogue: itemValue})} 
            >
             {
              this.state.drug.map((element, i) => {return(<Picker.Item key={element.id} label={element.name} value={element.id} />);})
             }
              
          </Picker>
          </View>
        </View>
        <View style={styles.centerContainers}>
          <Button style={styles.twoCenterInside} mode="contained" onPress={() => this._setQuantityStep()}>Quantité x{this.state.quantityStep}</Button>
          <View style={styles.twoInside}>
            <InputSpinner
              max={1000000}
              min={0}
              step={step}
              colorMax={"#6200EE"}
              colorMin={"#6200EE"}
              value={this.state.quantity}
              onChange={(num)=>{this.setState({quantity: num})}}
            />
          </View>
        </View>
        <View style={styles.centerContainers}>
          <Button style={styles.threeInside} labelStyle={styles.labelButton} mode="contained" onPress={() => this.setState({unit: 'grammes'})}>GRAMMES</Button>
          <Button style={styles.threeInside} labelStyle={styles.labelButton} mode="contained" onPress={() => this.setState({unit: 'traces'})}>TRACES</Button>
          <Button style={styles.threeInside} labelStyle={styles.labelButton} mode="contained" onPress={() => this.setState({unit: 'pilules'})}>PILULES</Button>
          <Button style={styles.threeInside} labelStyle={styles.labelButton} mode="contained" onPress={() => this.setState({unit: 'roulés'})}>ROULÉS</Button>
        </View>
        <View style={styles.lastContainer}>
          <Button style={styles.oneLittleInside} mode="contained" onPress={() => this._register()} >Enregistrer</Button>
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
      maxWidth: '100%', 
      maxHeight:'100%'
    },
    firstContainer: { 
      flex: 1, 
      width: '100%', 
      height: '15.9%', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    centerContainers: { 
      flex: 1, 
      width: '100%', 
      height: '14.9%', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'row'
    },
    middleContainer: { 
      flex: 1, 
      width: '100%', 
      maxHeight: '9%', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'row'
    },
    lastContainer: { 
      flex: 1, 
      width: '100%', 
      height: '12%', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    oneInside: { 
      flex: 1, 
      width: '90%', 
      maxHeight: '80%',
      marginTop: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    twoInside: { 
      flex: 1, 
      maxWidth: '40%', 
      height: '70%',
      margin: 15,
      marginTop: 40
    },
    twoCenterInside: { 
      flex: 1, 
      maxWidth: '40%', 
      height: '30%',
      margin: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    threeInside: { 
      flex: 1, 
      maxWidth: '40%', 
      height: '40%',
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    onTopInside: {
      flex: 1, 
      maxWidth: '90%', 
      height: '85%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    },
    oneBottomInside: {
      flex: 1, 
      maxWidth: '90%', 
      height: '85%',
    },
    oneLittleInside: {
      flex: 1, 
      width: '70%', 
      maxHeight: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30
    },
    labelButton: {
        color: "white",
        fontSize: 10,
    }
});
export default TakeAddComponent;
