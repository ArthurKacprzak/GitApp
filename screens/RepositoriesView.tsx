import * as React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

export default function RepositoriesView({ route, navigation }) {

    const { info } = route.params
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
                <View style={{ marginRight: 20, marginLeft: 20, marginBottom: 10, flex: 1, height: 1, backgroundColor: '#979797' }} />
                <Text style={styles.text}>
                    <Text style={styles.label}>Language: </Text>
                    <Text style={styles.white}>{info.language}</Text>
                </Text>
                <View style={styles.black}>
                    <Text style={styles.label}>Description: </Text>
                    <Text style={styles.white}>{info.description}</Text>
                </View>
                <Text style={styles.black}>
                    <Text style={styles.label}>Authorization: </Text>
                    <Text style={styles.white}>{info.private ? "private" : "public"}</Text>
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Fork: </Text>
                    <Text style={styles.white}>{info.fork ? "fork" : "not fork"}</Text>
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Size: </Text>
                    <Text style={styles.white}>{info.size}</Text>
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.label}>Default Branche Name: </Text>
                    <Text style={styles.white}>{info.default_branch}</Text>
                </Text>
                <View style={{ margin: 20, flex: 1, height: 1, backgroundColor: '#979797' }} />
                <Text style={styles.header}>Branches</Text>
                <ScrollView>
                    <FlatList
                        data={Branches}
                        renderItem={({ item }) => {
                            return <Text style={styles.text}>{item}</Text>
                        }
                        }
                    />
                </ScrollView>
                <View style={{ margin: 20, flex: 1, height: 1, backgroundColor: '#979797' }} />
                <Text style={styles.header}>Issues</Text>

                <FlatList
                    data={Issues}
                    renderItem={({ item }) => {
                        return <TouchableOpacity activeOpacity={0.4} style={styles.button} onPress={() => navigation.navigate('IssuesView', { info: item })}>
                            <Text style={styles.text}>{item.title}</Text>
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
        backgroundColor: 'black',
    },
    button: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 25,
        backgroundColor: '#007680',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 10,
    },
    title: {
        color: '#00b5c4',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 20,
    },
    label: {
        color: '#00b5c4',
    },
    white: {
        color: 'white',
    },
    black: {
        backgroundColor: 'black',
        padding: 10,
    },
    text: {
        padding: 10,
        color: 'white',
    },
});
