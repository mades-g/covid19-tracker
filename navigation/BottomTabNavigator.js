import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import Home from '../assets/navigation/home.svg';
import HomeActive from '../assets/navigation/home_active.svg';
import News from '../assets/navigation/news.svg';
import NewsActive from '../assets/navigation/news_active.svg';
import Information from '../assets/navigation/information.svg';
import InformationActive from '../assets/navigation/information_active.svg';
import Statistics from '../assets/navigation/statistics.svg';
import StatisticsActive from '../assets/navigation/statistics_active.svg';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, NewsScreen, InformationScreen, StatisticsScreen } from '../screens';

const itemBackGround = "#FFF";
const activeItemBackGround = "#4C79FF";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    navItemActive: {
        backgroundColor: activeItemBackGround
    },
    navItem: {
        backgroundColor: itemBackGround
    },
    row: {
        flexDirection: 'row'
    }
});

function BottomNavBar({ state, descriptors, navigation }) {
    return(
        <View style={styles.row}>
            {state.routes.map(
                (route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return(
                        <TouchableOpacity
                            key={`nav-${index}`}
                            style={styles.flex}
                            onPress={onPress}
                            accessibilityRole="button"
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                        >
                            <BottomBarItem isActive={isFocused} icon={route.name}/>
                        </TouchableOpacity>
                    )
                }
            )}
        </View>
    );
}

function BottomBarItem({ isActive, icon }) {
    // Probably could do better, but you know ¯\_(ツ)_/¯
    const icons = {
        "HomeActive": <HomeActive />,
        "Home": <Home />,
        "NewsActive": <NewsActive />,
        "News": <News />,
        "InformationActive": <InformationActive />,
        "Information": <Information />,
        "StatisticsActive": <StatisticsActive />,
        "Statistics": <Statistics />
    };

    return(
        <View style={isActive ? styles.navItemActive : styles.navItem}>
            {isActive ? icons[`${icon}Active`] : icons[icon] }
        </View>
    );
}

export function BottomTabNavigator() {
    return(
        <Tab.Navigator initialRouteName="Home" tabBar={props => <BottomNavBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="News" component={NewsScreen} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} />
            <Tab.Screen name="Information" component={InformationScreen} />
        </Tab.Navigator>
    );
}