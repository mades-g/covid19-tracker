import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

import * as Colors from '../styles/Colors';

const screeWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colorWhite,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 0.6,
        flexDirection: 'column',
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign:'center'
    }
});

// const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

// const axesSvg = { fontSize: 10, fill: 'grey' };
// const verticalContentInset = { top: 10, bottom: 10 }
// const xAxisHeight = 30;

const mockData = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

const renderGraph = ({ item }) => {

    return(
        <View style={{ flex: 1, marginHorizontal: 10, width: 299 }}>
            <LineChart
                style={{ flex: 1 }}
                data={mockData}
                contentInset={verticalContentInset}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
            >
                <Grid />
            </LineChart>
            <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={mockData}
                formatLabel={(value, index) => index}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
            />
        </View>
    )
};

const Foo = ({ data }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Daily New Cases</Text>
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={mockData}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    data={data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderGraph}
                />
            </View>
        </View>
    )
}
export const CasesGraph = (props) => {
    return(
        <>
            {!props.loading && <Foo {...props}/>}
        </>
    )
}