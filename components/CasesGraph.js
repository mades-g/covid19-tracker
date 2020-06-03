import React from 'react';
import * as scale from 'd3-scale'
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Grid, BarChart, XAxis, YAxis } from 'react-native-svg-charts'

import { formatDate } from '../utils/date';
import * as Colors from '../styles/Colors';

const xAxisHeight = 20;
const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };

const styles = StyleSheet.create({
    XAxis: {
        height: xAxisHeight
    },
    container: {
        backgroundColor: Colors.colorWhite,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 0.6,
        flexDirection: 'column'
    },
    defaultFlex1: {
        flex: 1
    },
    graphContainer: {
        flexDirection: 'row',
        height: null,
        marginHorizontal: 10,
        marginTop: 23,
        paddingHorizontal: 10,
        width: Dimensions.get('screen').width - (10 * 2),
    },
    graphContainerWithXAxisContainer: {
        marginHorizontal: 10,
        paddingRight: 10,
        width: 299
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        left: '35%',
        marginTop: 1,
        position: 'absolute'
    }
});

const renderGraph = ({ item }) => {
    return (
        <View style={styles.graphContainer}>
            <YAxis
                data={item}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
                formatLabel={(value) => Number.isInteger(value) ?  value : ''}
                yAccessor={({ item }) => item.value}
            />
            <View style={[ styles.defaultFlex1, styles.graphContainerWithXAxisContainer ]}>
                <BarChart
                    style={styles.defaultFlex1}
                    data={item}
                    contentInset={verticalContentInset}
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                    gridMin={0}
                    yAccessor={({ item }) => item.value}
                    xAccessor={({ item }) => item.date}
                    xScale={scale.scaleBand}
                >
                    <Grid />
                </BarChart>
                <XAxis
                    style={styles.XAxis}
                    data={item}
                    svg={axesSvg}
                    scale={scale.scaleBand}
                    formatLabel={(_, index) => formatDate(item[index].date)}
                />
            </View>
        </View>
    )
};

const Graph = ({ data }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Daily New Cases</Text>
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
    )
}
export const CasesGraph = (props) => {
    return(
        <>
            {!props.loading && <Graph {...props}/>}
        </>
    )
}