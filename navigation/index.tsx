/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import Search from "../screens/Search";
import RepositoriesView from "../screens/RepositoriesView";
import UserView from "../screens/UserView";
import IssuesView from "../screens/IssuesView";

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="RepositoriesView" component={RepositoriesView} />
              <Stack.Screen name="UserView" component={UserView} />
              <Stack.Screen name="IssuesView" component={IssuesView} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

