import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const MessagingLine = props => {
    let {message, date, user, target, product} = props;

    return (
        <View style={styles.row}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.imgContainer}>
                    <Image source={{uri: target.imageURL}} style={styles.img} />
                    <View>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.lastMessage}>
                            {user.id === message.message[message.message.length - 1].s ? 'Siz: ' : ''}
                            {message.message[message.message.length - 1].m}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.col}>
                <Text style={styles.date}>{date.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short'})}</Text>
                <TouchableOpacity style={styles.rightIconContainer}>
                    <Ionicons name={props.rightIcon} size={20} color='white'/>
                </TouchableOpacity>
            </View>
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
    col:{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    lastMessage:{
        paddingRight: 7,
        fontFamily: 'poppins'
    },
    img: {
        width: 50,
        height: 50,
        borderWidth: 0.1,
        borderRadius: 100,
        paddingRight: 5,
        marginRight: 5
    },
    rightIconContainer:{
        display: "flex",
        flex: 4,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 5
    },
    date:{
        fontSize: 12,
        fontFamily: 'poppins',
        paddingRight: 3
    }
})

export default MessagingLine;