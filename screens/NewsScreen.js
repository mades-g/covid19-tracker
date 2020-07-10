import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import * as Colors from '../styles/Colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.colorWhite,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: Colors.colorBlack,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export function NewsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>News</Text>
            <Text>...loading</Text>
        </View>
    );
}