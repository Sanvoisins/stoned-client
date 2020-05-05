import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native'
import { Appbar, Button, Portal, Modal } from 'react-native-paper';
import * as axios from 'axios';

function Separator1() {
    return <View style={styles.separator1} />;
}

function Separator2() {
    return <View style={styles.separator2} />;
}

export class DrugsInfoComponent extends Component {
    static navigationOptions = {
        headerMode: null
    }
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            image : { uri: 'https://picsum.photos/700' },
            buttonTitle : "Statut",
            drug : {}
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

    _getDrug = () => {
        const { drugId } = this.props.route.params;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            }
        };
        axios.get("https://startupweek-stoned.herokuapp.com/drugs/types/" + drugId, axiosConfig)
        .then((response) => {
            // console.log(JSON.stringify(response.data.drugs[0].name))
            this.setState({drug:response.data.drugs[0]})
        })
        .catch((error) => {
            console.log("🚫" + error);
            this.setState({
                errorMessage: "Problèmes d'affichage des données"
            });
        });
    }

    componentDidMount = () => {
        this._retrieveData();
        setTimeout(() => {this._getDrug()}, 1000);
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
                        {this.state.drug.type_name}
                    </Button>
                </View>
                
                <View style={styles.bottomCenter}>
                <Separator1></Separator1>
                    <Text style={styles.resume}>
                        {this.state.drug.summary}
                    </Text>
                </View>
              </View>
              <Separator2></Separator2>
              <View style={styles.bottom}>
                    <Text style={styles.title2}>
                        Information
                    </Text>
                    <View style={styles.buttonList}>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Statut legal", content:this.state.drug.legal_status})}}>
                            Statut légal
                        </Button>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Depistage", content:this.state.drug.drug_testing})}}>
                            Depistage
                        </Button>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Mode de consommation", content:this.state.drug.way_consuming})}}>
                            Mode de consommation
                        </Button>
                    </View>
                    <View style={styles.buttonList}>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Effets recherchés", content:this.state.drug.desired_effect})}}>
                            Effets recherchés
                        </Button>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:" Effets secondaires", content:this.state.drug.secondary_effect})}}>
                            Effets secondaires
                        </Button>
                    </View>
                    <View style={styles.buttonList}>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Risques et complications", content:this.state.drug.risks_complications})}}>
                            Risques et complications
                        </Button>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Dépendance", content:this.state.drug.addiction})}}>
                            Dépendance
                        </Button>
                        <Button style={styles.button} mode="contained" onPress={() => { this.props.navigation.navigate('DetailDrug', {title:"Conseils", content:this.state.drug.risk_reduction_tips})}}>
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
        height: '30%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    bottom: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        alignItems: 'center'

    },
    topCenter: {
        backgroundColor: "white",
        flexDirection: "row"
    },
    bottomCenter: {
        marginTop: 15,
        backgroundColor: "white"
    },
    separator1: {
        marginBottom: 15,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
        marginHorizontal: 30
    },
    separator2: {
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
        marginRight: 50,
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
    }
  });
export default DrugsInfoComponent
