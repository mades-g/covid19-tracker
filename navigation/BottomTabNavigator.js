import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, NewsScreen } from '../screens';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
    return(
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="News" component={NewsScreen} />
        </Tab.Navigator>
    );
}