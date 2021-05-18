import * as React from 'react';
import {Button, ScrollView, StyleSheet, Image, Pressable} from 'react-native';

import { Text, View } from '../components/Themed';
import {useState} from "react";
import {FlatList} from "react-native-gesture-handler";

export default function UserView({ route, navigation }) {

  const { info } = route.params
  const [ToRM, setToRM] = useState(true);

  const [Branches, setBranches] = useState([]);

  if (ToRM) {
      fetch(info.repos_url, {
          method: "GET", mode: 'no-cors', headers: {
              "Content-Type": "application/json"
          }
      }).then(res => res.json()).then((res) => {

          setToRM(false);
          setBranches(res);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{info.login}</Text>
      <Text >Type : {info.type}</Text>
        <Image
            style={styles.tinyLogo}
            source={{
                uri: info.avatar_url,
            }}
        />

        <FlatList
            data={Branches}
            renderItem={({item}) => {
                return <Pressable style={styles.button} onPress={() => navigation.navigate('RepositoriesView', {info: item})}>
                    <Text style={styles.text}>{item.name}</Text>
                </Pressable>
            }
            }
        />
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
        margin: 20,
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
