import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileLine = props => {
    return (
        <View style={styles.row}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.imgContainer} onPress={props.onPressProfile.bind(this, props.user.id)}>
                    <Image source={{uri: props.user.imageURL}} style={styles.img} />
                    <Text style={styles.title}>{props.user.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='heart-outline' size={24} color='white'/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.messageIconContainer}>
                <Ionicons name={props.rightIcon} size={24} color='white'/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',
        flex: 4,
        paddingVertical: 5,
        backgroundColor: '#d7d6d6',
        marginVertical: 5,
        borderRadius: 8
    },
    imgContainer:{
        marginRight: 7,
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 5
    },
    title:{
        paddingRight: 7,
        fontFamily: 'poppins-semi-bold'
    },
    img: {
        width: 50,
        height: 50,
        borderWidth: 0.1,
        borderRadius: 100,
        paddingRight: 5,
        marginRight: 5
    },
    messageIconContainer:{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 5
    }
})

export default ProfileLine;