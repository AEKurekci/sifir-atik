import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";

const AddCategory = props => {
    const goToAddDetails = () => {
        props.navigation.navigate('AddDetailsScreen')
    }

    const iconColor = '#ccc';
    const size = Dimensions.get('window').width / 2 - 100;
    let Icon = null;
    switch (props.item.icon){
        case 'Ionicons':
            Icon = <Ionicons name={props.item.iconText} size={size} color={iconColor} />
            break;
        case 'MaterialCommunityIcons':
            Icon = <MaterialCommunityIcons name={props.item.iconText} size={size} color={iconColor}/>
            break;
        case 'FontAwesome5':
            Icon = <FontAwesome5 name={props.item.iconText} size={size} color={iconColor}/>
            break;
    }

    const RightLine = (
        <View style={styles.rightBorder} />
    )

    const BottomLine = (
        <View style={styles.bottomBorder} />
    )

    const IconWithRightLineButton = (
        <View style={styles.row}>
            <View style={styles.col}>
                <TouchableOpacity style={styles.cover} onPress={goToAddDetails}>
                    {Icon}
                    <Text style={styles.text}>{props.item.text}</Text>
                </TouchableOpacity>
                {BottomLine}
            </View>
            {RightLine}
        </View>
    )

    const IconButton = (
        <View style={styles.col}>
            <TouchableOpacity style={styles.cover} onPress={goToAddDetails}>
                {Icon}
                <Text style={styles.text}>{props.item.text}</Text>
            </TouchableOpacity>
            {BottomLine}
        </View>
    )

    return props.item.value % 2 === 0 ? IconWithRightLineButton : IconButton

}

const styles = StyleSheet.create({
    cover:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get('window').width / 2 - 30,
        marginHorizontal: 15,
        marginVertical: 7,
        paddingVertical: 7
    },
    row:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    col:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-end"
    },
    rightBorder:{
        borderRightWidth: 0.5,
        borderRightColor: '#ccc',
        marginVertical: 14
    },
    bottomBorder:{
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        marginHorizontal: 14
    },
    text:{
        fontFamily: 'poppins-light',
        fontSize: 14,
        color: '#ccc'
    }
});

export default AddCategory;