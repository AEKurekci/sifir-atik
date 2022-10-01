import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Product from "./Product";
import {fetchProduct} from "../store/product/product-actions";

function ProductList(props) {
    const dispatch = useDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(false)
    const products = useSelector(state => state.products.products)
    const fetchData = useCallback(async () => {
        setIsRefreshing(true)
        setError(null)
        try{
            await dispatch(fetchProduct());
        }catch (err){
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    if(!isRefreshing && error){
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={fetchData}
            refreshing={isRefreshing}
            style={styles.screen}
            data={products}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={(renderItem) => {
                return (
                    <Product
                        navigation={props.navigation}
                        product={renderItem.item}
                    />
                )
            }} />
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#ccc',
        flex: 1
    }
})

export default ProductList;