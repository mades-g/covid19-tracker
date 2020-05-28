import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
    container: {
        left: '2%',
        position: 'absolute',
        top: '30%',
        zIndex: 1
    }
})

export const Loading = () => {
    return(
        <View style={styles.container}>
            <ActivityIndicator color={"red"} size={"large"} />
        </View>
    )
}