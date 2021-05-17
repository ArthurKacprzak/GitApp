import * as React from 'react';
import {Button, ScrollView, StyleSheet, Image} from 'react-native';

import { Text, View } from '../components/Themed';
import {useState} from "react";

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
          setBranches(res.map((tmp: any) => {
              return (
                  <View style={styles.button}>
                      <Button
                          title={tmp.name}
                          onPress={() => navigation.navigate('RepositoriesView', {info: tmp})}
                      />
                  </View>
              );
          }));
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
        <ScrollView>
            {Branches}
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
