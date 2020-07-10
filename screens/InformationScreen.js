import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';

import * as Colors from '../styles/Colors';
import { Player } from '../components/Player';

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: Colors.colorMain,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        height: 100
    },
    containerHeaderDropdown: {
        backgroundColor: Colors.colorOrange,
        borderRadius: 50,
        flexDirection: 'row',
        height: 40,
        width: 116,
    },
    containerHeaderTitle: {
        color: Colors.colorWhite,
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
    media: {
        alignItems: 'center',
        borderRadius: 12,
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        shadowColor: Colors.colorBlack,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    shadow: {
        shadowColor: Colors.colorBlack,
        shadowOffset: {
            width: 0,
            height: 6
        },
        shadowOpacity: 0.1,
        shadowRadius: 10
    }
});

const mediaCollection = [
    {
        id: 1,
        videoId: 'QV_UnPl8qMA',
        label: 'Coronavirus - common questions | NHS',
        description: 'Dr Nam Nguyen, GP and Clinical Lead at NHS UK, shares answers to some of the popular questions we’ve been hearing from people about COVID-19, generally known as Coronavirus.'
    },
    {
        id: 2,
        videoId: 'isTGA_UHH-E',
        label: 'Coronavirus stay at home advice | NHS',
        description: "Dr Nam Nguyen is a GP and the clinical lead for the NHS website. He’s here to share information about coronavirus(COVID - 19) symptoms, when you will need to stay"
    },
    {
        id: 3,
        videoId: 'jWMUBouaqb0',
        label: '**COVID-19** a visual summary of the new coronavirus pandemic',
        description: "Information to make this video was obtained and collated from the following resources: UpToDate, CDC, WHO and journal articles from the Lancet and NEJM."
    }
];

const renderMedia = ({ item }) => {
    return(
        <View>
            <Player videoId={item.videoId} style={styles.media} width={375} height={200} />
        </View>
    );
};
const renderMedias = () => {
    return (
        <View style={styles.column}>
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={mediaCollection}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderMedia}
            />
        </View>
    );
};

export function InformationScreen() {
    return (
        <View style={[ styles.flex, { backgroundColor: Colors.colorWhite }]}>
            <View style={[ styles.shadow, styles.containerHeader ]}>
                <View style={styles.contentHeaderRow}>
                    <Text style={styles.containerHeaderTitle}>Covid-19</Text>
                    <View style={styles.containerHeaderDropdown}></View>
                </View>
            </View>
            <View style={styles.containerInformation}>
                <View style={styles.containerInformationHeader}>
                    <Text style={styles.containerInformationHeaderType}>Information</Text>
                </View>
            </View>
            {renderMedias()}
        </View>
    );
}