import {Image, StyleSheet, View} from "react-native";
import React from "react";
import Constants from "../constants/Constants";

const ProductImage = props => {
    return(
        <View style={styles.imageContainer}>
            <Image source={{uri: props.url}} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        width: Constants.SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: '100%',
        height: Constants.SCREEN_WIDTH - 10,
        resizeMode: "cover"
    }
})

export default ProductImage;