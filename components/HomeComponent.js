import React, { PureComponent } from 'react';
import {  View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { Appbar, Searchbar, Avatar, Card, List } from 'react-native-paper';
import CardView from 'react-native-cardview';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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
                        title="Card Title"
                        style={styles.cardHeader}
                    />
                    <Card.Cover 
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Card Title"
                        style={styles.cardHeader}
                    />
                    <Card.Cover
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Card Title"
                        style={styles.cardHeader}
                    />
                    <Card.Cover
                        style={styles.cardsImage}
                        source={{ uri: 'https://picsum.photos/700' }} 
                    />
                </Card>
                <Card style={styles.cards}>
                    <Card.Title 
                        title="Card Title"
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
    }
});
