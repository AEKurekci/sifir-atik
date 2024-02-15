import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback
} from "react-native";
import Colors from "../constants/Colors";
import {useSelector} from "react-redux";
import Card from "./Card";


function Product(props) {
    const product = props.product;
    const owner = useSelector(state => {
        return state.users.users.find(user => user.id === product.ownerId)
    });

    let TouchableComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback;
    }

    const goToDetails = () => {
        props.navigation.navigate(props.productScreenPath, {
            product: product,
            owner: owner,
            profileScreenPath: props.profileScreenPath
        })
    }

    const propStyle = props.user ? {
        height: 250,
        width: Dimensions.get('window').width > 500 ? Dimensions.get('window').width / 3 - 10 : Dimensions.get('window').width / 2 - 10,
    } : {}

    return (
        <Card style={{...styles.screen, ...propStyle}}>
            <TouchableComponent useForeground onPress={goToDetails}>
                <View>
                    <Image style={styles.imageContainer} source={{uri: product.images[0].url}} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{product.title}</Text>
                    <View style={styles.row}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.owner}>{product.owner.address.text}</Text>
                    </View>
                </View>
            </TouchableComponent>
        </Card>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: 230,
        margin: 5,
        width: Dimensions.get('window').width > 500 ? Dimensions.get('window').width / 3 - 10 : Dimensions.get('window').width / 2 - 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: '10%',
        width: '100%',
        paddingHorizontal: 1,
        backgroundColor: Colors.accent
    },
    imageContainer:{
        width: '100%',
        height: '80%',
    },
    title: {
        height: '10%',
        backgroundColor: Colors.accent,
        color: 'white',
        paddingHorizontal: 1,
        fontWeight: '500'
    },
    owner:{
        width: '80%',
        color: 'white',
        fontWeight: '100',
        fontSize: 12
    },
    price: {
        width: '20%',
        color: 'white'
    }
})

export default Product;