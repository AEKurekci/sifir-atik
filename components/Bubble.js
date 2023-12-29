import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Bubble = props => {

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max)
    }

    const colors = ['#8af5a3', '#c2e195', '#936aea', '#519eec',
        '#e581a4', '#abc', '#f5663b', '#3e6a73',
        '#66c4c4', '#fce055']
    const randomInd = getRandomInt(colors.length)
    const colorStyle = {
        borderColor: colors[randomInd],
        backgroundColor: colors[randomInd]
    }

    return (
        <View style={{...styles.screen, ...colorStyle}}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 20,
        margin: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontWeight: '200',
        fontSize: 12,
        paddingTop: 0
    }
})

export default Bubble;