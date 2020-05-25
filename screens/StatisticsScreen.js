import React, { useEffect, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../styles/Colors';
import { CasesBox } from '../components/CasesBox';
import { fetchStats } from '../actions/statisticsActions';

const colorAffected = {
    backgroundColor:  '#FFB259'
};
const colorDeath = {
    backgroundColor:  '#FF5959'
};

const colorRecovered = {
    backgroundColor: '#4CD97B'
};
const colorActive = {
    backgroundColor: '#4DB5FF'
};

const colorSerious = {
    backgroundColor: '#9059FF'
};

const colorWhiteWithOpacity = 'rgba(255, 255, 255, 0.2)';
const colorWhiteWithOutOpacity = 'rgba(255, 255, 255, 1)';

const styles = StyleSheet.create({
    casesGraph: {
        backgroundColor: Colors.colorWhite,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 0.6
    },
    container: {
        backgroundColor: Colors.colorMain,
        flex: 1
    },
    containerTitle: {
        color: Colors.colorWhite,
        flexDirection: 'row',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '500',
        justifyContent: 'space-between',
        lineHeight: 26,
        marginBottom: 25,
        marginHorizontal: 35,
        paddingHorizontal: 20,
        top: 45
    },
    flex: {
        flex: 1
    },
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
    localeContainer: {
        backgroundColor: colorWhiteWithOpacity,
        borderRadius: 50,
        height: 47,
        justifyContent: 'center',
        marginHorizontal: 40,
        marginTop: 50,
        paddingHorizontal: 5,
        width: 327
    },
    localeContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    localeSliderBtn: {
        backgroundColor: colorWhiteWithOutOpacity,
        borderRadius: 50,
        height: 40,
        position: 'absolute',
        top: -12,
        width: 160
    },
    localeText: {
        fontSize: 14,
        fontWeight: '500',
        zIndex: 3
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
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    totalContainerHeader: {
        color: Colors.colorWhite,
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 10,
        marginVertical: 10
    },
    totalContainerPaddingAndMargin: {
        marginHorizontal: 10,
        marginVertical: 15,
    },
    totalTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 50,
        marginVertical: 30
    },
    totalTextRow: {
        color: Colors.colorWhite,
        fontSize: 14,
        fontWeight: '600'
    }
});

function CasesCounter({ cases }) {
    return(
        <View style={styles.flex}>
            <View style={styles.totalTextContainer}>
                {/* stateful */}
                <Text style={styles.totalTextRow}>Total</Text>
            </View>
            <View style={styles.totalContainer}>
                {/* affected and death */}
                <CasesBox isLarge={true} boxColor={colorAffected} headerText={'Affected'} total={cases.total} />
                <CasesBox isLarge={true} boxColor={colorDeath} headerText={'Death'} total={cases.deaths} />
            </View>
            <View style={[ styles.totalContainer, styles.totalContainerPaddingAndMargin ]}>
                {/* recovered active serious */}
                <CasesBox isLarge={false} boxColor={colorRecovered} headerText={'Recovered'} total={cases.recovered} />
                <CasesBox isLarge={false} boxColor={colorActive} headerText={'Active'} total={cases.active} />
                <CasesBox isLarge={false} boxColor={colorSerious} headerText={'Serious'} total={cases.serious} />
            </View>
            <View style={styles.source}>
                <Text style={styles.sourceText}>{cases.source}</Text>
            </View>
        </View>
    );
}

function CasesGraph() {
    return (
        <View style={styles.casesGraph}></View>
    )
}

function StatisticsScreen(props) {
    const { fetchCountryStats, fetchGlobalStats, statistics: { isFetching, isCountryStat }} =  props;

    useEffect(
        () => {
            isCountryStat ? fetchCountryStats() : fetchGlobalStats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Statistics</Text>
            {isFetching ? <Loading /> :
                <>
                    <LocaleSlider {...props} />
                    <CasesCounter {...props} />
                    <CasesGraph />
                </>
            }
        </View>
    );
}

const mapStateToProps = state => {
    return {
        statistics: state.statistics
    };
};

export default connect(mapStateToProps, { fetchCountryStats, fetchGlobalStats })(StatisticsScreen);