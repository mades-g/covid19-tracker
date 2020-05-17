import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../assets/navigation/home.svg';
import HomeActive from '../assets/navigation/home_active.svg';
import News from '../assets/navigation/news.svg';
import NewsActive from '../assets/navigation/news_active.svg';
import Information from '../assets/navigation/information.svg';
import InformationActive from '../assets/navigation/information_active.svg';
import Statistics from '../assets/navigation/statistics.svg';
import StatisticsActive from '../assets/navigation/statistics_active.svg';

import { HomeScreen, NewsScreen, InformationScreen } from '../screens';
import StatisticsScreen from '../screens/StatisticsScreen';

const itemBackgroundColor = "#FFF";
const activeItemBackgroundColor = "#4C79FF";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    backgroundColorWhite: {
        backgroundColor: itemBackgroundColor
    },
    bottomBarItem: {
        borderRadius: 25,
        height: 56,
        paddingLeft: 22,
        width: 70,
    },
    bottomBarItemActive: {
        backgroundColor: activeItemBackgroundColor
    },
    bottomNavBar: {
        flex: 0.085
    },
    contentCenter: {
        justifyContent: 'center'
    },
    contentSpaceAround: {
        justifyContent: 'space-around'
    },
    row: {
        flexDirection: 'row'
    },
});

function BottomNavBar({ state, descriptors, navigation }) {
    return(
        <View style={[ styles.bottomNavBar, styles.contentSpaceAround, styles.row ]}>
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
                            key={`tab-${index}`}
                            onPress={onPress}
                            accessibilityRole="button"
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            activeOpacity={1}
                            style={styles.contentCenter}
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
        <View style={[ styles.bottomBarItem, isActive ? styles.bottomBarItemActive : styles.backgroundColorWhite, styles.contentCenter ]}>
            {isActive ? icons[`${icon}Active`] : icons[icon]}
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