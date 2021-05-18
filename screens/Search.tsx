import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Button, TextInput, CheckBox, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';

import * as WebBrowser from "expo-web-browser";
import Colors from "../constants/Colors";
import { NavigationContainer } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

function Search({ navigation }) {

    const [List, setList] = useState([]);

    const [isSelected, setSelection] = useState(false);

    const [MyText, setText] = useState('');
    const [Page, setPage] = useState(0);
    const [Timer, setTimer] = useState(null);
    const [Load, setLoad] = useState(false);

    const onChangeText = (t: any) => {
        if (Timer != null) {
            clearTimeout(Timer);
        }
        var timer = setTimeout(() => getInfo(t), 500);
        setTimer(timer);
    };

    const getInfo = (t: any, page = 0) => {
        setText(t);
        setPage(page);
        if (Load) {
            return;
        }
        setLoad(true);
        console.log("Get");
        if (!isSelected) {
            fetch("https://api.github.com/search/repositories?q=" + t + "+in:name&page=" + page + "&per_page=25", {
                method: "GET", mode: 'no-cors', headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((res) => {

                setLoad(false);
                console.log("END");
                if (res.items == null) {
                    return;
                }

                setList(page == 0 ? res.items.map((tmp: any) => {
                    return ({ info: tmp, name: tmp.full_name, view: 'RepositoriesView' });
                }) : List.concat(res.items.map((tmp: any) => {
                    return ({ info: tmp, name: tmp.full_name, view: 'RepositoriesView' });
                })));
            });
        } else {
            fetch("https://api.github.com/search/users?q=" + t + "+in:login&page=" + page + "&per_page=25", {
                method: "GET", mode: 'no-cors', headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((res) => {
                setLoad(false);
                console.log("END");
                if (res.items == null) {
                    return;
                }

                setList(page == 0 ? res.items.map((tmp: any) => {
                    return ({ info: tmp, name: tmp.login, view: 'UserView' });
                }) : List.concat(res.items.map((tmp: any) => {
                    return ({ info: tmp, name: tmp.login, view: 'UserView' });
                })));

            });
        }
    }
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 100;
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder={"Search"}
            />
            <View style={styles.next}>
                <Text style={{ color: '#ffffff' }}>User : </Text>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                    tintColors={{ true: '#007680', false: 'black' }}
                />
            </View>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !Load) {
                        getInfo(MyText, Page + 1);
                    }
                }}
                scrollEventThrottle={400}
            >
                <FlatList
                    data={List}
                    renderItem={({ item }) => {
                        return <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => navigation.navigate(item.view, { info: item.info })}>
                            <Text style={styles.white}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                    }
                />
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
    checkbox: {
        alignSelf: "center",
    },
    input: {
        height: 40,
        width: '80%',
        margin: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#292929',
        borderRadius: 10,
        color: 'white',
    },
    button: {
        padding: 10,
        margin: 3,
        borderRadius: 25,
        backgroundColor: '#007680',
    },
    white: {
        color: 'white',
        textAlign: 'center',
    },
    next: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
});


export default Search;
