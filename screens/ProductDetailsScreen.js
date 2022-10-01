import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import useHttp from "../hooks/use-http";
import Colors from "../constants/Colors";
import Line from "../components/Line";

const ProductDetailsScreen = (props) => {
    const productId = props.route.params ? props.route.params.productId : null;
    const owner = props.route.params ? props.route.params.owner : null;
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const productAddress = owner?.addressId

    const getProduct = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try{
            const data = await useHttp(`shares/${productId}`, '3001')
            setProduct(data);
        }catch (err) {
            setError('Fetching Product Fail -' + err.message)
        }finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        if(owner){
            props.navigation.setOptions({
                headerTitle: owner.name
            })
        }
    }, [owner])

    if(isLoading){
        return <ActivityIndicator style={styles.screen} size='large' color={Colors.primary} />
    }

    if(!isLoading && error){
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Image style={styles.imageContainer} source={require('../assets/image.png')} />
            <View style={styles.body}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.title}>{product.price} ₺</Text>
                </View>
                <Line />
                <Text style={styles.description}>{product.description}</Text>
                <Line/>
                <Text>{productAddress}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    imageContainer:{
        width: '100%',
        height: '50%'
    },
    body:{
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        height: '15%',
        width: '100%',
        paddingHorizontal: 10,
        marginVertical: 2,
        backgroundColor: Colors.secondary
    },
    title:{
        fontWeight: '700',
        fontSize: 22
    },
    description: {
        paddingHorizontal: 10,
        fontSize: 15,
        height: '35%',
        backgroundColor: Colors.secondary
    }
})
export default ProductDetailsScreen;