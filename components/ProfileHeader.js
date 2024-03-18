import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {FontAwesome5} from "@expo/vector-icons";
import Line from "./Line";
import Title from "./Title";

const ProfileHeader = props => {
    const {user} = props
    const date = new Date(user.signDate)
    return(
        <View>
            <Image style={styles.img} source={{uri: user.imageURL}} />
            <View style={styles.row}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{user.name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Ionicons style={styles.icon} name='people' size={15} color='black' />
                    <Text style={styles.text}>
                        {user.followers !== undefined ? user.followers.length : 0} Takipçi | {user.followings !== undefined ? user.followings.length : 0} Takip
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <FontAwesome5 style={styles.icon} name='calendar-alt' size={14} color='black' />
                <Text style={styles.text}>{date.toLocaleDateString('tr-TR', {day: 'numeric', month: 'short', year: "numeric"})} tarihinden beri üye</Text>
            </View>
            <Line />
            <Title>İlanlar</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: 200
    },
    row:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 7,
        paddingHorizontal: 7
    },
    text:{
        fontFamily: 'poppins-light',
        fontSize: 12
    },
    icon:{
        marginRight: 3,
        paddingBottom: 5
    },
    titleContainer:{
        flex: 1
    },
    title:{
        paddingRight: 7,
        fontFamily: 'poppins-semi-bold',
        fontSize: 20
    },
    infoContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
})

export default ProfileHeader;