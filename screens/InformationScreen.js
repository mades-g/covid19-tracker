import React from 'react'
import { View, StyleSheet } from 'react-native';

import * as Colors from '../styles/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colorMain,
        flex: 1
    }
});

export function InformationScreen() {
    return (
        <View style={styles.container}></View>
    );
}