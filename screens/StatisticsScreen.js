import React, { useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import * as Colors from '../styles/Colors';
import { Loading } from '../components/Loading';
import { fetchCountryStats, fetchGlobalStats } from '../actions/statisticsActions';

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
    colorActive,
    colorAffected,
    colorDeath,
    colorRecovered,
    colorSerious,
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

function LocaleSlider(props) {
    const { fetchCountryStats, fetchGlobalStats, statistics: { isCountryStat }} = props;
    const sliderAnim = useRef(new Animated.Value(0)).current;

    useEffect(
        () => {
            if (!isCountryStat) {
                return Animated.timing(sliderAnim, {
                    toValue: 157,
                }).start()
            }

            return Animated.timing(sliderAnim, {
                toValue: 0,
            }).start()
        }
        , [ isCountryStat, sliderAnim ]);

    return(
        <View style={styles.localeContainer}>
            <View style={styles.localeContainerRow}>
                <TouchableWithoutFeedback onPress={() => fetchCountryStats()}>
                    <Text style={styles.localeText}>My Country</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => fetchGlobalStats()}>
                    <Text style={styles.localeText}>Global</Text>
                </TouchableWithoutFeedback>
                <Animated.View style={[ styles.localeSliderBtn, { left: sliderAnim }]} />
            </View>
        </View>
    );
}

function CasesCounter(props) {
    const { isCountryStat, countryStats, globalStats } = props.statistics;

    const stats = isCountryStat ? countryStats : globalStats;

    return(
        <View style={styles.flex}>
            <View style={styles.totalTextContainer}>
                {/* statefull */}
                <Text style={styles.totalTextRow}>Total</Text>
            </View>
            <View style={styles.totalContainer}>
                {/* affected and death */}
                <View style={[ styles.largeTotalContainer, styles.colorAffected ]}>
                    <Text style={styles.totalContainerHeader}>Affected</Text>
                    <Text style={styles.largeTotalContainerCases}>
                        {stats.total_cases}
                    </Text>
                </View>
                <View style={[ styles.largeTotalContainer, styles.colorDeath ]}>
                    <Text style={styles.totalContainerHeader}>Death</Text>
                    <Text style={styles.largeTotalContainerCases}>
                        {stats.total_death}
                    </Text>
                </View>
            </View>
            <View style={[ styles.totalContainer, styles.totalContainerPaddingAndMargin ]}>
                {/* recovered active serious */}
                <View style={[ styles.smallTotalContainer, styles.colorRecovered ]}>
                    <Text style={styles.totalContainerHeader}>Recovered</Text>
                    <Text style={styles.smallTotalContainerCases}>
                        {stats.total_recovered}
                    </Text>
                </View>
                <View style={[ styles.smallTotalContainer, styles.colorActive ]}>
                    <Text style={styles.totalContainerHeader}>Active</Text>
                    <Text style={styles.smallTotalContainerCases}>
                        {stats.total_active_cases}
                    </Text>
                </View>
                <View style={[ styles.smallTotalContainer, styles.colorSerious ]}>
                    <Text style={styles.totalContainerHeader}>Serious</Text>
                    <Text style={styles.smallTotalContainerCases}>
                        {stats.total_serious_cases}
                    </Text>
                </View>
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