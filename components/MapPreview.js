import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {MAP_API_KEY} from '@env';
import React from "react";

const MapPreview = (props) => {
    let imagePreviewUrl;
    if(props.lat && props.lng){
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.lat},${props.lng}&key=${MAP_API_KEY}`
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.mapPreview} source={{uri: imagePreviewUrl}} />
            <Text style={styles.desc}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapPreview: {
        width: '100%',
        height: 200,
        marginTop: 3
    },
    desc:{
        padding: 10,
        height: '15%'
    }
})

export default MapPreview;