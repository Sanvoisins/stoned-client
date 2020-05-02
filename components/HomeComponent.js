import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Searchbar, Card, List } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";  

export default class HomeComponent extends PureComponent {
    static navigationOptions = {
        headerMode: null
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return (
      <View>
        <Appbar.Header>
            <Appbar.Content
                title="STONED"
                // subtitle="Subtitle"
            />
            <Appbar.Action 
                icon="account-circle"
                onPress={() => this.props.navigation.navigate('Menu')}
            />
        </Appbar.Header>
        <Searchbar
            placeholder="Recherche" 
            value=""
        />
        <View>
            <List.Item
                title="Premier Type"
            />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Drug 1"
                        style={styles.cardHeader}
                        onPress={() => this.props.navigation.navigate('DrugsInfo')}
                    />
                    <Card.Cover 
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Drug 2"
                        style={styles.cardHeader}
                    />
                    <Card.Cover
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Drug 3"
                        style={styles.cardHeader}
                    />
                    <Card.Cover
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Drug 4"
                        style={styles.cardHeader}
                    />
                    <Card.Cover
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
            </ScrollView>
        </View>
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
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});
