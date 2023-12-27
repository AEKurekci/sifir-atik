import React from "react";
import {FlatList, StyleSheet} from "react-native";
import HorizontalItem from "./HorizontalItem";

const HorizontalList = props => {
    return (
        <FlatList
            style={styles.screen}
            keyExtractor={item => item.id}
            data={props.items}
            horizontal
            renderItem={(renderItem) => {
                return <HorizontalItem item={renderItem.item} navigation={props.navigation}/>
        }}/>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '20%',
        backgroundColor: '#abc'
    }
})

export default HorizontalList;