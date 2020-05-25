import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import * as Colors from '../styles/Colors';
import { toMetricFormat } from '../utils/number';

const classes = StyleSheet.create({
    largeTotalContainer: {
        borderRadius: 8,
        flexDirection: 'column',
        height: 100,
        justifyContent: 'space-evenly',
        width: 155,
    },
    largeTotalContainerCases: {
        color: Colors.colorWhite,
        fontSize: 24,
        fontWeight: '600',
        marginHorizontal: 10
    },
    smallTotalContainer: {
        borderRadius: 8,
        flexDirection: 'column',
        height: 100,
        justifyContent: 'space-evenly',
        width: 98
    },
    smallTotalContainerCases: {
        color: Colors.colorWhite,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 26,
        marginHorizontal: 10
    },
    totalContainerHeader: {
        color: Colors.colorWhite,
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 10,
        marginVertical: 10
    },
});

export const CasesBox = ({ total, headerText, boxColor, isLarge, }) => {
    return(
        <View style={[ isLarge ? classes.largeTotalContainer : classes.smallTotalContainer, boxColor ]}>
            <Text style={classes.totalContainerHeader}>{headerText}</Text>
            <Text style={isLarge ? classes.largeTotalContainerCases : classes.smallTotalContainerCases}>
                {toMetricFormat(total)}
            </Text>
        </View>
    );
};