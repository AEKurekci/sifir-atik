import React from "react";
import {FlatList, StyleSheet} from "react-native";
import HorizontalItem from "./HorizontalItem";

const HorizontalList = props => {
    return (
        <FlatList
            style={styles.screen}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={props.items}
            horizontal
            renderItem={(renderItem) => {
                return <HorizontalItem item={renderItem.item} navigation={props.navigation} detailPath={props.detailPath}/>
        }}/>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '20%',
        backgroundColor: '#ccc'
    }
})

export default HorizontalList;