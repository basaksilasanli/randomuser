import React from 'react';
import {View, Text, Image, StyleSheet} from "react-native";

export default function FriendDetail(props) {

    return(
        <View  style={styles.wrapper}>
            <Image source={{uri: props.data.item.picture.medium}}
                   style={styles.image}/>
            <Text style={styles.itemHeader}>{props.data.item.phone}</Text>
            <Text style={styles.itemHeader}>{props.data.item.email}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    wrapper: {
        borderStyle: 'solid',
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding:20,
        display: 'flex',
        alignItems: 'center'
    },
    itemHeader: {
        color: 'black',
        fontSize: 20,
        marginBottom:10
    },
    image: {
        height: 100,
        width: 100,
        marginBottom: 20
    }
});
