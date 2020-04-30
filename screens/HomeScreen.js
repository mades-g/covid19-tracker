import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

import WareMask from '../assets/prevention/ware_mask.svg';
import HandWash from '../assets/prevention/hand_wash.svg';
import SafetyDistance from '../assets/prevention/safety_distance.svg';

const colorMain = '#473F97';
const colorBlack = '#000';
const colorWhite = '#FFF';
const colorOrange = '#E8821E'
const activeItemBackgroundColor = "#4C79FF";

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: colorMain,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        height: 100
    },
    containerHeaderDropdown: {
        backgroundColor: colorOrange,
        borderRadius: 50,
        flexDirection: 'row',
        height: 40,
        width: 116,
    },
    containerHeaderTitle: {
        color: colorWhite,
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 26,
        marginVertical: 7
    },
    containerInformation: {
        marginTop: 50,
        paddingHorizontal: 20
    },
    containerInformationContent: {
        flexDirection: 'row',
    },
    containerInformationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    containerInformationHeaderSeeDetails: {
        color: activeItemBackgroundColor,
        marginHorizontal: 20,
        marginVertical: 9,
    },
    containerInformationHeaderType: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 25,
        paddingHorizontal: 20
    },
    contentHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 35,
        top: 45
    },
    flex: {
        flex: 1
    },
    marginBottom10: {
        marginBottom: 10
    },
    preventionItem: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    shadow: {
        shadowColor: colorBlack,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.1,
        shadowRadius: 10
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1
    }
});

export function HomeScreen() {
    return(
        <View style={[ styles.flex, styles.column ]}>
            <View style={[ styles.shadow, styles.containerHeader ]}>
                <View style={styles.contentHeaderRow}>
                    <Text style={styles.containerHeaderTitle}>Covid-19</Text>
                    <View style={styles.containerHeaderDropdown}></View>
                </View>
            </View>
            {/* Prevention container */}
            <View style={styles.containerInformation}>
                <View style={styles.containerInformationHeader}>
                    <Text style={styles.containerInformationHeaderType}>Prevention</Text>
                    <Text style={styles.containerInformationHeaderSeeDetails}>See details</Text>
                </View>
                <View style={styles.containerInformationContent}>
                    <View style={styles.preventionItem}>
                        <SafetyDistance style={[ styles.shadow, styles.marginBottom10 ]} />
                        <Text style={styles.text}>Avoid close</Text>
                        <Text style={styles.text}>Headache</Text>
                    </View>
                    <View style={styles.preventionItem}>
                        <HandWash style={[ styles.shadow, styles.marginBottom10 ]} />
                        <Text style={styles.text}>Clean your hands</Text>
                        <Text style={styles.text}>often</Text>
                    </View>
                    <View style={styles.preventionItem}>
                        <WareMask style={[ styles.shadow, styles.marginBottom10 ]} />
                        <Text style={styles.text}>Wear a</Text>
                        <Text style={styles.text}>facemask</Text>
                    </View>
                </View>
            </View>
            {/* Symptoms container */}
            <View style={styles.containerInformation}>
                <View style={styles.containerInformationHeader}>
                    <Text style={styles.containerInformationHeaderType}>Symptoms</Text>
                    <Text style={styles.containerInformationHeaderSeeDetails}>See details</Text>
                </View>
                <View style={styles.containerInformationContent}>
                    <View style={styles.preventionItem}>
                        <Image style={[ styles.shadow, styles.marginBottom10 ]} source={require('../assets/headache.png')} />
                        <Text style={styles.text}>Headache</Text>
                    </View>
                    <View style={styles.preventionItem}>
                        <Image style={[ styles.shadow, styles.marginBottom10 ]} source={require('../assets/caugh.png')} />
                        <Text style={styles.text}>Cough</Text>
                    </View>
                    <View style={styles.preventionItem}>
                        <Image style={[ styles.shadow, styles.marginBottom10 ]} source={require('../assets/fever.png')} />
                        <Text style={styles.text}>Fever</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}