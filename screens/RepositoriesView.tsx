import * as React from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {useState} from "react";

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
          <Text>{tmp.name}</Text>
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
          setIssues(res.map((tmp: any) => {
              return (
                  <View style={styles.button}>
                      <Button
                          title={tmp.title}
                          onPress={() => navigation.navigate('IssuesView', {info: tmp})}
                      />
                  </View>
              );
          }));
      });
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{info.full_name}</Text>
          <Text >Language : {info.language}</Text>
          <Text >Description : {info.description}</Text>
          <Text> Autorisation : {info.private ? "private" : "public"}</Text>
          <Text> Fork : {info.fork ? "fork" : "not fork"}</Text>
          <Text> Size : {info.size }</Text>
          <Text> Default Branche Name : {info.default_branch }</Text>
            <Text>Branches</Text>
            <Text>---------------------</Text>
              <ScrollView>
                {Branches}
              </ScrollView>
            <Text>Issues</Text>
            <Text>---------------------</Text>
            <ScrollView>
                {Issues}
            </ScrollView>
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
