import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Appbar, FAB, Card, Button, Title } from 'react-native-paper';
import types from '../_enums/types';
import * as axios from 'axios';

export default class HomeComponent extends Component {
    static navigationOptions = {
        headerMode: null
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            PERTU: [],
            STIMU: [],
            DEPRE: [],
            token: '',
            errorMessage: ''
        };
    }

    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('@token');
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
        axios.get('https://startupweek-stoned.herokuapp.com/drugs/types/', axiosConfig)
        .then((response) => {
            this.setState({
                data: response.data.drugs
            })
        })
        .catch((error) => {
            console.log("🚫" + error);
            this.setState({
                errorMessage: 'Problèmes d\'affichage des données'
            });
        });
    };
    _drugs = () => {
       const drugsTypes = this.state.data;
        drugsTypes.map(element => {
            if(element[types.PERTU]) {
                if(element[types.PERTU].length == 0) {
                    // console.log(types.PERTU + ' Vide');
                } else {
                    // console.log(types.PERTU);
                    this.setState({
                        PERTU: element[types.PERTU]
                    })
                    // element[types.PERTU].map(drugPertu => {
                    //     console.log('-' + drugPertu.name)
                    // })
                }
            } else if(element[types.STIMU]) {
                if(element[types.STIMU].length == 0) {
                    // console.log(types.STIMU + ' Vide');
                } else {
                    this.setState({
                        STIMU: element[types.STIMU]
                    })
                    // element[types.STIMU].map(drugStimu => {
                    //     console.log('-' + drugStimu.name)
                    // })
                }
            } else if(element[types.DEPRE]) {
                if(element[types.DEPRE].length == 0) {
                    // console.log(types.DEPRE + ' Vide');
                } else {
                    this.setState({
                        DEPRE: element[types.DEPRE]
                    });
                    // element[types.DEPRE].map(drugDepre => {
                    //     console.log('-' + drugDepre.name)
                    // })
                }
            }
        })
    };
    componentDidMount() {
        this._retrieveData();
        setTimeout(() => {this._getDrugs()}, 1000);
        setTimeout(() => {this._drugs()}, 2000);
    }

  render() {
    const pertuArr = this.state.PERTU;
    const stimuArr = this.state.STIMU;
    const depreArr = this.state.DEPRE;
    return (
      <View>
        <Appbar.Header>
            <Appbar.Content
                title="STONED"
                // subtitle="Subtitle"
            />
            <Appbar.Action
                icon="account-circle"
                onPress={() => this.props.navigation.navigate('UserMenu')}
            />
        </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={true}>
            <View>
                <Title style={styles.typeTitle}>{ types.title.PERTU }</Title>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    pertuArr.map((element, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => { this.props.navigation.navigate('DrugsInfo', { drugId: element.id })}}>
                                <Card style={styles.cards}>
                                    <Card.Title
                                        title={ element.name }
                                        style={styles.cardHeader}
                                    />
                                    <Card.Cover
                                        style={styles.cardsImage}
                                        source={{ uri: element.img }}
                                    />
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
                </ScrollView>
                <Title style={styles.typeTitle} >{ types.title.STIMU }</Title>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    stimuArr.map((element, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => { this.props.navigation.navigate('DrugsInfo', { drugId: element.id })}}>
                                <Card style={styles.cards}>
                                    <Card.Title
                                        title={ element.name }
                                        style={styles.cardHeader}
                                    />
                                    <Card.Cover
                                        style={styles.cardsImage}
                                        source={{ uri: element.img }}
                                    />
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
                </ScrollView>
                <Title style={styles.typeTitle} >{ types.title.DEPRE }</Title>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    depreArr.map((element, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => { this.props.navigation.navigate('DrugsInfo', { drugId: element.id })}}>
                                <Card style={styles.cards}>
                                    <Card.Title
                                        title={ element.name }
                                        style={styles.cardHeader}
                                    />
                                    <Card.Cover
                                        style={styles.cardsImage}
                                        source={{ uri: element.img }}
                                    />
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
                </ScrollView>
            </View>
        </ScrollView>
            <FAB
                style={styles.fab}
                icon="map-marker"
                onPress={() => { this.props.navigation.navigate('Places') }}
            />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    cardsGroup: {
        flex: 1,
        flexDirection: 'row'
    },
    cards: {
        width: 190,
        height: 200,
        marginLeft: 10
    },
    cardsHeader: {
        backgroundColor: '#ff00ff',
        justifyContent: 'center',
        height: 10
    },
    cardsImage:{
        borderRadius: 5,
        height: 190
    },
    typeTitle: {
        margin: 10,
        marginTop: 20
    },
    errorMessage: {
        color: 'red'
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee'
    }
});
