import * as React from 'react';
import {Button, ScrollView, StyleSheet, Image, Pressable} from 'react-native';

import {Text, View} from '../components/Themed';
import {useState} from "react";

export default function IssuesView({route, navigation}) {

    const {info} = route.params

    const [Branches, setBranches] = useState([]);


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{info.title}</Text>
                <Text style={styles.text}>Body : {info.body}</Text>
                <Text style={styles.text}>State : {info.state}</Text>
                <Text style={styles.text}>User : {info.user.login}</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('UserView', {info: info.user})}>
                    <Text style={styles.text}>{info.user.login}</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    button: {
        padding:10,
        margin: 3,

        backgroundColor: '#808080',
    },
    text: {
        padding: 10,
        color: '#ffffff',
    },
    title: {
        fontSize: 20,
        margin: 30,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
