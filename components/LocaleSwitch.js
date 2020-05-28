import React, { useRef } from 'react';
import { View, TouchableWithoutFeedback, Animated, Text, StyleSheet } from 'react-native';

const colorWhiteWithOpacity = 'rgba(255, 255, 255, 0.2)';
const colorWhiteWithOutOpacity = 'rgba(255, 255, 255, 1)';

const styles = StyleSheet.create({
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
    }
});

export const LocaleSwitch = ({ value, onClick }) => {
    const sliderAnim = useRef(new Animated.Value(0)).current;

    Animated.spring(sliderAnim, {
        toValue: value ? 0 : 157
    }).start();

    return(
        <View style={styles.localeContainer}>
            <TouchableWithoutFeedback onPress={onClick}>
                <View style={styles.localeContainerRow}>
                    <Text style={styles.localeText}>My Country</Text>
                    <Text style={styles.localeText}>Global</Text>
                    <Animated.View style={[ styles.localeSliderBtn, { left: sliderAnim }]} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}