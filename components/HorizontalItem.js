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


const HorizontalItem = props => {
    const item = props.item;
    const owner = useSelector(state => {
        return state.users.users.find(user => user.id === item.ownerId)
    });

    let TouchableComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback;
    }

    const goToDetails = () => {
        props.navigation.navigate(props.productScreenPath, {
            product: item,
            owner: owner
        })
    }

    return (
        <Card style={styles.screen}>
            <TouchableComponent useForeground onPress={goToDetails}>
                <View>
                    <Image style={styles.imageContainer} source={{uri: item.images[0].url}} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
                </View>
            </TouchableComponent>
        </Card>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: '95%',
        margin: 2,
        width: Dimensions.get('window').width > 500 ? Dimensions.get('window').width / 5 - 10 : Dimensions.get('window').width / 4 - 10,
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
        height: '75%',
    },
    title: {
        height: '25%',
        backgroundColor: Colors.accent,
        color: 'white',
        paddingHorizontal: 1,
        fontWeight: '300',
        fontSize: 12
    }
})

export default HorizontalItem;