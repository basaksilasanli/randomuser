import React, {Component} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Actions } from 'react-native-router-flux'; // New code

export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNumber: Math.floor(Math.random() * 10) + 3,
            friends: []
        }
    };
    async componentDidMount() {
        await this.fetchFriends();
    };

    async fetchFriends() {
        const { randomNumber } = this.state;
        try {
            const userApiCall = await fetch(`https://randomuser.me/api/?results=${randomNumber}`);
            const friends = await userApiCall.json();
            this.setState({friends: friends.results});
        } catch(err) {
            console.log("Error fetching data", err);
        }
    };

    renderItem(data) {
        return(
            <TouchableOpacity onPress={() => Actions.friendDetail({data: data, title:data.item.name.first +' '+ data.item.name.last } )}>
                <Image source={{uri: data.item.picture.thumbnail}}
                       style={styles.image}/>
                <Text style={styles.itemHeader}>{data.item.name.first}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const detail = this.props.detail.item;
        return (
            <View style={styles.wrapper}>
                <View style={styles.listItemContainer}>
                    <Image source={{uri: detail.picture.medium}}
                           style={styles.image}/>
                    <View>
                        <Text style={styles.itemHeader}>{detail.name.first} {detail.name.last}</Text>
                        <Text style={styles.itemHeader}>{detail.email}</Text>
                        <Text style={styles.itemHeader}>{detail.phone}</Text>
                    </View>
                </View>
                <Text style={styles.itemHeader}>Friends ({this.state.randomNumber})</Text>
                <ScrollView horizontal={true} >
                    <FlatList
                        style={styles.friendsContainer}
                        data={this.state.friends}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.phone}
                    />
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderStyle: 'solid',
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding:20
    },
    listItemContainer: {
        flexDirection: 'row',
        paddingBottom:20,
    },
    friendsContainer: {
        flexDirection: 'row',
    },
    itemHeader: {
        color: 'black',
        fontSize: 20,
        marginBottom:10
    },
    image: {
        backgroundColor: 'transparent',
        height: 50,
        width: 50,
        marginRight: 20
    }
});