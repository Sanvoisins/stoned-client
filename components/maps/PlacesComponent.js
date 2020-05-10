import React, { Component } from 'react';
import places from '../../assets/datas/places';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

class PlacesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    // console.log(JSON.stringify(places));
  }

  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('Home')}
          />
          <Appbar.Content
              title="STONED"
              subtitle="Map des structures d'aides"
          />
          <Appbar.Action
              icon="account-circle"
              onPress={() => this.props.navigation.navigate('UserMenu')}
          />
        </Appbar.Header>
        <MapView      
          provider={PROVIDER_GOOGLE} 
          style={styles.map}       
          region={{          
            latitude: 48.8534,          
            longitude: 2.3488,          
            latitudeDelta: 0.10,
            longitudeDelta: 0.10,   
          }} 
        >
          {
            places.map((place, i) => {
              return (
                <MapView.Marker
                  key={i}
                  coordinate={{ longitude: place.longitude, latitude: place.latitude}}
                  title={place.title}
                  description={place.adress}
                  pinColor = {"#6200ee"}
                />
              )
            })
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  }
});

export default PlacesComponent;
