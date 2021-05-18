import * as React from 'react';
import {Button, Pressable, ScrollView, StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import {useState} from "react";
import {FlatList} from "react-native-gesture-handler";

export default function RepositoriesView({route, navigation}) {

    const {info} = route.params
    const [ToRM, setToRM] = useState(true);

    const [Branches, setBranches] = useState([]);
    const [Issues, setIssues] = useState([]);

    if (ToRM) {
        fetch(info.url + "/branches", {
            method: "GET", mode: 'no-cors', headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((res) => {

            setToRM(false);
            setBranches(res.map((tmp: any) => {
                return (
                    tmp.name
                );
            }));
        });
        fetch(info.url + "/issues", {
            method: "GET", mode: 'no-cors', headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((res) => {

            console.log(res);
            setToRM(false);
            setIssues(res);
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{info.full_name}</Text>
                <View style={{marginRight: 20, marginLeft: 20, flex: 1, height: 1, backgroundColor: '#979797'}}/>
                <Text style={styles.text}>Language : {info.language}</Text>
                <Text style={styles.text}>Description : {info.description}</Text>
                <Text style={styles.text}> Autorisation : {info.private ? "private" : "public"}</Text>
                <Text style={styles.text}> Fork : {info.fork ? "fork" : "not fork"}</Text>
                <Text style={styles.text}> Size : {info.size}</Text>
                <Text style={styles.text}> Default Branche Name : {info.default_branch}</Text>
                <Text style={styles.title}>Branches</Text>
                <View style={{margin: 20, flex: 1, height: 1, backgroundColor: '#979797'}}/>
                <ScrollView>
                    <FlatList
                        data={Branches}
                        renderItem={({item}) => {
                            return <Text style={styles.text}>{item}</Text>
                        }
                        }
                    />
                </ScrollView>
                <Text style={styles.title}>Issues</Text>
                <View style={{marginRight: 20, marginLeft: 20, flex: 1, height: 1, backgroundColor: '#979797'}}/>

                <FlatList
                    data={Issues}
                    renderItem={({item}) => {
                        return <Pressable style={styles.button} onPress={() => navigation.navigate('IssuesView', {info: item})}>
                            <Text style={styles.text}>{item.title}</Text>
                        </Pressable>
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
    button: {
        padding:10,
        margin: 3,

        backgroundColor: '#808080',
    },
    title: {
        fontSize: 20,
        margin: 30,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    text: {
        padding: 10,
        color: '#ffffff',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
