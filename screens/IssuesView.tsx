import * as React from 'react';
import {Button, ScrollView, StyleSheet, Image} from 'react-native';

import { Text, View } from '../components/Themed';
import {useState} from "react";

export default function IssuesView({ route, navigation }) {

    const { info } = route.params
    const [ToRM, setToRM] = useState(true);

    const [Branches, setBranches] = useState([]);

    if (ToRM) {
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{info.title}</Text>
            <Text >Body : {info.body}</Text>
            <Text >State : {info.state}</Text>
            <Text >User : {info.user.login}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    button: {
        padding:10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
