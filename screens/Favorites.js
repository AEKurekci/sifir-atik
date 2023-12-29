import {FlatList, StyleSheet, View} from "react-native";
import Product from "../components/Product";
import React from "react";
import {useSelector} from "react-redux";

const Favorites = (props) => {
    const favorites = useSelector(state => state.products.favorites)
    return (
        <View style={styles.screen}>
            <FlatList
                data={favorites}
                style={styles.screen}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                renderItem={(renderItem) => {
                    return (
                        <Product
                            navigation={props.navigation}
                            product={renderItem.item}
                        />
                    )
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
})

export default Favorites;