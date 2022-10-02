import {ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import useHttp from "../hooks/use-http";
import Colors from "../constants/Colors";
import Line from "../components/Line";
import MapPreview from "../components/MapPreview";

const ProductDetailsScreen = (props) => {
    const product = props.route.params ? props.route.params.product : null;
    const owner = props.route.params ? props.route.params.owner : null;
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [address, setAddress] = useState(null)

    const getAddress = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try{
            const data = await useHttp(`addresses/${owner.addressId}`, '3003')
            setAddress(data);
        }catch (err) {
            setError('Fetching Address Fail -' + err.message)
        }finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if(owner.addressId !== undefined){
            getAddress()
        }
    }, [owner])

    useEffect(() => {
        if(owner){
            props.navigation.setOptions({
                headerTitle: owner.name
            })
        }
    }, [owner])

    if(isLoading || !address){
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
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.screen}>
                <Image style={styles.imageContainer} source={require('../assets/image.png')} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.title}>{product.price} ₺</Text>
                </View>
                <Line />
                <Text style={styles.description}>{product.description}</Text>
                <Line/>
                <MapPreview location={address.location} text={address.text} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    screen: {
        width: '100%',
        height: '100%'
    },
    imageContainer:{
        width: '100%',
        height: 300
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        height: 50,
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
        height: 100,
        backgroundColor: Colors.secondary
    }
})
export default ProductDetailsScreen;