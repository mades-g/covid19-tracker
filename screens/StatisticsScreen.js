import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../styles/Colors';
import { CasesBox } from '../components/CasesBox';
import { fetchStats, fetchCountryTimeline } from '../actions/statisticsActions';
import { toggleSwitch } from '../actions/uiActions';
import { LocaleSwitch } from '../components/LocaleSwitch';

import { CasesGraph } from '../components/CasesGraph';
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

const styles = StyleSheet.create({
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
    source: {
        flex: 1,
        textAlign: 'center'
    },
    sourceText: {
        color: Colors.colorWhite,
        fontSize: 12,
        textAlign: 'center'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    totalContainerPaddingAndMargin: {
        marginHorizontal: 10,
        marginVertical: 12,
    },
    totalTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 50,
        marginVertical: 12
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

function StatisticsScreen(props) {
    const { fetchStats, toggleSwitch, fetchCountryTimeline, ui: { isToggled }, statistics: { timeline, stats, isFetching }} =  props;

    useEffect(() => {
        fetchCountryTimeline();
        fetchStats(isToggled);
    }, [ isToggled, fetchStats, fetchCountryTimeline ]);

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Statistics</Text>
            <LocaleSwitch onClick={toggleSwitch} value={isToggled} />
            <CasesCounter cases={stats} loading={isFetching} />
            <CasesGraph data={timeline} loading={isFetching} />
        </View>
    );
}

const mapStateToProps = state => {
    return {
        statistics: state.statistics,
        ui: state.ui
    };
};

export default connect(mapStateToProps, { fetchStats, toggleSwitch, fetchCountryTimeline })(StatisticsScreen);