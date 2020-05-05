import React, { useRef, useState, useEffect } from 'react'
import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import * as Colors from '../styles/Colors';

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
        height: 100,
        width: 155,
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
        height: 100,
        width: 98
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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

function LocaleSlider() {
    const [ toggled, setToggle ] = useState(0);

    const sliderAnim  = useRef(new Animated.Value(0)).current;

    useEffect(
        () => {
            if (toggled) {
                return Animated.timing(sliderAnim, {
                    toValue: 157,
                }).start()
            }

            return Animated.timing(sliderAnim, {
                toValue: 0,
            }).start()
        }
        , [ toggled, sliderAnim ])

    return(
        <View style={styles.localeContainer}>
            <View style={styles.localeContainerRow}>
                <TouchableWithoutFeedback onPress={() => setToggle(!toggled)}>
                    <Text style={styles.localeText}>My Country</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setToggle(!toggled)}>
                    <Text style={styles.localeText}>Global</Text>
                </TouchableWithoutFeedback>
                <Animated.View style={[ styles.localeSliderBtn, { left: sliderAnim }]} />
            </View>
        </View>
    );
}

function CasesCounter() {
    return(
        <View style={styles.flex}>
            <View style={styles.totalTextContainer}>
                <Text style={styles.totalTextRow}>Total</Text>
                <Text style={styles.totalTextRow}>Today</Text>
                <Text style={styles.totalTextRow}>Yesterday</Text>
            </View>
            <View style={styles.totalContainer}>
                {/* affected and death */}
                <View style={[ styles.largeTotalContainer, styles.colorAffected ]}></View>
                <View style={[ styles.largeTotalContainer, styles.colorDeath ]}></View>
            </View>
            <View style={[ styles.totalContainer, styles.totalContainerPaddingAndMargin ]}>
                {/* recovered active serious */}
                <View style={[ styles.smallTotalContainer, styles.colorRecovered ]}></View>
                <View style={[ styles.smallTotalContainer, styles.colorActive ]}></View>
                <View style={[ styles.smallTotalContainer, styles.colorSerious ]}></View>
            </View>
        </View>
    );
}

export function StatisticsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Statistics</Text>
            <LocaleSlider />
            <CasesCounter />
        </View>
    );
}