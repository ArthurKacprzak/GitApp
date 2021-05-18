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
                <Stack.Screen name="Search" component={Search} options={{
                    title: 'Search', headerStyle: {
                        backgroundColor: '#000000',
                        borderBottomWidth: 2,
                    }, headerTitleStyle: {
                        fontSize: 18,
                        color: "#ffffff",
                    },
                }} />
                <Stack.Screen name="RepositoriesView" component={RepositoriesView} options={{
                    title: 'Repository', headerStyle: {
                        backgroundColor: '#000000',
                        borderBottomWidth: 2,
                    }, headerTitleStyle: {
                        fontSize: 18,
                        color: "#ffffff",
                    },
                }} />
                <Stack.Screen name="UserView" component={UserView} options={{
                    title: 'User', headerStyle: {
                        backgroundColor: '#000000',
                        borderBottomWidth: 2,
                    }, headerTitleStyle: {
                        fontSize: 18,
                        color: "#ffffff",
                    },
                }} />
                <Stack.Screen name="IssuesView" component={IssuesView} options={{
                    title: 'Issue', headerStyle: {
                        backgroundColor: '#000000',
                        borderBottomWidth: 2,
                    }, headerTitleStyle: {
                        fontSize: 18,
                        color: "#ffffff",
                    },
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

