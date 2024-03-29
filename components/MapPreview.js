import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {MAP_API_KEY} from '@env';
import React from "react";

const MapPreview = (props) => {
    let imagePreviewUrl;
    if(props.lat && props.lng){
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=14&size=400x200&maptype=roadmap&path=color:blue|fillcolor:0x65A5E6|weight:1|enc:${drawCirclePath(props.lat, props.lng, 0.5)}&key=${MAP_API_KEY}`
    }

    function drawCirclePath(lat, lng, radius, detail = 8) {
        let R = 6371;

        let pi = Math.PI;

        lat = (lat * pi) / 180;
        lng = (lng * pi) / 180;
        let d = radius / R;

        let points = [];
        let i = 0;

        for (i = 0; i <= 360; i += detail) {
            let brng = (i * pi) / 180;

            let plat = Math.asin(
                Math.sin(lat) * Math.cos(d) +
                Math.cos(lat) * Math.sin(d) * Math.cos(brng)
            );
            let plng =
                ((lng +
                        Math.atan2(
                            Math.sin(brng) * Math.sin(d) * Math.cos(lat),
                            Math.cos(d) - Math.sin(lat) * Math.sin(plat)
                        )) *
                    180) /
                pi;
            plat = (plat * 180) / pi;

            let currentPoints = [plat, plng];
            points.push(currentPoints);
        }

        return createEncodings(points);
    }

    function createEncodings(coords) {
        var i = 0;

        var plat = 0;
        var plng = 0;

        var encoded_points = "";

        for (i = 0; i < coords.length; ++i) {
            var lat = coords[i][0];
            var lng = coords[i][1];

            encoded_points += encodePoint(plat, plng, lat, lng);

            plat = lat;
            plng = lng;
        }

        return encoded_points;
    }

    function encodePoint(plat, plng, lat, lng) {
        var dlng = 0;
        var dlat = 0;

        var late5 = Math.round(lat * 1e5);
        var plate5 = Math.round(plat * 1e5);

        var lnge5 = Math.round(lng * 1e5);
        var plnge5 = Math.round(plng * 1e5);

        dlng = lnge5 - plnge5;
        dlat = late5 - plate5;

        return encodeSignedNumber(dlat) + encodeSignedNumber(dlng);
    }

    function encodeSignedNumber(num) {
        var sgn_num = num << 1;

        if (num < 0) {
            sgn_num = ~sgn_num;
        }

        return encodeNumber(sgn_num);
    }

    function encodeNumber(num) {
        var encodeString = "";

        while (num >= 0x20) {
            encodeString += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
            num >>= 5;
        }
        encodeString += String.fromCharCode(num + 63);

        return encodeString;
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.mapPreview} source={{uri: imagePreviewUrl}} />
            {props.text !== undefined && <Text style={styles.desc}>{props.text}</Text>}
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