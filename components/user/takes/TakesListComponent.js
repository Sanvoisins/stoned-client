import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Appbar, List, Subheading } from 'react-native-paper';
import * as axios from 'axios';

class TakesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userId: '',
      drugId: '',
      takes: [],
      errorMessage: 'Pas de prises'
    };
  }
  _retrieveData = async () => {
    try {
        const token = await AsyncStorage.getItem('@token');
        const userId = await AsyncStorage.getItem('@userId');
        if (userId !== null) {
          // console.log("Home : " + userId);
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
  _getTakes = () => {
    const link = 'https://startupweek-stoned.herokuapp.com/takes/user/' + this.state.userId;
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      }
    }; 
    axios.get(link, axiosConfig)
    .then((response) => {
      if(response.data.takes !== undefined) {
        this.setState({
          takes: response.data.takes
        })
      }
    })
    .catch((error) => {
        console.log("🚫" + error);
        this.setState({
            errorMessage: 'Problèmes d\'affichage des données'
        });
    });
  };

  componentDidMount = () => {
    this._retrieveData()
    setTimeout(() => {
      this._getTakes();
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('UserMenu')}
          />
          <Appbar.Content
              title="STONED"
              subtitle="Liste de mes prises"
          />
        </Appbar.Header>
        <ScrollView>
          {
            this.state.takes.map((take, i) => {
              if(take.drug_name === undefined) {
                return (
                  <Title>{ this.state.errorMessage }</Title>
                )
              } else {
                return(
                  <List.Item
                    key= {i}
                    title={take.drug_name}
                    description={<Subheading>{take.quantity} {take.unit}</Subheading>}
                    left={props => <List.Icon {...props} icon="pill" />}
                    right={props => <List.Icon {...props} icon="arrow-right" />}
                    onPress={() => { this.props.navigation.navigate('TakeInfo', {takeId: take.id})}}
                  />
                )
              }
            })
          }
        </ScrollView>
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
  }
});

export default TakesListComponent;
