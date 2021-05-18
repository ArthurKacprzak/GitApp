import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { useState } from "react";

export default function IssuesView({ route, navigation }) {

    const { info } = route.params

    const [Branches, setBranches] = useState([]);


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{info.title}</Text>
                <Text style={styles.label}>Body : </Text>
                <Text style={styles.text}>{info.body}</Text>
                <Text style={styles.label}>State : </Text>
                <Text style={styles.text}>{info.state}</Text>
                <Text style={styles.label}>User : </Text>
                <TouchableOpacity activeOpacity={0.4} style={styles.button} onPress={() => navigation.navigate('UserView', { info: info.user })}>
                    <Text style={styles.text}>{info.user.login}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    button: {
        padding: 10,
        margin: 3,
        borderRadius: 25,
        backgroundColor: '#007680',
    },
    text: {
        color: 'white',
    },
    label: {
        paddingTop: 10,
        color: '#00b5c4',
    },
    title: {
        fontSize: 20,
        margin: 30,
        fontWeight: 'bold',
        color: '#00b5c4',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
