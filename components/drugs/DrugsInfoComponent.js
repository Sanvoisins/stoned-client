import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native'
import { Appbar, Button, Portal, Modal } from 'react-native-paper';
import * as axios from 'axios';

function Separator() {
    return <View style={styles.separator} />;
}

export class DrugsInfoComponent extends Component {
    static navigationOptions = {
        headerMode: null
    }
    constructor(props) {
        super(props);
        this.state = {
            idDrug : 1,
            token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MzUsImV4cCI6MTU4ODY5NzI2OH0.-XvlmaABXrxRSiciYhBiAqsG4GypUcWTDp3xFceo09M",
            visible: false,
            image : { uri: 'https://picsum.photos/700' },
            buttonTitle : "Statut",
            drug : {},
            // title1 : "Cannabis",
            resume1 : "Le cannabis est une plante : il se présente sous forme « d’herbe » (mélange de feuilles, de tiges et de fleurs séchées), de résine (obtenue en pressant les fleurs), ou d’huile (résine macérée dans de l’alcool).",
            resume2 : "Le principe actif responsable des effets du cannabis est le THC (Tétrahydrocannabinol). Sa concentration varie de manière importante, de 10% en moyenne pour l’herbe et la résine à 30% pour l’huile. Plus la concentration est élevée, plus les effets du cannabis peuvent être importants."
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
            console.error(":no_entry_sign:" + error);
        }
    };

    _getDrug = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            }
        };
        axios.get("https://startupweek-stoned.herokuapp.com/drugs/types/" + this.state.idDrug, axiosConfig)
        .then((response) => {
            // console.log(JSON.stringify(response.data.drugs[0].name))
            this.setState({drug:response.data.drugs[0]})
            console.log(this.state.drug.name)
        })
        .catch((error) => {
            console.log(":no_entry_sign:" + error);
            this.setState({
                errorMessage: "Problèmes d'affichage des données"
            });
        });
    }

    componentDidMount = () => {
        this._getDrug();
    }
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <Appbar.Content
                        title="STONED"
                        subtitle="Information d'une drogue"
                    />
                </Appbar.Header>
              <View style={styles.top}>
                <Image
                    style={styles.image}
                    source={this.state.image}
                />
              </View>
              <View style={styles.center}>
                  <View style={styles.topCenter}>
                    <Text style={styles.title1}>
                    {this.state.drug.name}
                        </Text>
                        <Button style={styles.buttonFalse} mode="contained">
                            Drogue Douce
                        </Button>

                    </View>
                    <View style={styles.bottomCenter}>
                        <Text style={styles.resume}>
                            {this.state.resume1}
                        </Text>
                        <Text style={styles.resume}>
                            {this.state.resume2}
                        </Text>
                        {/* <Button mode="outlined" onPress={() => this.props.navigation.navigate('TestFile')}>
            Go drugs
          </Button> */}
                    </View>
              </View>
              <Separator></Separator>
              <View style={styles.bottom}>
                    <Text style={styles.title2}>
                        Information
                    </Text>
                    <View style={styles.buttonList}>
                        <Button style={styles.button} mode="contained">
                            Statut légal
                        </Button>
                        <Button style={styles.button} mode="contained">
                            Depistage
                        </Button>
                        <Button style={styles.button} mode="contained">
                            Mode de consommation
                        </Button>
                    </View>
                    <View style={styles.buttonList}>
                        <Button style={styles.button} mode="contained">
                            Effet recherché
                        </Button>
                        <Button style={styles.button} mode="contained">
                            Effets secondaires
                        </Button>
                    </View>
                    <View style={styles.buttonList}>
                        <Button style={styles.button} mode="contained">
                            Risques et complications
                        </Button>
                        <Button style={styles.button} mode="contained">
                            Dépendance
                        </Button>
                        <Button style={styles.button} mode="contained">
                            Conseils
                        </Button>
                    </View>

              </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    top: {
        width: '100%',
        height: '20%',
        backgroundColor: 'grey',
        alignItems: 'center'
    },
    center: {
        width: '100%',
        height: '35%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    bottom: {
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        alignItems: 'center'

    },
    topCenter: {
        backgroundColor: "white",
        flexDirection: "row"
    },
    bottomCenter: {
        marginTop: 40,
        backgroundColor: "white"
    },
    separator: {
        marginTop: 20,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
        marginHorizontal: 30
    },
    image: {
        width: 400,
        height: 200
    },
    title1: {
        marginRight: 60,
        marginTop: 20,
        fontSize: 40,
        fontWeight: "bold",
        textShadowRadius: 100
    },
    title2: {
        marginRight: 230,
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold"
    },
    buttonFalse: {
        backgroundColor: "#32CD32",
        height : 35,
        marginTop : 22
    },
    buttonList : {
        marginTop : 20,
        flexDirection: "row",
        marginLeft: 15
    },
    button : {
        backgroundColor: "#1E90FF",
        marginRight: 10,
        flex : 1,
        height : 40
    },
    textButton : {
        fontWeight : "bold",
    },
    resume: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 5,
        marginVertical: 5,
    }
  });
export default DrugsInfoComponent
