import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, List } from 'react-native-paper';

class TakesListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userId: '',
      drugId: '',
      takes: []
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
        this.setState({
            takes: response.data.takes
        })
    })
    .catch((error) => {
        console.log("🚫" + error);
        this.setState({
            errorMessage: 'Problèmes d\'affichage des données'
        });
    });
  };

  componentWillMount = () => {
    this._getTakes();
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
            this.state.takes.map((take) => {
              return(
                <List.Item
                  title={take.adress}
                  description="Item description"
                  left={props => <List.Icon {...props} icon="pill" />}
                />
              )
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
