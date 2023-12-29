import React from "react";
import {FlatList, StyleSheet} from "react-native";
import ProductImage from "./ProductImage";
import Constants from "../constants/Constants";

const Carousel = props => {

    return(
        <FlatList
            style={styles.container}
            disableIntervalMomentum={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={Constants.SCREEN_WIDTH}
            snapToAlignment='center'
            decelerationRate='fast'
            pagingEnabled={true}
            scrollEventThrottle={0}
            data={props.items}
            keyExtractor={item => item.id}
            renderItem={(renderItem) => <ProductImage url={renderItem.item.url} />}
            />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 280,
        height: 280,
        marginTop: 20
    }
})

export default Carousel;