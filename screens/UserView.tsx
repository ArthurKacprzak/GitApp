import * as React from 'react';
import { ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

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
        renderItem={({ item }) => {
          return <TouchableOpacity activeOpacity={0.4} style={styles.button} onPress={() => navigation.navigate('RepositoriesView', { info: item })}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
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
    backgroundColor: 'black',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginBottom: 40,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#007680',
  },
  title: {
    fontSize: 25,
    marginHorizontal: 30,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#00b5c4',
  },
  text: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
