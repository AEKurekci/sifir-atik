import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import Product from "./Product";
import Title from "./Title";
import HorizontalList from "./HorizontalList";
import Line from "./Line";

function ProductList(props) {

    const ProductHeader = (
        <View style={styles.header}>
            <Line />
            <Title>Yemek</Title>
            <HorizontalList
                navigation={props.navigation}
                items={props.headerItems.filter(p => p.category.value === 0)} />{/*Yemek*/}
            <Line />
            <Title>Giyim</Title>
            <HorizontalList
                navigation={props.navigation}
                items={props.headerItems.filter(p => p.category.value === 1)} />{/*Giyim*/}
            <Line />
        </View>
    )

    const ListEmptyComponent = (
        <View style={styles.empty}>
            <Text>Oops! Hiç ürün bulamadık..Eklemek ister misiniz?</Text>
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
            ListEmptyComponent={ListEmptyComponent}
        />
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#ccc',
        height: '100%'
    },
    header:{
        backgroundColor: '#ccc',
        height: 250
    },
    empty:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    emptyText:{
        fontFamily: 'poppins',
        fontSize: 20
    }
})

export default ProductList;