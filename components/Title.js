import React from "react";
import {Text, View, StyleSheet} from "react-native";

const Title = props => {
    return(
        <View style={styles.cover}>
            <Text style={styles.title}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cover:{
        paddingLeft: 2,
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    title:{
        fontSize: 14,
        fontFamily: 'open-sans-bold'
    }
})

export default Title;