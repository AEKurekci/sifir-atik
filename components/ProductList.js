import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import Product from "./Product";
import Title from "./Title";
import HorizontalList from "./HorizontalList";

function ProductList(props) {

    const ProductHeader = (
        <View style={styles.header}>
            <Title>Yemek</Title>
            <HorizontalList
                navigation={props.navigation}
                items={props.headerItems.filter(p => p.category.value === 0)} />{/*Yemek*/}
            <Title>Giyim</Title>
            <HorizontalList
                navigation={props.navigation}
                items={props.headerItems.filter(p => p.category.value === 1)} />{/*Giyim*/}
        </View>
    )

    return (
        <FlatList
            onRefresh={props.fetchData}
            refreshing={props.isRefreshing}
            style={styles.screen}
            data={props.products}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={(renderItem) => (
                <Product
                    navigation={props.navigation}
                    product={renderItem.item}
                />
            )}
            ListHeaderComponent={ProductHeader}
        />
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#ccc',
        height: '100%'
    },
    header:{
        backgroundColor: '#abc',
        height: 250
    }
})

export default ProductList;