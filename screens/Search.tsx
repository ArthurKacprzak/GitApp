import React, {useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Button, TextInput, CheckBox} from 'react-native';
import { Text, View } from '../components/Themed';

import * as WebBrowser from "expo-web-browser";
import Colors from "../constants/Colors";
import {NavigationContainer} from "@react-navigation/native";

function Search({navigation} ) {

    const [List, setList] = useState([]);

    const [isSelected, setSelection] = useState(false);

    const [Text, setText] = useState('');

    const onChangeText = (t: any) => {
        setText(t);
        if (!isSelected) {
            fetch("https://api.github.com/search/repositories?q=" + Text + "+in:name", {
                method: "GET", mode: 'no-cors', headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((res) => {
                setList(res.items.map((tmp: any) => {
                    return (
                        <View style={styles.button}>
                            <Button
                                title={tmp.full_name}
                                onPress={() => navigation.navigate('RepositoriesView', {info: tmp})}
                            />
                        </View>
                    );
                }));
            });
        } else {
            fetch("https://api.github.com/search/users?q=" + Text + "+in:login", {
                method: "GET", mode: 'no-cors', headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((res) => {
                setList(res.items.map((tmp: any) => {
                    return (
                        <View style={styles.button}>
                            <Button
                                title={tmp.login}
                                onPress={() => navigation.navigate('UserView', {info: tmp})}
                            />
                        </View>
                    );
                }));
            });
        }
    }



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
            />
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
            />
            <ScrollView>
                {List}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        alignSelf: "center",
    },
    input: {
        height: 40,
        width:300,
        margin:10,
        borderWidth: 1,
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


export default Search;
