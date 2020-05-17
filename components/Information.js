import React from 'react'
import { View, Text } from 'react-native';

function Information(props) {
    return(
        <View {...props}>
            <View>
                <Text>{props.title}</Text>
            </View>
            <View>
                {props.children}
            </View>
        </View>
    );
}

export default Information;