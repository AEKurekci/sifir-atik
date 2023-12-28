import React from "react";
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";

const Category = props => {
    const isAndroid = Platform.OS === 'android';
    const fontColor = isAndroid ? Colors.secondary : Colors.primary;
    let Icon = null;
    switch (props.item.icon){
        case 'Ionicons':
            Icon = <Ionicons name={props.item.iconText} size={Dimensions.get('window').width / 20} color={fontColor} />
            break;
        case 'MaterialCommunityIcons':
            Icon = <MaterialCommunityIcons name={props.item.iconText} size={Dimensions.get('window').width / 20} color={fontColor}/>
            break;
        case 'FontAwesome5':
            Icon = <FontAwesome5 name={props.item.iconText} size={Dimensions.get('window').width / 20} color={fontColor}/>
            break;
    }

    const backgroundStyle = props.item.selected ? {backgroundColor: '#abc'} : {};

    return (
        <TouchableOpacity style={{...styles.screen, ...backgroundStyle}} onPress={() => props.filterProduct(props.item.value)}>
            <View style={styles.icon}>
                {Icon}
            </View>
            <Text style={styles.text}>{props.item.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 8,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#abc',
        margin: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    icon:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0
    },
    text: {
        fontWeight: '200',
        fontSize: 12,
        paddingTop: 0
    }
})

export default Category;