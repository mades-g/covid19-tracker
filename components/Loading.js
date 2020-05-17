import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        height: '90%',
        justifyContent: 'center'
    },
    logo: {
        height: 250,
        width: 250
    }
})

export const Loading = () => {
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/screen/covid19-logo.png')}
                style={styles.logo}
            />
        </View>
    )
}