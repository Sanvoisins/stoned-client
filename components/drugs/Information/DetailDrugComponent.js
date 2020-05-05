import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'
import { Button, TextInput, Appbar, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function Separator() {
    return <View style={styles.separator} />;
}

export class DetailDrug extends Component {
    static navigationOptions = {
        headerMode: null
    }
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            content:""
        };
    }
    
    componentDidMount = () => {
        const {title, content} = this.props.route.params
        this.setState({title, content})
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.navigate('DrugsInfo')}
                    />
                    <Appbar.Content
                        title="STONED"
                        subtitle="Information d'une drogue"
                    />
                
                </Appbar.Header>
                <ScrollView>
                    <View style={styles.top}>
                        <Text style={styles.title}>
                            {this.state.title}
                        </Text>
                        
                    </View>
                 
                    <View style={styles.center}>
                    <Text style={styles.text}>
                        {this.state.content}
                    </Text>
                    </View>
                    <View style={styles.bottom}></View>
                </ScrollView>
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
      height: '15%', 
      backgroundColor: 'white', 
      alignItems: 'center', 
      padding: 20
    },
    center: {
      width: '100%', 
      height: '80%', 
      backgroundColor: 'grey', 
      alignItems: 'center', 
      padding: 20
    },
    title: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: "bold",
        textShadowColor: "grey",
        textShadowRadius: 3
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 5
    },
    separator: {
        marginBottom: 15,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
        marginHorizontal: 30
    },

});

export default DetailDrug
